from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import BooleanField
from wtforms.fields.simple import FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    avatar = StringField('avatar')
    admin = BooleanField('admin')
    restaurant = StringField('restaurant', validators=[DataRequired()])
    position = StringField('position', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
