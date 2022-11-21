from flask import jsonify, request, Response
from flask_restful import Resource
from datetime import datetime
from .storage.connection import Connection

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
            orderInfo = {
                "account": self.checkParam(request.form.get("account")),
                "restaurant": self.checkParam(request.form.get("restaurant")),
                "items": request.form.get("items"),
                "address": self.checkParam(request.form.get("address")),
                "status": self.checkParam(request.form.get("status")),
                "createdAt": datetime.today().strftime("%Y-%m-%d %H:%M:%S")
            }
        except:
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        for k in ("account", "restaurant", "address", "status"):
            if (orderInfo[k] == None):
                msg = str({"message": "No " + k + " field."})
                return Response(msg, status=400)

        # CHECK IF RESTAURANT EXISTS
        tmp = Connection().findByID("restaurants", orderInfo["restaurant"])

        if (tmp == None):
            msg = str({"message": "There is no restaurant with this id"})
            return Response(msg, status=400)

        # CHECK IF ACCOUNT EXISTS
        tmp = Connection().findByID("accounts", orderInfo["account"])

        if (tmp == None):
            msg = str({"message": "There is no account with this id"})
            return Response(msg, status=400)

        # CHECK ORDER STATUS
        if (orderInfo["status"] not in ("0", "1", "2")):
            msg = str({"message": "Incorrect order status"})
            return Response(msg, status=400)

        # CREATE ITEM LIST
        try:
            items = list(orderInfo["items"].split(" "))
        except:
            msg = str({"message": "incorrect item list format"})
            return Response(msg, status=400)

        for i in items:
            res = None

            try:
                res = Connection().findByIDAndOtherConditions(
                    "dishes", i, {"restaurant": orderInfo["restaurant"]})
            except:
                pass

            if ((res == None) or (len(res) == 0)):
                msg = str({"message": "There is no item with id " + str(i)})
                return Response(msg, status=400)

        orderInfo["items"] = items
        res = Connection().insertOne("orders", orderInfo)
        msg = str({"message": res})
        
        return Response(msg, status=200)
