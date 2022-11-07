import os
import sys
import datetime
from sqlalchemy import Table, Column, ForeignKey, Integer, String, DateTime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref

db = SQLAlchemy()

#---------------------------------------------------------------------------------
class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    dni_cif = db.Column(db.String(120), unique=True, nullable=False)
    birthday = db.Column(db.Date, unique=False, nullable=False)
    restaurant_name = db.Column(db.String(120), unique=True, nullable=False)
    url = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_type = db.Column(db.String(10), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Restaurant {self.url}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "dni_cif": self.dni_cif,
            "birthday": datetime.date.isoformat(self.birthday),
            "restaurant_name": self.restaurant_name,
            "url": self.url,
            "phone": self.phone,
            "email": self.email,
            "user_type": self.user_type,
            # do not serialize the password, its a security breach
        }
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    birthday = db.Column(db.Date, unique=False, nullable=False)
    phone = db.Column(db.Integer, unique=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    addresses_relation = db.relationship('Addresses', backref='user', lazy=True)
    order_relation = db.relationship('Order', backref='user', lazy=True)
    allergen_relation = db.relationship('Allergens_Users', backref='user')
    user_type = db.Column(db.String(10), unique=False, nullable=False)
    payment = db.relationship('Pay', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "birthday": datetime.date.isoformat(self.birthday),
            "phone": self.phone,
            "user_type": self.user_type,
            "address": list(map(lambda x: x.serialize(), self.addresses_relation)),
            #"orders": list(map(lambda x: x.serialize(), self.order_relation)),
            "allergen": list(map(lambda x: x.serialize(), self.allergen_relation)),
            # do not serialize the password, its a security breach
        }
#--------------------------------------------------------------------------------- 
class Addresses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    address_name = db.Column(db.String(120), unique=False, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    postal_code = db.Column(db.Integer, unique=False)
    city = db.Column(db.String(120), unique=False, nullable=False)
    country = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Addresses {self.address_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "address_name": self.address_name,
            "address": self.address,
            "postal_code": self.postal_code,
            "city": self.city,
            "country": self.country
        }        
#---------------------------------------------------------------------------------
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    product_relation = db.relationship("Product", backref='category', lazy=True)

    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "product": list(map(lambda x: x.serialize(), self.product_relation))
        }    
#---------------------------------------------------------------------------------
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    price = db.Column(db.Float(precision=None, asdecimal=False, decimal_return_scale=None))
    active = db.Column(db.Boolean, unique=False, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    image_url = db.Column(db.String(500), unique=False, nullable=True)
    order_detail_relation = db.relationship("Order_Detail", backref='product', lazy=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "active": self.active,
            "image_url": self.image_url,
            "category_id": self.category_id,
            "category": Category.query.get(self.category_id).name
        }

 #---------------------------------------------------------------------------------
class Ingredients(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(120), unique=False, nullable=False)
    is_extra = db.Column(db.Boolean, unique=False, nullable=False)
    is_removable = db.Column(db.Boolean, unique=False, nullable=False)
    price = db.Column(db.Float, unique=False)
    
    def __repr__(self):
        return f'<Product {self.name}>'
    
    def serialize(self):
        return{
            "id": self.id,
            "description": self.description,
            "is_extra": self.is_extra,
            "is_removable": self.is_removable,
            "price": self.price,
        }
#---------------------------------------------------------------------------------
class Allergens (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(120), unique=True, nullable=False)
    allergen_user_relation = db.relationship("Allergens_Users", backref='allergens')
    
    def __repr__(self):
        return f'<Allergens {self.description}>'

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description
        }    
#---------------------------------------------------------------------------------
class Allergens_Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    allergen_id = db.Column(db.Integer, db.ForeignKey("allergens.id"), nullable=False)

    def __repr__(self):
        return f'<Allergens_Users {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "allergen": Allergens.query.get(self.allergen_id).description

        }
#---------------------------------------------------------------------------------
class Pay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    date_pay = db.Column(db.DateTime, default= datetime.datetime.utcnow)
    amount = db.Column(db.Float, unique=False)
    status = db.Column(db.Boolean, unique=False, nullable=False)
    payment_method= db.Column(db.String(50), unique=False, nullable=True)
    brand = db.Column(db.String(50), unique=False, nullable=True)
    last4 = db.Column(db.String(50), unique=False, nullable=True)

    def __repr__(self):
        return f'<Pay {self.id}>'

    def serialize(self):
        return {
            #"user_id": self.user_id,
            "date_pay": datetime.date.isoformat(self.date_pay),
            "amount": self.amount,
            "status": self.status,
            "payment_method": self.payment_method,
            "brand": self.brand,
            "last4": self.last4
        }
#---------------------------------------------------------------------------------
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    order_comments = db.Column(db.String(150), unique=False, nullable=True)
    order_date = db.Column(db.DateTime, default= datetime.datetime.utcnow)
    order_total = db.Column(db.Float, unique=False)
    pay_method = db.Column(db.String(150), unique=False, nullable=True)
    order_status =db.Column(db.Boolean, unique=False, nullable=False)
    user_relation = db.relationship('User', backref='order')#Lazy=True
    order_detail_relation = db.relationship("Order_Detail", backref='order', lazy=True)
    payment = db.relationship('Pay', backref='order', lazy=True)
    
    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "order_id": self.id,
            "user_id": self.user_id,
            "client": User.query.get(self.user_id).name,
            "order_comments": self.order_comments,
            "order_date": datetime.date.isoformat(self.order_date),
            "order_total": self.order_total,
            "order_status": self.order_status,
            "order_detail": list(map(lambda x: x.serialize(), self.order_detail_relation)),
            "payment_details": list(map(lambda x: x.serialize(), self.payment))
        }
#---------------------------------------------------------------------------------
class Order_Detail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    units = db.Column(db.Integer, unique=False, nullable=False)
    unit_price = db.Column(db.Float, unique=False)
    subtotal = db.Column(db.Float, unique=False)
    
    
    def __repr__(self):
        return f'<Order_Detail {self.order_id}>'
    
    def serialize(self):
        return {
            #"order_id": self.order_id,
            "product_name": Product.query.get(self.product_id).name,
            "units": self.units,
            "unit_price": self.unit_price,
            "subtotal": self.subtotal,
        }