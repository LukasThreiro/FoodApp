from flask import Flask, jsonify, request
from flask_restful import Resource
from datetime import datetime, timedelta
from .db_connection.dbConnection import DBConnection

# Input: {name, email, password, telephone}
#
# Output: {
#	status, (0 means ok)
#	response (Account details or error message)
# }
class RegisterAccount(Resource):
	def __init__(self):
		self.url = "/account/register"

	def checkParam(self, param):
		if ((param == None) or (param == "")):
			return None
		else:
			return str(param)

	def post(self):
		try:
			account = {
				"name": self.checkParam(request.form.get("name")),
				"email": self.checkParam(request.form.get("email")),
				"password": self.checkParam(request.form.get("password")),
				"telephone": self.checkParam(request.form.get("telephone")),
				"createdAt": datetime.today().strftime("%Y-%m-%d %H:%M:%S")
			}
		except:
			return jsonify({"status": -1, "response": "Invalid data format"})

		for k in ("name", "email", "password", "telephone"):
			if (account[k] == None):
				return jsonify({"status": -1, "response": "No " + k + " field."})

		res = DBConnection().insertOne("accounts", account)

		return jsonify({"status": 0, "response": res})

# Input: {email, password}
#
# Output: {
#	status, (0 means ok)
#	response (Account details with additional field "token" or error message)
# }
class LoginAccount(Resource):
	def __init__(self):
		self.url = "/account/login"

	def post(self):
		try:
			email = str(request.form.get("email"))
			password = str(request.form.get("password"))
		except:
			return jsonify({"status": -1, "response": "Invalid data format"})

		query = {"email": email, "password": password}
		res = DBConnection().findOne("accounts", query)

		if (res == None):
			return jsonify({"status": -1, "response": "The authentication credentials cannot be considered valid"})
		
		res.pop("password", None)
		res["token"] = datetime.now() + timedelta(minutes = 30)

		return jsonify({"status": 0, "response": res})

# Input: {email}
#
# Output: {
#	status, (0 means ok)
#	response (Account details with additional field "token" or error message)
# }
class LogoutAccount(Resource):
	def __init__(self):
		self.url = "/account/logout"

	def post(self):
		try:
			email = str(request.form.get("email"))
		except:
			return jsonify({"status": -1, "response": "Invalid data format"})

		query = {"email": email}
		res = DBConnection().findOne("accounts", query)

		if (res == None):
			return jsonify({"status": -1, "response": "No such account exists"})
		
		res.pop("password", None)
		res["token"] = datetime.now() + timedelta(minutes = -1)

		return jsonify({"status": 0, "response": res})

