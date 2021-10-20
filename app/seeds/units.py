from app.models import db, Unit

def seed_units():
    g = Unit(unit='g', user_id=1)
    l = Unit(unit='L', user_id=1)
    gal = Unit(unit='gal', user_id=1)
    kg = Unit(unit='kg', user_id=1)
    ea = Unit(unit='ea', user_id=1)
    bu = Unit(unit='bu', user_id=1)
    none = Unit(unit='none', user_id=1)
    part = Unit(unit='part', user_id=1)
    sprig = Unit(unit='sprig', user_id=1)

    db.session.add(g)
    db.session.add(l)
    db.session.add(gal)
    db.session.add(kg)
    db.session.add(ea)
    db.session.add(bu)
    db.session.add(none)
    db.session.add(part)
    db.session.add(sprig)
    db.session.commit()


def undo_units():
    db.session.execute('TRUNCATE units RESTART IDENTITY CASCADE;')
    db.session.commit()
