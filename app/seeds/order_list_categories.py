from app.models import db, OrderListCategory

def seed_order_list_categories():

    dairy = OrderListCategory(user_id=1, name='Dairy')
    dry_goods = OrderListCategory(user_id=1, name='Dry Goods')
    fish = OrderListCategory(user_id=1, name='Fish')
    meat = OrderListCategory(user_id=1, name='Protein')
    specialty = OrderListCategory(user_id=1, name='Specialty')
    produce = OrderListCategory(user_id=1, name='Produce')
    alcohol = OrderListCategory(user_id=1, name='Alcohol')
    market = OrderListCategory(user_id=1, name='Market')

    db.session.add(dairy)
    db.session.add(dry_goods)
    db.session.add(fish)
    db.session.add(meat)
    db.session.add(specialty)
    db.session.add(produce)
    db.session.add(alcohol)
    db.session.add(market)
    db.session.commit()


def undo_order_list_categories():
    db.session.execute('TRUNCATE order_list_categories RESTART IDENTITY CASCADE;')
    db.session.commit()
