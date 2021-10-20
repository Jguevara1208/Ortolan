from .db import db


class SubRecipe(db.Model):
    __tablename__ = 'sub_recipes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)

    recipe = db.relationship('Recipe', back_populates='sub_recipes')
    sub_recipe_ingredients = db.relationship('SubRecipeIngredient', back_populates='sub_recipe', cascade='all, delete')

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "ingredients": {ingredient.order: ingredient.to_dict() for ingredient in self.sub_recipe_ingredients },
            "id": self.id
        }
