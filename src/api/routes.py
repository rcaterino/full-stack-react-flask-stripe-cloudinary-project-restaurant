"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, Product, Addresses, Allergens, Allergens_Users
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    info_request = request.get_json()
    query = User.query.filter_by(email = info_request['email'], password = info_request['password']).first()
    user = query.serialize()
    access_token = create_access_token(identity=user['email'])
    return jsonify(access_token=access_token, user_data = user), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #create a new user in db
@api.route('/register', methods=['POST'])
def createUser():
    info_request = request.get_json()
    newUser = User(name = info_request['name'], lastname = info_request['lastname'], birthday = info_request['birthday'], phone = info_request['phone'], email = info_request['email'], password = info_request['password'], is_active = info_request['is_active'])
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
    product1 = Product(name=info_request["name"], id=info_request["id"],price=info_request["price"], active=info_request["active"], category_id=info_request["category_id"])
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
    return jsonify( all_category), 200
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
# get allergens
@api.route('/allergens', methods=["GET"])
def getAllergens():
    allergens_query = Allergens.query.all()
    all_allergens = list(map(lambda x: x.serialize(), allergens_query))
    return jsonify(all_allergens), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one allergen in db
@api.route('/allergens/<int:id>', methods=['GET'])
def getoneAllergen(id):
    allergens_query = Allergens.query.get(id)
    return jsonify(allergens_query.serialize())    
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#Create new allergens
@api.route("/newallergens", methods=["POST"])
def postAllergens():
    info_request = request.get_json()
    newAllergens = Allergens(name=info_request["name"], id=info_request["id"])
    db.session.add(newAllergens)
    db.session.commit()
    return jsonify("alergeno creado"), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#add allergens
@api.route("/allegensuser", methods=["POST"])
def postAllergensuser():
    info_request = request.get_json()
    allergensUser = Allergens_Users(allergens_id=info_request["allergens_id"], user_id=info_request["user_id"])
    db.session.add(allergensUser)
    db.session.commit()
    return jsonify("alergeno asignado al usuario"), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
#delete allergens
@api.route("/allegensuser/{id}", methods=["DELETE"])
def deleteAllergensuser(id):
   allergenObj = Allergens.query.get(id)
   
   db.session.delete(allergenObj)
   db.session.commit()
   return jsonify("alergeno eliminado"), 404
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
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------