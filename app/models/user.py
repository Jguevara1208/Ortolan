from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

assigned_to_projects = db.Table(
    "assigned_to_projects",
    db.Column("cook_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("project_id", db.Integer, db.ForeignKey("projects.id"), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar = db.Column(db.String(500))
    hashed_password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, nullable=False)
    restaurant = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(50), nullable=False)

    recipes = db.relationship('Recipe', back_populates='author', cascade='all, delete')
    order_list_categories = db.relationship('OrderListCategory', back_populates='user', cascade='all, delete')
    ingredients = db.relationship('Ingredient', back_populates='user', cascade='all, delete')
    tags = db.relationship('Tag', back_populates='user', cascade='all, delete')
    units = db.relationship('Unit', back_populates='user', cascade='all, delete')

    project_assignments = db.relationship("Project", back_populates="cooks", secondary=assigned_to_projects)

    restaurants = db.relationship('Restaurant', back_populates='chef')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': f'{self.first_name} {self.last_name}',
            'email': self.email,
            'avatar': self.avatar,
            'admin': self.admin,
            'restaurant': self.restaurant,
            'position': self.position
        }

    def to_project_dict(self):
        return {
            "id": self.id,
            "name": f'{self.first_name} {self.last_name}',
            "avatar": self.avatar,
            "position": self.position
        }

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cooks = db.relationship("User", back_populates="project_assignments", secondary=assigned_to_projects)
    tasks = db.relationship("ProjectTask", back_populates='project', cascade='all, delete')

    def to_redux_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'assigned': [ cook.to_project_dict() for cook in self.cooks ],
            'tasks': [task.to_dict() for task in self.tasks]
        }
