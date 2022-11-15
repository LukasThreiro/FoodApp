from flask import jsonify, request
from flask_restful import Resource
from datetime import datetime
from .storage.connection import Connection

# Input: {name, price, description, restaurant}
#
# Output: {
# status, (0 means ok)
# response (Dish details or error message)
# }


class AddDish(Resource):
    def __init__(self):
        self.url = "/dish/add"

    def checkParam(self, param):
        if ((param == None) or (param == "")):
            return None
        else:
            return str(param)

    def post(self):
        try:
            dish = {
                "name": self.checkParam(request.form.get("name")),
                "price": self.checkParam(request.form.get("price")),
                "description": self.checkParam(request.form.get("description")),
                "restaurant": self.checkParam(request.form.get("restaurant")),
                "createdAt": datetime.today().strftime("%Y-%m-%d %H:%M:%S")
            }
        except:
            return jsonify({"status": -1, "response": "Invalid data format"})

        for k in ("name", "price", "description"):
            if (dish[k] == None):
                return jsonify({"status": -1, "response": "No " + k + " field."})

        tmp = Connection().findByID("restaurants", dish["restaurant"])

        if (tmp == None):
            return jsonify({"status": -1, "response": "There is no restaurant with this id"})

        res = Connection().insertOne("dishes", dish)
        return jsonify({"status": 0, "response": res})

# Input: {restaurant_key}
# (if restaurant_key is not given, returns dishes for all restaurants)
#
# Output: {
# status, (0 means ok)
# response (List of dishes or error message)
# }


class AvailableDishes(Resource):
    def __init__(self):
        self.url = "/dish/all"

    def checkParam(self, param):
        if ((param == None) or (param == "")):
            return None
        else:
            return str(param)

    def post(self):
        try:
            restaurantKey = self.checkParam(request.form.get("restaurant_key"))
        except:
            return jsonify({"status": -1, "response": "Invalid data format"})

        print("resaurantKey: " + str(restaurantKey))

        if (restaurantKey == None):
            query = {}
        else:
            query = {"restaurant": restaurantKey}

        res = Connection().find("dishes", query)
        return jsonify({"status": 0, "response": res})
