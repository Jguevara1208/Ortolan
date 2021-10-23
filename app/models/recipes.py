from .db import db
from datetime import datetime

recipe_tags = db.Table(
    'recipe_tags',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    photo = db.Column(db.String(300), nullable=False)
    season = db.Column(db.String(30), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    author = db.relationship('User', back_populates='recipes')

    components = db.relationship('Component', back_populates='recipe', cascade='all, delete')
    sub_recipes = db.relationship('SubRecipe', back_populates='recipe', cascade='all, delete')
    tags = db.relationship('Tag', back_populates='recipe', secondary=recipe_tags)

    def to_redux_dict(self):
        return {
            "recipeId": self.id,
            "title": self.title
        }

    def to_recent_dict(self):
        return {
            "id" : self.id,
            "img" : self.photo,
            "title" : self.title,
            "created_at" : self.created_at
        }

    def to_dict(self):
        return {
            "title": self.title,
            "photo": self.photo,
            "tags": [tag.to_dict() for tag in self.tags],
            "season": self.season,
            "components": self.components[0].to_dict(),
            "subRecipes": {sub_recipe.order: sub_recipe.to_dict() for sub_recipe in self.sub_recipes},
            "id": self.id,
            "created_at": self.created_at,
            "year": self.year
        }


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='tags', secondary=recipe_tags)
    user = db.relationship('User', back_populates='tags')

    def to_dict(self):
        return {
            "name": self.name,
            "id": self.id
        }




