import os
import sys
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref

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
    addresses_relation = db.relationship('Addresses', backref='user', lazy=True)
    order_relation = db.relationship('Order', backref='user', lazy=True)

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
            "address": list(map(lambda x: x.serialize(), self.addresses_relation)),
            "orders": list(map(lambda x: x.serialize(), self.order_relation)),
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
            "category_id": self.category_id,
            "category": Category.query.get(self.category_id).name
        }
#---------------------------------------------------------------------------------
class Allergens (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Allergens {self.description}>'

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description
        }    
#---------------------------------------------------------------------------------
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    order_comments = db.Column(db.String(150), unique=False, nullable=False)
    order_date = db.Column(db.Date, unique=False, nullable=False)
    order_subtotal = db.Column(db.Float, unique=False)
    tax_base = db.Column(db.Float, unique=False)
    tax_total = db.Column(db.Float, unique=False)
    order_total = db.Column(db.Float, unique=False)
    order_detail_relation = db.relationship("Order_Detail", backref='order', lazy=True)
    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "order_comments": self.order_comments,
            "order_date": datetime.date.isoformat(self.order_date),
            "order_subtotal": self.order_subtotal,
            "tax_base": self.tax_base,
            "tax_total": self.tax_total,
            "order_total": self.order_total,
            "order_detail": list(map(lambda x: x.serialize(), self.order_detail_relation))
        }
#---------------------------------------------------------------------------------
class Order_Detail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    units = db.Column(db.Integer, unique=False, nullable=False)
    unit_price = db.Column(db.Float, unique=False)
    tax_base = db.Column(db.Float, unique=False)
    tax_total = db.Column(db.Float, unique=False)
    subtotal = db.Column(db.Float, unique=False)
    
    
    def __repr__(self):
        return f'<Order_Detail {self.id}>'
    
    def serialize(self):
        return {
            "order_id": self.order_id,
            "product_name": Product.query.get(self.product_id).name,
            "units": self.units,
            "unit_price": self.unit_price,
            "subtotal": self.subtotal,
            "tax_base": self.tax_base,
            "tax_total": self.tax_total,
        }