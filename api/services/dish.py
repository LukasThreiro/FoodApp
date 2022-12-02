from flask import jsonify, request, Response
from flask_restful import Resource
from datetime import datetime
from .storage.connection import Connection
from bson.json_util import dumps, loads

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
                "price": float(self.checkParam(request.form.get("price"))),
                "description": self.checkParam(request.form.get("description")),
                "restaurant_key": self.checkParam(request.form.get("restaurant_key")),
                "image": self.checkParam(request.form.get("image")),
            }
        except:
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        for k in ("name", "price", "description"):
            if (dish[k] == None):
                msg = str({"message": "No " + k + " field."})
                return Response(msg, status=400)

        tmp = Connection().findByID("restaurants", dish["restaurant_key"])

        if (tmp == None):
            msg = str({"message": "There is no restaurant with this id"})
            return Response(msg, status=400)

        res = Connection().insertOne("dishes", dish)
        
        return Response(response = dumps(res, indent = 2), status=200)

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
            query = {"restaurant_key": restaurantKey}
        res = Connection().find("dishes", query)
        return Response(response = dumps(res, indent = 2), status=200)
