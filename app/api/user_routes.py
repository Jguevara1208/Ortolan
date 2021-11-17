from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Recipe, Project, Ingredient, Tag, OrderListCategory, Unit, db, current_menu

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/recentRecipes/')
def recent_recipes(id):
    recent_recipes_list = Recipe.query.filter(Recipe.user_id == id).order_by(Recipe.created_at.desc()).limit(6)
    print(recent_recipes_list, 'recent recipes list from route')
    return {"recentRecipes": [ recipe.to_recent_dict() for recipe in recent_recipes_list ]}


@user_routes.route('/<int:id>/treeRecipes/')
def tree_recipes(id):
    all_recipes = Recipe.query.filter(Recipe.user_id == id).all()
    tags = Tag.query.filter(Tag.user_id == id).all()

    tree = {}

    for recipe in all_recipes:
        season = recipe.season
        year = recipe.year
        if year not in tree:
            tree[year] = {}
            if season not in tree[year]:
                tree[year][season] = []
                tree[year][season].append(recipe.to_redux_dict())
            else:
                tree[year][season].append(recipe.to_redux_dict())
        else:
            if season not in tree[year]:
                tree[year][season] = []
                tree[year][season].append(recipe.to_redux_dict())
            else:
                tree[year][season].append(recipe.to_redux_dict())


    tags_obj = {
        tag.name: [recipe.to_redux_dict() for recipe in all_recipes if tag in recipe.tags]
        for tag in tags 
    }

    res = {
        "tree": tree,
        "tags": tags_obj
    }

    return res


@user_routes.route('/<int:id>/allRecipes/')
def all_recipes(id):
    all_recipes = Recipe.query.filter(Recipe.user_id == id).all()
    return { "allRecipes" :  {recipe.id: recipe.to_redux_dict() for recipe in all_recipes} }


@user_routes.route('/<int:id>/projects/')
def projects(id):
    projects = Project.query.filter(Project.user_id == id).all()
    return {"projects": {project.id: project.to_redux_dict() for project in projects}}


@user_routes.route('/<int:id>/ingredients/')
def ingredients(id):
    ingredients = Ingredient.query.filter(Ingredient.user_id == id).all()
    return { ingredient.name: ingredient.to_redux_dict() for ingredient in ingredients}


@user_routes.route('/<int:id>/tags/')
def tags(id):
    tags = Tag.query.filter(Tag.user_id == id).all()
    return {tag.name: tag.id for tag in tags}

@user_routes.route('/<int:id>/currentMenu/')
def current_menu(id):
    menu_items = User.query.get(id).current_menu
    return {"currentMenu" : [menu_item.to_recent_dict() for menu_item in menu_items]}


@user_routes.route('/<int:user_id>/currentMenu/<int:recipe_id>/', methods=['POST', 'DELETE'])
def current_menu_edit(user_id, recipe_id):
    user = User.query.get(user_id)
    recipe = Recipe.query.get(recipe_id)
    if request.method == 'POST':
        user.current_menu.append(recipe)
        db.session.commit()
        return {"currentMenu": [recipe.to_recent_dict() for recipe in user.current_menu]}
    else:
        user.current_menu.remove(recipe)
        db.session.commit()
        return {"currentMenu": [recipe.to_recent_dict() for recipe in user.current_menu]}


@user_routes.route('/<int:id>/categories/')
def categories(id):
    categories = OrderListCategory.query.filter(OrderListCategory.user_id == id).all()
    return {category.name: category.id for category in categories}


@user_routes.route('/<int:id>/units/')
def units(id):
    units = Unit.query.filter(Unit.user_id == id).all()
    return {unit.unit: unit.id for unit in units}

@user_routes.route('/<int:user_id>/team/')
def get_team(user_id):
    user = User.query.get(user_id)
    restaurant = user.restaurant
    team = User.query.filter(User.restaurant == restaurant).all()
    teamDict = [member.to_dict() for member in team]
    return {"team": teamDict}

@user_routes.route('/<int:id>/name', methods=["PATCH"])
def edit_name(id):
    body = request.json
    user = User.query.get(id)
    user.first_name = body['firstName']
    user.last_name = body['lastName']
    db.session.commit()
    return 'ok'

@user_routes.route('/<int:id>/position', methods=["PATCH"])
def edit_position(id):
    body = request.json
    user = User.query.get(id)
    user.position = body['position']
    db.session.commit()
    return 'ok'
