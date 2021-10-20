from .db import db


class Component(db.Model):
    __tablename__ = 'components'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    description = db.Column(db.Text, nullable=False)

    recipe = db.relationship('Recipe', back_populates='components')

    def to_dict(self):
        return self.description
