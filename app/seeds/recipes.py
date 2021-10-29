from app.models import db, Recipe, SubRecipe, SubRecipeIngredient, Tag, Component
from datetime import date

def seed_recipes():
    # a = Recipe(
    #     title='Duck, Apicius',
    #     photo='https://afar-production.imgix.net/uploads/images/post_images/images/1CYtAYxwou/original_4520e2d911224bc88e76e6729c8861b9.jpg?1520273608?ixlib=rails-0.3.0&auto=format%2Ccompress&crop=entropy&fit=crop&h=719&q=80&w=954',
    #     season='Winter',
    #     year=2020,
    #     user_id=1,
    # )
    # db.session.add(a)
    # db.session.commit()

    # b = Component(recipe_id=1, description='Im testing this')
    # c = SubRecipe(title='Duck Thing', recipe_id=1, order=1)
    # db.session.add(b)
    # db.session.add(c)
    # db.session.commit()

    # d = SubRecipeIngredient(qty=1.5, unit_id=1, sub_recipe_id=1, ingredient_id=1, order=1, description='Put the duck on the plate')
    # e = SubRecipeIngredient(qty=3, unit_id=2, sub_recipe_id=1, ingredient_id=2, order=2, description='Throw the duck in the trash')
    # f = Tag(name='Apicius', user_id=1)
    # a.tags.append(f)

    # db.session.add(d)
    # db.session.add(e)
    # db.session.commit()
    return


def undo_recipes():
    db.session.execute(
        'TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
