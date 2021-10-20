from .db import db


class OrderListCategory(db.Model):
    __tablename__ = 'order_list_categories'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='order_list_categories')
    ingredients = db.relationship('Ingredient', back_populates='category')    

    def to_ingredient_dict(self):
        return {
            "name": self.name,
            "id": self.id
        }