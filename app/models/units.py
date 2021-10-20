from .db import db


class Unit(db.Model):
    __tablename__ = 'units'

    id = db.Column(db.Integer, primary_key=True)
    unit = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    sub_recipe_units = db.relationship('SubRecipeIngredient', back_populates='unit')
    user = db.relationship('User', back_populates='units')

    def to_dict(self):
        return self.unit
