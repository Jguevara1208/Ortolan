from flask import Blueprint, jsonify, request
from app.models import Unit, db
units_routes = Blueprint('units', __name__)


@units_routes.route('/', methods=['POST'])
def create_unit():
    body = request.json
    unit = Unit(unit=body['unit'], user_id=body['userId'])
    db.session.add(unit)
    db.session.commit()
    return { "unit": unit.unit, "id": unit.id }


@units_routes.route('/<int:id>/', methods=['DELETE'])
def delete_update_unit(id):
    unit = Unit.query.get(id)
    db.session.delete(unit)
    db.session.commit()
    return 'ok'
