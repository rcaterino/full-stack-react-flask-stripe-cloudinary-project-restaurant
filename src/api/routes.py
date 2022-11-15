"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
import stripe
import os
from flask import Flask, render_template, request, jsonify, url_for, Blueprint, redirect
from api.models import db, Pay, Restaurant, Allergens_Users, User, Category, Product, Addresses, Allergens, Order, Order_Detail
from api.utils import generate_sitemap, APIException
from functools import reduce

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

#----------------------------------------------------------------------------------------------------------------------------------------------------------
# This is your test secret API key.
stripe.api_key = 'pk_test_51LiMLsEvrZASLd3xkRkKXzOoUPeH81Nw4G9NSiMoqL7vMmLrGxeW1CF7O3Vjy6pNuQ4yP5TONun6VUSkI2DpseQ000UVZkU15a'


#----------------------------------------------------------------------------------------------------------------------------------------------------------
#funtion for calculate order amount
def calculate_order_amount(items):
     # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    amount = 0
    price = []
    for item in items:
        id=(item['id'])
        product_query = Product.query.get(id)
        price.append(product_query.price)
    def do_sum(x1, x2): return x1 + x2
    
    return int((reduce(do_sum, price))*100)
#----------------------------------------------------------------------------------------------------------------------------------------------------------        
def charge_customer(customer_id):
    # Lookup the payment methods available for the customer
    payment_methods = stripe.PaymentMethod.list(
        customer=customer_id,
        type='card'
    )
    # Charge the customer and payment method immediately
    try:
        stripe.PaymentIntent.create(
            amount=1099,
            currency='eur',
            customer=customer_id,
            payment_method=payment_methods.data[0].id,
            off_session=True,
            confirm=True
        )
    except stripe.error.CardError as e:
        err = e.error
        # Error code will be authentication_required if authentication is needed
        print('Code is: %s' % err.code)
        payment_intent_id = err.payment_intent['id']
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)

#----------------------------------------------------------------------------------------------------------------------------------------------------------    
#payment endpoint 
@api.route('/create-payment-intent', methods=['POST'])
def create_payment():
    # Alternatively, set up a webhook to listen for the payment_intent.succeeded event
    # and attach the PaymentMethod to a new Customer
    #customer = stripe.Customer.create()
    
    try:
        data = json.loads(request.data)
        total=calculate_order_amount(data['items'])
        print("request en create-payment-intent:")
        print(data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            #customer= customer['id'],
            setup_future_usage='off_session',
            amount= total,
            currency='eur',
            metadata= data['metadata'],
            automatic_payment_methods={
                'enabled': True,
            },
        )
        print("intent desde el backend")
        print(intent)
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403
#-----------------------------------------------------------------------------------------------------------------------------------------------------------

@api.route('/webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']
    # This is your Stripe CLI webhook secret for testing your endpoint locally.
    endpoint_secret = 'whsec_AkKyqGQ3BN7T3ex7UODz8Qvu5ectM9zu'

    print("evento de webhoooks")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e

    # Handle the event
    if event['type'] == 'charge.captured':
      charge = event['data']['object']
    elif event['type'] == 'charge.expired':
      charge = event['data']['object']
    elif event['type'] == 'charge.failed':
      charge = event['data']['object']
    elif event['type'] == 'charge.pending':
      charge = event['data']['object']
    elif event['type'] == 'charge.refunded':
      charge = event['data']['object']
    elif event['type'] == 'charge.succeeded':
      charge = event['data']['object']
      print("recepcion del webhook:")
      print(charge)
      print("user_id:")
      print(charge['metadata']['user_id'])
      print("order_id:")
      print(charge['metadata']['order_id'])
      print("payment_method:")
      print(charge['payment_method_details']['type'])
      print("brand:")
      print(charge['payment_method_details']['card']['brand'])
      print("last4:")
      print(charge['payment_method_details']['card']['last4'])
      print("status:")
      print(charge['status'])
      print("paid:")
      print(charge['paid']) 
      print("amount:")
      total = (charge['amount'])/100
      print(total)
      newPay = Pay( user_id=charge['metadata']['user_id'], order_id =charge['metadata']['order_id'], payment_method= charge['payment_method_details']['type'], brand = charge['payment_method_details']['card']['brand'], last4 = charge['payment_method_details']['card']['last4'], status = charge['paid'], amount = total)
      print(newPay)
      db.session.add(newPay)
      db.session.commit()
    elif event['type'] == 'charge.updated':
      charge = event['data']['object']
    elif event['type'] == 'charge.dispute.closed':
      dispute = event['data']['object']
    elif event['type'] == 'charge.dispute.created':
      dispute = event['data']['object']
    elif event['type'] == 'charge.dispute.funds_reinstated':
      dispute = event['data']['object']
    elif event['type'] == 'charge.dispute.funds_withdrawn':
      dispute = event['data']['object']
    elif event['type'] == 'charge.dispute.updated':
      dispute = event['data']['object']
    elif event['type'] == 'charge.refund.updated':
      refund = event['data']['object']
    # ... handle other event types
    else:
      print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)



#----------------------------------------------------------------------------------------------------------------------------------------------------------
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_user_token():
    info_request = request.get_json()
    query = User.query.filter_by(email = info_request['email'], password = info_request['password']).first()
    user = query.serialize()
    access_token = create_access_token(identity=user['email'])
    return jsonify(access_token=access_token, user_data = user), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one restaurante
@api.route('/restaurant/<int:id>', methods=['GET'])
def getOneRestaurantr(id):
    restaurant_query = Restaurant.query.get(id)
    return jsonify(restaurant_query.serialize())
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# get all restaurant
@api.route('/restaurant', methods=['GET'])
def getRestaurant():
    restaurant_query = Restaurant.query.all()
    all_restaurant= list(map(lambda x: x.serialize(), restaurant_query))
    return jsonify(all_restaurant), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/tokenrestaurant", methods=["POST"])
def create_restaurant_token():
    info_request = request.get_json()
    query = Restaurant.query.filter_by(email = info_request['email'], password = info_request['password']).first()
    restaurant = query.serialize()
    access_token = create_access_token(identity=restaurant['email'])
    print(access_token)
    return jsonify(access_token=access_token, restaurant_data = restaurant), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #create a new user in db
@api.route('/register', methods=['POST'])
def createUser():
    info_request = request.get_json()
    newUser = User( user_type= info_request['user_type'], name = info_request['name'], lastname = info_request['lastname'], birthday = info_request['birthday'], phone = info_request['phone'], email = info_request['email'], password = info_request['password'], is_active = info_request['is_active'])
    db.session.add(newUser)
    db.session.commit()
    query = User.query.filter_by(email = info_request['email'], password = info_request['password']).first()
    user = query.serialize()
    access_token = create_access_token(identity=user['email'])
    return jsonify(access_token=access_token, user_data = user), 200

#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Edit and save user
@api.route("/edituser/<int:id>", methods=["PUT"])
def putuser(id):
    info_request = request.get_json()
    user1 = User.query.get(id)
    if user1 is None:
        raise APIException('User not found', status_code=404)
    if "name" in info_request:
        user1.name = info_request["name"]
        user1.lastname = info_request["lastname"]
        user1.birthday = info_request["birthday"]
        user1.phone = info_request["phone"]
        user1.email = info_request["email"]
    db.session.commit()
    user_query = User.query.get(id)
    return jsonify(user_data= user_query.serialize())

#----------------------------------------------------------------------------------------------------------------------------------------------------------
# get all the people
@api.route('/users', methods=['GET'])
def getUsers():
    people_query = User.query.all()
    all_people= list(map(lambda x: x.serialize(), people_query))
    return jsonify(all_people), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one user in db
@api.route('/user/<int:id>', methods=['GET'])
def getOneUser(id):
    user_query = User.query.get(id)
    return jsonify(user_query.serialize())
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Get all product
@api.route('/product', methods=['GET'])
def getProduct():
    products_query = Product.query.all()
    all_product = list(map(lambda x: x.serialize(), products_query))
    return jsonify(all_product), 200 
    
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one product in db
@api.route('/product/<int:id>', methods=['GET'])
def getoneProduct(id):
    product_query = Product.query.get(id)
    return jsonify(product_query.serialize())    

#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Post product
@api.route('/newproduct', methods=['POST'])
def newProduct():
    info_request = request.get_json()
    product = Product(name=info_request["name"], description=info_request["description"],price=info_request["price"], active=info_request["active"], category_id=info_request["category_id"], image_url=info_request["image_url"])
    db.session.add(product)
    db.session.commit()
    category_query = Category.query.all()
    all_category = list(map(lambda x: x.serialize(), category_query))
    return jsonify(all_category), 200 
#----------------------------------------------------------------------------------------------------------------------------------------------------------

#Editing a product by id
@api.route("/editproduct/<int:id>", methods=["PUT"])
def putproduct(id):
    info_request = request.get_json()
    product1 = Product.query.get(id)
    if product1 is None:
        raise APIException('Product not found', status_code=404)
    if "name" in info_request:
        product1.name = info_request["name"]    
    db.session.commit()
    return jsonify("producto editado"),200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Get all address
@api.route('/addresses', methods=['GET'])
def getAddresses():
    addresses_query = Addresses.query.all()
    all_addresses = list(map(lambda x: x.serialize(), addresses_query))
    return jsonify(all_addresses), 200 

#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one addresses in db
@api.route('/addresses/<int:user_id>', methods=['GET'])
def getoneAddresses(user_id):
    addresses_query = Addresses.query.all(user_id)
    return jsonify(addresses_query.serialize())    
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Post addresses
@api.route('/newaddresses', methods=['POST'])
def newaddresses():
    info_request = request.get_json()
    addresses1 = Addresses(id=info_request["id"],user_id=info_request["user_id"], address_name=info_request["address_name"], address=info_request["address"], postal_code=info_request["postal_code"], city=info_request["city"], country=info_request["country"])
    db.session.add(addresses1)
    db.session.commit()
    return jsonify("addresses creada"), 200      
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Get all category of menu
@api.route('/category', methods=['GET'])
def getAllCategory():
    category_query = Category.query.all()
    all_category = list(map(lambda x: x.serialize(), category_query))
    return jsonify(all_category), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one category in db
@api.route('/category/<int:id>', methods=['GET'])
def getCategory(id):
    category_query = Category.query.get(id)
    return jsonify(category_query.serialize())
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new category
@api.route("/newcategory", methods=["POST"])
def postCategory():
    info_request = request.get_json()
    category1 = Category(name=info_request["name"],)
    db.session.add(category1)
    db.session.commit()
    category_query = Category.query.all()
    all_category = list(map(lambda x: x.serialize(), category_query))
    return jsonify(all_category), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------  
#Editing a category by id
@api.route("/editcategory/<int:id>", methods=["PUT"])
def putcategory(id):
    info_request = request.get_json()
    category1 = Category.query.get(id)
    if category1 is None:
        raise APIException('category not found', status_code=404)
    if "name" in info_request:
        category1.name = info_request["name"]    
    db.session.commit()
    return jsonify("categoria editada"),200
    #----------------------------------------------------------------------------------------------------------------------------------------------------------
#Deleting category by id
@api.route("/deletecategory/<int:id>", methods=["DELETE"])
def deletecategory(id):
    category = Category.query.get(id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    db.session.delete(category)
    db.session.commit()
    category_query = Category.query.all()
    all_categories = list(map(lambda x: x.serialize(), category_query))
    return jsonify(all_categories), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------  
# get all allergens
@api.route('/allergens', methods=["GET"])
def getAllergens():
    allergens_query = Allergens.query.all()
    all_allergens = list(map(lambda x: x.serialize(), allergens_query))
    return jsonify(all_allergens), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one allergen by id
@api.route('/allergens/<int:id>', methods=['GET'])
def getoneAllergen(id):
    allergens_query = Allergens.query.get(id)
    return jsonify(allergens_query.serialize())    
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new allergens
@api.route("/newallergens", methods=["POST"])
def postAllergens():
    info_request = request.get_json()
    newAllergens = Allergens(description=info_request["description"])
    db.session.add(newAllergens)
    db.session.commit()
    allergens_query = Allergens.query.all()
    all_allergens = list(map(lambda x: x.serialize(), allergens_query))
    return jsonify(all_allergens), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Editing a allergen by id
@api.route("/editallergen/<int:id>", methods=["PUT"])
def putallergen(id):
    info_request = request.get_json()
    allergen1 = Allergens.query.get(id)
    if allergen1 is None:
        raise APIException('allergen not found', status_code=404)
    if "description" in info_request:
        allergen1.description = info_request["description"]    
    db.session.commit()
    return jsonify("alergeno editado"),200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Deleting allergen by id
@api.route("/deleteallergen/<int:id>", methods=["DELETE"])
def deleteallergen(id):
    allergen = Allergens.query.get(id)
    if allergen is None:
        raise APIException('Allergen not found', status_code=404)
    db.session.delete(allergen)
    db.session.commit()
    allergens_query = Allergens.query.all()
    all_allergens = list(map(lambda x: x.serialize(), allergens_query))
    return jsonify(all_allergens), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# get all user allergens
@api.route('/allallergenuser', methods=['GET'])
def getAllAllergenUser():
    allergen_user_query = Allergens_Users.query.all()
    all_allergen_user= list(map(lambda x: x.serialize(), allergen_user_query))
    return jsonify(all_allergen_user), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new allergens for user
@api.route("/newuserallergen", methods=["POST"])
def postUserAllergen():
    info_request = request.get_json() 
    newAllergen = Allergens_Users(user_id= info_request["user_id"], allergen_id = info_request["allergen_id "])
    db.session.add(newAllergen)
    db.session.commit()
    query = User.query.filter_by(id = info_request['user_id']).first()
    user = query.serialize()
    return jsonify(user_data = user), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# get all orders
@api.route('/allorders', methods=['GET'])
def getAllOrders():
    orders_query = Order.query.filter_by(order_status=False)
    all_orders= list(map(lambda x: x.serialize(), orders_query))
    return jsonify(all_orders), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new order
@api.route('/neworder', methods=['POST'])
def newOrder():
    info_request = request.get_json()
    total = (calculate_order_amount(info_request['items']))/100
    order1 = Order(user_id=info_request["user_id"], order_comments=info_request['order_comments'], order_total= total, pay_method=info_request['pay_method'], order_status= False)
    db.session.add(order1)
    db.session.flush()
    order_number = order1.id
    db.session.commit()
    items= info_request['items']
    for item in items:
        orderDetail = Order_Detail(order_id = order_number, product_id = item['id'], units = 1, unit_price = item['price'], subtotal = item['price'])
        db.session.add(orderDetail)
    db.session.commit()
    return jsonify(mensaje="orden de preparación creada con éxito", order_id = order_number), 200  
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Ending a order
@api.route("/endingorder/<int:id>", methods=["PUT"])
def putEndOrder(id):
    info_request = request.get_json()
    orderToEnd = Order.query.get(id)
    if orderToEnd is None:
        raise APIException('Order not found', status_code=404)
    if "order_status" in info_request:
        orderToEnd.order_status = info_request["order_status"]
    db.session.commit()
    orders_query = Order.query.filter_by(order_status=False)
    all_orders= list(map(lambda x: x.serialize(), orders_query))
    return jsonify(all_orders), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Geting order detail by client id
@api.route('/orderinprocess/<int:id>', methods=["GET"])
def getOrderInProcess(id):
    order_query = list(Order.query.get(id))
    return jsonify([order_query.serialize()]),200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------