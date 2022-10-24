from flask import Flask, jsonify, request
from flask_restful import Resource
from datetime import datetime, timedelta
from .db_connection.dbConnection import DBConnection

# Input: {account, restaurant, items, address, status}
# (Separate items with a space)
#
# Output: {
#	status, (0 means ok)
#	response (Order details or error message)
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
			return jsonify({"status": -1, "response": "Invalid data format"})

		for k in ("account", "restaurant", "address", "status"):
			if (orderInfo[k] == None):
				return jsonify({"status": -1, "response": "No " + k + " field."})

		# CHECK IF RESTAURANT EXISTS
		tmp = DBConnection().findByID("restaurants", orderInfo["restaurant"])

		if (tmp == None):
			return jsonify({"status": -1, "response": "There is no restaurant with this id"})

		# CHECK IF ACCOUNT EXISTS
		tmp = DBConnection().findByID("accounts", orderInfo["account"])

		if (tmp == None):
			return jsonify({"status": -1, "response": "There is no account with this id"})

		# CHECK ORDER STATUS
		if (orderInfo["status"] not in ("0", "1", "2")):
			return jsonify({"status": -1, "response": "Incorrect order status"})

		# CREATE ITEM LIST
		try:
			items = list(orderInfo["items"].split(" "))
		except:
			return jsonify({"status": -1, "response": "incorrect item list format"})

		for i in items:
			res = None

			try:
				res = DBConnection().findByIDAndOtherConditions("dishes", i, {"restaurant": orderInfo["restaurant"]})
			except:
				pass

			if ((res == None) or (len(res) == 0)):
				return jsonify({"status": -1, "response": "There is no item with id " + str(i)})

		orderInfo["items"] = items

		res = DBConnection().insertOne("orders", orderInfo)
		return jsonify({"status": 0, "response": res})