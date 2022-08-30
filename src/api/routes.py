"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, Product, Addresses
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    info_request = request.get_json()
    query = User.query.filter_by(email = info_request['email'], password = info_request['password']).first()
    user = query.serialize()
    access_token = create_access_token(identity=user['email'])
    return jsonify(access_token=access_token), 200

#----------------------------------------------------------------------------------------------------------------------------------------------------------
# get all the people
@api.route('/users', methods=['GET'])
def getUsers():
    people_query = User.query.all()
    return jsonify(people_query), 200

#----------------------------------------------------------------------------------------------------------------------------------------------------------
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#----------------------------------------------------------------------------------------------------------------------------------------------------------

@api.route('/product', methods=['GET'])
def getProduct():
    products_query = Product.query.all()
    all_product = list(map(lambda x: x.serialize(), products_query))
    return jsonify(all_product), 200 
#----------------------------------------------------------------------------------------------------------------------------------------------------------
@api.route('/addresses', methods=['GET'])
def getAddresses():
    addresses_query = Addresses.query.all()
    all_addresses = list(map(lambda x: x.serialize(), addresses_query))
    return jsonify(all_addresses), 200 
#----------------------------------------------------------------------------------------------------------------------------------------------------------
@api.route('/category', methods=['GET'])
def getAllCategory():
    category_query = Category.query.all()
    all_category = list(map(lambda x: x.serialize(), category_query))
    return jsonify(all_category), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------
# #get only one user in db
@api.route('/category/<int:id>', methods=['GET'])
def getCategory(id):
    category_query = Category.query.get(id)
    return jsonify(category_query.serialize())
#----------------------------------------------------------------------------------------------------------------------------------------------------------

@api.route("/newcategory", methods=["POST"])
def postCategory():
    info_request = request.get_json()
    category1 = Category(name=info_request["name"], id=info_request["id"])
    db.session.add(category1)
    db.session.commit()
    return jsonify("categoria creada"), 200

#----------------------------------------------------------------------------------------------------------------------------------------------------------  

@api.route("/editcategory/<int:id>", methods=["PUT"])
def putcategory(id):
    info_request = request.get_json()
    category1 = Category.query.get(id)
    print(category1)
    if category1 is None:
        raise APIException('User not found', status_code=404)
    if "name" in info_request:
        category1.name = info_request["name"]    
    db.session.commit()
    return jsonify("categoria editada"),200
#----------------------------------------------------------------------------------------------------------------------------------------------------------  

