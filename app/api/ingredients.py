from flask import Blueprint, jsonify, request
from app.models import Ingredient, db
ingredients_routes = Blueprint('ingredients', __name__)

@ingredients_routes.route('/', methods=['POST'])
def create_ingredient():
    body = request.json
    ingredient = Ingredient(
        name=body['name'], 
        category_id=body['categoryId'], 
        user_id=body['userId']
        )

    db.session.add(ingredient)
    db.session.commit()
    return {ingredient.name: ingredient.to_redux_dict() }

@ingredients_routes.route('/<int:id>/', methods=['DELETE', 'PATCH'])
def delete_update_ingredient(id):
    body = request.json
    ingredient = Ingredient.query.get(id)
    if request.method == 'PATCH':
        ingredient.category_id = body['categoryId']
        ingredient.name = body['name']
        db.session.commit()
        return { ingredient.name: ingredient.to_redux_dict() }
    else:
        db.session.delete(ingredient)
        db.session.commit()
        return 'ok'
