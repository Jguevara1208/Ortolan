from flask import Blueprint, request
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
def upload_image():
    print('IM HEEEEEEEEEEEEEERRRRREEEEEEE-----------------------------------------')
    print(request.files, 'request.files')

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    print(image, 'image')
    print(image.filename)
    print(allowed_file(image.filename))
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]
    return {"url": url}
