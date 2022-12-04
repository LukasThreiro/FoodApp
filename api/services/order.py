from flask import jsonify, request, Response
from flask_restful import Resource
from datetime import datetime
from .storage.connection import Connection
from bson.json_util import dumps, loads
import json

# Input: {account, restaurant, items, address, status}
# (Separate items with a space)
#
# Output: {
# response (Order details or error message)
# }


class CreateOrder(Resource):
    def __init__(self):
        self.url = "/order/add"

    def checkParam(self, param):
        if ((param == None) or (param == "")):
            return None
        else:
            return str(param)

    def post(self):
        try:
            order = {
                "name": self.checkParam(request.form.get("name")),
                "address": self.checkParam(request.form.get("address")),
                "city": self.checkParam(request.form.get("city")),
                "state": self.checkParam(request.form.get("state")),
                "card": self.checkParam(request.form.get("card")),
                "total": int(self.checkParam(request.form.get("total"))),
                "items": json.loads(request.form.get("items")),
            }
        except:
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        for k in ("address", "items"):
            if (order[k] == None):
                msg = str({"message": "No " + k + " field."})
                return Response(msg, status=400)

        res = Connection().insertOne("orders", order)
        response = dumps(res, indent = 2)
        return Response(response, status=200)
