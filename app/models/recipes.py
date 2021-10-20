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
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    author = db.relationship('User', back_populates='recipes')

    components = db.relationship('Component', back_populates='recipe')
    sub_recipes = db.relationship('SubRecipe', back_populates='recipe')
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
            "created_at" : self.created_at
        }


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='tags', secondary=recipe_tags)
    user = db.relationship('User', back_populates='tags')




