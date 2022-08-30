import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

#---------------------------------------------------------------------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    birthday = db.Column(db.Date, unique=False, nullable=False)
    phone = db.Column(db.Integer, unique=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    addresses_relation = relationship("Addresses")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "birthday": self.birthday,
            "phone": self.phone
            
            # do not serialize the password, its a security breach
        }

#---------------------------------------------------------------------------------
class Category(db.Model):
    id = db.Column(db.Integer,unique=True, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    product_relation = relationship("Product")

    def __repr__(self):
        return f'<Category {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }    
#---------------------------------------------------------------------------------

class Product(db.Model):
    id_product = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    price = db.Column(db.Float(precision=None, asdecimal=False, decimal_return_scale=None))
    active = db.Column(db.Boolean, unique=False, nullable=False)
    category_id = db.Column(ForeignKey(Category.id))

    def __repr__(self):
        return f'<Product {self.id_product}>'

    def serialize(self):
        return{
            "id_product": self.id_product,
            "name": self.name,
            "price": self.price,
            "active": self.active,
        }
#---------------------------------------------------------------------------------

class Addresses(db.Model):
    id_address = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(ForeignKey(User.id))
    address_name = db.Column(db.String(120), unique=False, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    postal_code = db.Column(db.Integer, unique=False)
    city = db.Column(db.String(120), unique=True, nullable=False)
    country = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id_address}>'

    def serialize(self):
        return {
            "id_address": self.id_address,
            "id_user": self.id_user,
            "address_name": self.address_name,
            "address": self.address,
            "postal_code": self.postal_code,
            "city": self.city,
            "country": self.country
        }        