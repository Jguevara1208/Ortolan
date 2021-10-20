from flask import Blueprint, jsonify, request
from app.models import OrderListCategory, db
categories_routes = Blueprint('categories', __name__)


@categories_routes.route('/', methods=['POST'])
def create_category():
    body = request.json
    category = OrderListCategory(user_id=body['userId'], name=body['name'])
    db.session.add(category)
    db.session.commit()
    return {"name": category.name, "id": category.id}


@categories_routes.route('/<int:id>/', methods=['DELETE', 'PATCH'])
def delete_update_category(id):
    body = request.json
    category = OrderListCategory.query.get(id)
    if request.method == 'PATCH':
        category.name = body['name']
        db.session.commit()
        return 'ok'
    else:
        db.session.delete(category)
        db.session.commit()
        return 'ok'
