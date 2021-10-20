from app.models import db, Project
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    me = User(
        first_name='Jordan',
        last_name='Guevara',
        email='jordansacct@gmail.com',
        avatar='https://raw.githubusercontent.com/Jguevara1208/Ortloan-photos/main/Gap%20Year%20at%20Nico_Jordan%20Guevara-1524_lores.jpeg?token=AR27E6Z5GKMKL5HUGXON3SLBPBKKC',
        password='password',
        admin=True,
        restaurant='Nico',
        position='Chef De Cuisine'
        )

        
    a = Project(user_id=1, title='Clean Walk in', description='Clean it well')
    s = Project(user_id=1, title='Clean Freezer', description='Clean it well')
    d = Project(user_id=1, title='Pick all cases of peas',
                description='Clean it well')
    f = Project(user_id=1, title='Clean all turnips',
                description='Clean it well')
    g = Project(user_id=1, title='Organize Dry Storage',
                description='Clean it well')
                
    db.session.add(me)
    db.session.commit()
    a.cooks.append(me)
    s.cooks.append(me)
    d.cooks.append(me)

    db.session.add(a)
    db.session.add(s)
    db.session.add(d)
    db.session.add(f)
    db.session.add(g)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

def undo_projects():
    db.session.execute(
        'TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
