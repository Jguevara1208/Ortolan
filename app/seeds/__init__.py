from flask.cli import AppGroup
from .users import seed_users, undo_users, undo_projects
from .order_list_categories import seed_order_list_categories, undo_order_list_categories
from .restaurants import seed_restaurants, undo_restaurants
from .units import seed_units, undo_units
from .ingredients import seed_ingredients, undo_ingredients
from .tags import seed_tags, undo_tags
from .recipes import seed_recipes, undo_recipes
# from .projects import seed_projects, undo_projects

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_order_list_categories()
    seed_units()
    seed_restaurants()
    seed_ingredients()
    # seed_tags()
    seed_recipes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_order_list_categories()
    undo_restaurants()
    undo_units()
    undo_ingredients()
    undo_tags()
    undo_projects()
    undo_recipes()
    # Add other undo functions here
