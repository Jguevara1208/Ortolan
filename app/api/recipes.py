from flask import Blueprint, jsonify, request
from app.models import Recipe, Component, SubRecipe, SubRecipeIngredient, Tag, db
recipes_routes = Blueprint('recipes', __name__)

@recipes_routes.route('/<int:id>')
def get_recipe(id):
    recipe = Recipe.query.get(id)
    return recipe.to_dict()

@recipes_routes.route('/', methods=['POST'])
def create_recipe():
    body = request.json
    recipe = Recipe(
        title=body['title'],
        photo=body['photo'],
        season=body['season'],
        year=body['year'],
        user_id=body['userId'],
        created_at=body['createdAt']
    )

    db.session.add(recipe)
    db.session.commit()

    components = Component(
        recipe_id=recipe.id,
        description=body['component']['description']
    )

    db.session.add(components)

    for sub_recipe in body['subRecipes']:
        sub = SubRecipe(title=sub_recipe['title'], recipe_id=recipe.id, order=sub_recipe['order'], description=sub_recipe['description'])
        db.session.add(sub)
        db.session.commit()
        for sri in sub_recipe['ingredients']:
            sub_ingredient = SubRecipeIngredient(
                qty=sri['qty'], 
                unit_id=sri['unitId'], 
                sub_recipe_id=sub.id, 
                ingredient_id=sri['ingredientId'], 
                order=sri['order'], 
                description=sri['description']
                )
            db.session.add(sub_ingredient)
    
    for tag in body['tags']:
        t = Tag(name=tag['name'], user_id=tag['userId'])
        db.session.add(t)
        recipe.tags.append(t)

    db.session.commit()

    return recipe.to_dict()


@recipes_routes.route('/<int:id>/', methods=['DELETE', 'PATCH'])
def delete_update_recipe(id):
    body = request.json
    recipe = Recipe.query.get(id)
    if request.method == 'PATCH':
        recipe.title = body['title']
        recipe.photo = body['photo']
        recipe.season = body['season']
        recipe.year = body['year']
        db.session.commit()
        return 'ok'
    else:
        db.session.delete(recipe)
        db.session.commit()
        return 'ok'


@recipes_routes.route('/<int:recipe_id>/sub_recipe/<int:sub_id>/', methods=['PATCH', 'DELETE'])
def delete_update_sub(recipe_id, sub_id):
    body = request.json
    sub = SubRecipe.query.get(sub_id)
    if request.method == 'PATCH':
        sub.title = body['title']
        sub.description = body['description']
        db.session.commit()
        return {sub.order: sub.to_dict()}
    else:
        db.session.delete(sub)
        db.session.commit()
        return 'ok'


@recipes_routes.route('/<int:recipe_id>/sub_ingredients/<int:sub_id>/', methods=['PATCH', 'DELETE'])
def delete_update_sub_ingredient(recipe_id, sub_id):
    body = request.json
    sub = SubRecipeIngredient.query.get(sub_id)
    if request.method == 'PATCH':
        sub.qty = body['qty']
        sub.description = body['description']
        sub.ingredient_id = body['ingredientId']
        sub.unit_id = body['unitId']
        db.session.commit()
        return {sub.order: sub.to_dict()}
    else:
        db.session.delete(sub)
        db.session.commit()
        return 'ok'


@recipes_routes.route('/<int:recipe_id>/tags/<int:tag_id>/', methods=['PATCH', 'DELETE'])
def delete_update_tags(recipe_id, tag_id):
    body = request.json
    tag = Tag.query.get(tag_id)
    if request.method == 'PATCH':
        tag.name = body['name']
        db.session.commit()
        return tag.to_dict()
    else:
        recipe = Recipe.query.get(recipe_id)
        recipe_tags = recipe.tags
        tag_to_remove = Tag.query.get(tag_id)
        recipe_tags.remove(tag_to_remove)
        db.session.commit()
        return 'ok'


