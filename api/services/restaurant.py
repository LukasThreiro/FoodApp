from flask import jsonify, request
from flask_restful import Resource
from datetime import datetime
from .storage.connection import Connection

# Input: {name, address, telephone, description}
#
# Output: {
# status, (0 means ok)
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
            resteurant = {
                "name": self.checkParam(request.form.get("name")),
                "address": self.checkParam(request.form.get("address")),
                "telephone": self.checkParam(request.form.get("telephone")),
                "description": self.checkParam(request.form.get("description")),
                "createdAt": datetime.today().strftime("%Y-%m-%d %H:%M:%S")
            }
        except:
            return jsonify({"status": -1, "response": "Invalid data format"})

        for k in ("name", "address", "telephone", "description"):
            if (resteurant[k] == None):
                return jsonify({"status": -1, "response": "No " + k + " field."})

        res = Connection().insertOne("restaurants", resteurant)
        return jsonify({"status": 0, "response": res})


# Input: {}
#
# Output: {
# status, (0 means ok)
# response (List of restaurants)
# }
class AvailableRestaurants(Resource):
    def __init__(self):
        self.url = "/restaurant/all"

    def post(self):
        res = Connection().find("restaurants", None)
        return jsonify({"status": 0, "response": res})
