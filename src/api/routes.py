"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
import stripe
import os
from flask import Flask, render_template, request, jsonify, url_for, Blueprint, redirect
from api.models import db, Restaurant, Allergens_Users, User, Category, Product, Addresses, Allergens, Order, Order_Detail, Correlatives
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

#----------------------------------------------------------------------------------------------------------------------------------------------------------
# This is your test secret API key.
stripe.api_key = 'sk_test_51LiMLsEvrZASLd3x1uWFTlFBppDO0cbLzNKyYS109JickVGxdOSB85zKjcjMUw8q2zPtCIYss0c5vrNOy8xrdU6m008Lp7jJo9'
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#funtion for calculate order amount
def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    
    return 1400
#----------------------------------------------------------------------------------------------------------------------------------------------------------    
#payment endpoint 
@api.route('/create-payment-intent', methods=['POST'])
def create_payment():
    
    print("request del peyment intent")
    
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            
            currency='eur',
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
    return jsonify(access_token=access_token, user_data = restaurant), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #create a new user in db
@api.route('/register', methods=['POST'])
def createUser():
    info_request = request.get_json()
    newUser = User( user_type= 'customer', name = info_request['name'], lastname = info_request['lastname'], birthday = info_request['birthday'], phone = info_request['phone'], email = info_request['email'], password = info_request['password'], is_active = info_request['is_active'])
    db.session.add(newUser)
    db.session.commit()
    access_token = create_access_token(identity=info_request['email'])
    return jsonify(access_token=access_token), 200

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
    product1 = Product(name=info_request["name"], description=info_request["description"], id=info_request["id"],price=info_request["price"], active=info_request["active"], category_id=info_request["category_id"])
    db.session.add(product1)
    db.session.commit()
    return jsonify("Producto creada"), 200  
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
    category1 = Category(name=info_request["name"], id=info_request["id"],)
    db.session.add(category1)
    db.session.commit()
    return jsonify("categoria creada"), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------  
#Editing a category by id
@api.route("/editcategory/<int:id>", methods=["PUT"])
def putcategory(id):
    info_request = request.get_json()
    category1 = Category.query.get(id)
    print(category1)
    if category1 is None:
        raise APIException('category not found', status_code=404)
    if "name" in info_request:
        category1.name = info_request["name"]    
    db.session.commit()
    return jsonify("categoria editada"),200
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
    print("id del alergeno a eliminar")
    print(id)
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
    info_requests = request.get_json()
    for info_request in info_requests:
        newAllergensUser = Allergens_Users(user_id=info_request["user_id"], allergen_id=info_request['allergen_id'])
        db.session.add(newAllergensUser)
    db.session.commit()
    return jsonify("alergeno registrado en usuario"), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# get all correlatives
@api.route('/correlatives', methods=['GET'])
def getCorrelatives():
    correlatives_query = Correlatives.query.all()
    all_correlatives= list(map(lambda x: x.serialize(), correlatives_query))
    return jsonify(all_correlatives), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one correlative in db
@api.route('/correlative/<int:id>', methods=['GET'])
def getOneCorrelative(id):
    correlative_query = Correlatives.query.get(id)
    return jsonify(correlative_query.serialize())
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new correlative
@api.route('/newcorrelative', methods=['POST'])
def newCorrelative():
    info_request = request.get_json()
    correlative1 = Correlatives(correlative_description=info_request["correlative_description"], correlative_counter=info_request["correlative_counter"])
    db.session.add(correlative1)
    db.session.commit()
    return jsonify("Correlativo creado"), 200  

#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Editing a correlative by id
@api.route("/editcorrelative/<int:id>", methods=["PUT"])
def putCorrelative(id):
    info_request = request.get_json()
    correlative1 = Correlatives.query.get(id)
    if correlative1 is None:
        raise APIException('correlative not found', status_code=404)
    if "correlative_description" in info_request:
        correlative1.correlative_description = info_request["correlative_description"]  
    if "correlative_counter" in info_request:
        correlative1.correlative_counter = info_request["correlative_counter"]
    db.session.commit()
    return jsonify("correlativo editado"),200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# get all correlatives
@api.route('/allorders', methods=['GET'])
def getAllOrders():
    orders_query = Order.query.filter_by(order_status=False)
    all_orders= list(map(lambda x: x.serialize(), orders_query))
    return jsonify(orders=all_orders), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new order
@api.route('/neworder/<int:id>', methods=['POST'])
def newOrder(id):
    info_request = request.get_json()
    correlative1 = Correlatives.query.get(id)
    correlative = Correlatives.query.get(id).correlative_counter
    order1 = Order(user_id=info_request["user_id"], correlative_id=info_request['correlative_id'], order_number=correlative, order_comments=info_request['order_comments'], order_date=info_request['order_date'], order_subtotal=info_request['order_subtotal'], tax_total=info_request['tax_total'], order_total=info_request['order_total'], pay_method=info_request['pay_method'], order_status=info_request['order_status'])
    db.session.add(order1)
    db.session.commit()
    correlative1 = Correlatives.query.get(id)
    correlative1.correlative_counter = correlative + 1 
    db.session.commit()
    return jsonify(order_number= correlative, mensaje="orden de preparación creada"), 200  
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new order detail
@api.route('/neworderdetail/<int:order_id>', methods=['POST'])
def newOrderDetail(order_id):
    info_requests = request.get_json()
    print(info_requests)
    for info_request in info_requests:
        orderDetail = Order_Detail(order_id=info_request['order_id'], product_id=info_request['product_id'], units=info_request['units'], unit_price=info_request['unit_price'], tax_base=info_request['tax_base'], tax_total=info_request['tax_total'], subtotal=info_request['subtotal'])
        db.session.add(orderDetail)
    db.session.commit()
    return jsonify("detalle de pedido incluido con exito"), 200  
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Ending a order
@api.route("/endingorder/<int:id>", methods=["PUT"])
def putEndOrder(id):
    info_request = request.get_json()
    print(info_request)
    orderToEnd = Order.query.get(id)
    print(orderToEnd)
    if orderToEnd is None:
        raise APIException('Order not found', status_code=404)
    if "order_status" in info_request:
        orderToEnd.order_status = info_request["order_status"]
    db.session.commit()
    orders_query = Order.query.filter_by(order_status=False)
    all_orders= list(map(lambda x: x.serialize(), orders_query))
    return jsonify(orders=all_orders), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------