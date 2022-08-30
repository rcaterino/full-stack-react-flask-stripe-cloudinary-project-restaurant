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
@api.route('/category', methods=['GET'])
def getCategory():
    category_query = Category.query.all()
    return jsonify(category_query), 200
#----------------------------------------------------------------------------------------------------------------------------------------------------------

@api.route('/Product', methods=['GET'])
def getProduct():
    products_query = Product.query.all()
    return jsonify(products_query), 200 
#----------------------------------------------------------------------------------------------------------------------------------------------------------
@api.route('/Addresses', methods=['GET'])
def getAddresses():
    addresses_query = Addresses.query.all()
    return jsonify(addresses_query), 200 



