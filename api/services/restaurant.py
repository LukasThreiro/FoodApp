from flask import jsonify, request, Response
from flask_restful import Resource
from datetime import datetime
from .storage.connection import Connection
from bson.json_util import dumps, loads

# Input: {name, address, telephone, description}
#
# Output: {
# response (Restaurant details or error message)
# }


class AddRestaurant(Resource):
    def __init__(self):
        self.url = "/restaurant/add"

    def checkParam(self, param):
        if ((param == None) or (param == "")):
            return None
        else:
            return str(param)

    def post(self):
        try:
            restaurant = {
                "name": self.checkParam(request.form.get("name")),
                "address": self.checkParam(request.form.get("address")),
                "telephone": self.checkParam(request.form.get("telephone")),
                "description": self.checkParam(request.form.get("description")),
                "image": self.checkParam(request.form.get("image")),
                "createdAt": datetime.today().strftime("%Y-%m-%d %H:%M:%S")
            }
        except:
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        for k in ("name", "address", "telephone", "description"):
            if (restaurant[k] == None):
                return Response(dumps("No " + k + " field", indent = 2), status=400)

        res = Connection().insertOne("restaurants", restaurant)
        response = dumps(res, indent = 2) 
        return Response(response, status=200)


# Input: {}
#
# Output: {
# response (List of restaurants)
# }
class AvailableRestaurants(Resource):
    def __init__(self):
        self.url = "/restaurant/all"

    def post(self):
        res = Connection().find("restaurants", None)
        response = dumps(res, indent = 2) 
        
        return Response(response, status=200)
