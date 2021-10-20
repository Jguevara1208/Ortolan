from flask import Blueprint, jsonify, request
from app.models import Project, db, User
projects_routes = Blueprint('projects', __name__)


@projects_routes.route('/', methods=['POST'])
def create_project():
    body = request.json
    project = Project(
        title=body['title'], 
        description=body['description'], 
        user_id=body['userId']
        )

    db.session.add(project)
    db.session.commit()
    return project.to_redux_dict()


@projects_routes.route('/<int:id>/', methods=['DELETE', 'PATCH'])
def delete_update_project(id):
    body = request.json
    project = Project.query.get(id)
    if request.method == 'PATCH':
        project.title = body['title']
        project.description = body['description']
        db.session.commit()
        return project.to_redux_dict()
    else:
        db.session.delete(project)
        db.session.commit()
        return 'ok'

@projects_routes.route('/<int:project_id>/assign/<int:user_id>/', methods=['POST', 'DELETE'])
def delete_add_assignment(project_id, user_id):
    user = User.query.get(user_id)
    project = Project.query.get(project_id)
    if request.method == 'POST':
        project.cooks.append(user)
        db.session.commit()
        return user.to_project_dict()
    else:
        project.cooks.remove(user)
        return 'ok'


@projects_routes.route('/<int:id>/assign/all/', methods=['DELETE'])
def delete_all_assignments(id):
    project = Project.query.get(id)
    project.cooks = []
    db.session.commit()
    return 'ok'
