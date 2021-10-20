from app.models import db, Restaurant

def seed_restaurants():
    nico = Restaurant(name='Nico', user_id=1)
    db.session.add(nico)
    db.session.commit()


def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
