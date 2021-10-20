from flask import Blueprint, jsonify, request
from app.models import Tag, db
tags_routes = Blueprint('tags', __name__)


@tags_routes.route('/', methods=['POST'])
def create_tag():
    body = request.json
    tag = Tag(
        name=body['name'], 
        user_id=body['userId']
        )

    db.session.add(tag)
    db.session.commit()
    return tag.to_dict()


@tags_routes.route('/<int:id>/', methods=['DELETE', 'PATCH'])
def delete_update_tag(id):
    body = request.json
    tag = Tag.query.get(id)
    if request.method == 'PATCH':
        tag.name = body['name']
        db.session.commit()
        return 'ok'
    else:
        db.session.delete(tag)
        db.session.commit()
        return 'ok'
