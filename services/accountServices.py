from flask import Flask, jsonify, request
from flask_restful import Resource
from datetime import datetime
from .db_connection.dbConnection import DBConnection

class RegisterAccount(Resource):
	def __init__(self):
		self.url = "/account/register"

	def post(self):
		try:
			account = {
				"name": str(request.form.get("name")),
				"email": str(request.form.get("email")),
				"password": str(request.form.get("password")),
				"telephone": str(request.form.get("telephone")),
				"createdAt": datetime.today().strftime("%Y-%m-%d %H:%M:%S")
			}
		except:
			return jsonify({"status": 0, "response": "Not all fields are completed"})

		res = DBConnection().insertOne("accounts", account)

		return jsonify({"status": 1, "response": res})




