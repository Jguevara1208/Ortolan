from .db import db


class SubRecipeIngredient(db.Model):
    __tablename__ = 'sub_recipe_ingredients'

    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(300))
    order = db.Column(db.Integer, nullable=False)

    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"), nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey("units.id"), nullable=False)
    sub_recipe_id = db.Column(db.Integer, db.ForeignKey("sub_recipes.id"), nullable=False)

    ingredient = db.relationship('Ingredient', back_populates='recipe_ingredients')
    unit = db.relationship('Unit', back_populates='sub_recipe_units')
    sub_recipe = db.relationship('SubRecipe', back_populates='sub_recipe_ingredients')

    def to_dict(self):
        return {
            "qty:": self.qty,
            "unit": self.unit.to_dict(),
            "ingredient": self.ingredient.to_dict(),
            "description": self.description,
            "id": self.id
        }