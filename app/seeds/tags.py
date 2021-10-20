from app.models import db, Tag


def seed_tags():
    a = Tag(user_id=1, name='Turbot')
    s = Tag(user_id=1, name='Duck')
    d = Tag(user_id=1, name='Crab')
    f = Tag(user_id=1, name='Pithivier')
    g = Tag(user_id=1, name='Truffle')

    db.session.add(a)
    db.session.add(s)
    db.session.add(d)
    db.session.add(f)
    db.session.add(g)
    db.session.commit()


def undo_tags():
    db.session.execute(
        'TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
