from flask import Blueprint, jsonify, request
from app.models import Unit, db
units_routes = Blueprint('units', __name__)


@units_routes.route('/', methods=['POST'])
def create_unit():
    body = request.json
    unit = Unit(unit=body['unit'], user_id=body['userId'])
    db.session.add(unit)
    db.session.commit()
    return { unit.unit: unit.id }


@units_routes.route('/<int:id>/', methods=['DELETE', 'PATCH'])
def delete_update_unit(id):
    body = request.json
    unit = Unit.query.get(id)
    if request.method == 'PATCH':
        unit.unit = body['unit']
        db.session.commit()
        return { unit.unit: unit.id }
    else:
        db.session.delete(unit)
        db.session.commit()
        return 'ok'
