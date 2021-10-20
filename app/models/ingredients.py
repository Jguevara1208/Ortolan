from .db import db


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("order_list_categories.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    category = db.relationship('OrderListCategory', back_populates='ingredients')
    recipe_ingredients = db.relationship('SubRecipeIngredient', back_populates='ingredient')
    user = db.relationship('User', back_populates='ingredients')

    def to_redux_dict(self):
        return {
            "id": self.id,
            "category": self.category.to_ingredient_dict()
        }
