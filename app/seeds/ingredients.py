from app.models import db, Ingredient


def seed_ingredients():
    a = Ingredient(user_id=1, name='Butter', category_id=1)
    s = Ingredient(user_id=1, name='Pork Shoulder', category_id=4)
    d = Ingredient(user_id=1, name='Turbot', category_id=3)
    f = Ingredient(user_id=1, name='Turnips', category_id=6)
    g = Ingredient(user_id=1, name='Truffle', category_id=5)

    db.session.add(a)
    db.session.add(s)
    db.session.add(d)
    db.session.add(f)
    db.session.add(g)
    db.session.commit()


def undo_ingredients():
    db.session.execute(
        'TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
