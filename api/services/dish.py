from flask import jsonify, request, Response
from flask_restful import Resource
from datetime import datetime
from .storage.connection import Connection

# Input: {name, price, description, restaurant}
#
# Output: {
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
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        for k in ("name", "price", "description"):
            if (dish[k] == None):
                msg = str({"message": "No " + k + " field."})
                return Response(msg, status=400)

        tmp = Connection().findByID("restaurants", dish["restaurant"])

        if (tmp == None):
            msg = str({"message": "There is no restaurant with this id"})
            return Response(msg, status=400)

        res = Connection().insertOne("dishes", dish)
        msg = str({"message": res})

        return Response(msg, status=200)

# Input: {restaurant_key}
# (if restaurant_key is not given, returns dishes for all restaurants)
#
# Output: {
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
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        if (restaurantKey == None):
            query = {}
        else:
            query = {"restaurant": restaurantKey}

        res = Connection().find("dishes", query)
        msg = str({"message": res})
        
        return Response(msg, status=200)
