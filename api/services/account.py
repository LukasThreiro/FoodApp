from flask import jsonify, request, Response
from flask_restful import Resource
from datetime import datetime, timedelta
from .storage.connection import Connection

# Input: {name, email, password, telephone}
#
# Output: {
# response (Account details or error message)
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
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        for k in ("name", "email", "password", "telephone"):
            if (account[k] == None):
                msg = str({"message": "No " + k + " field."})
                return Response(msg, status=400)

        res = Connection().insertOne("accounts", account)
        msg = str({"message": res})

        return Response(msg, status=200)

# Input: {email, password}
#
# Output: {
# response (Account details with additional field "token" or error message)
# }


class LoginAccount(Resource):
    def __init__(self):
        self.url = "/account/login"

    def post(self):
        try:
            email = str(request.form.get("email"))
            password = str(request.form.get("password"))
        except:
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        query = {"email": email, "password": password}
        res = Connection().findOne("accounts", query)

        if (res == None):
            msg = str({"message": "The authentication credentials cannot be considered valid"})
            return Response(msg, status=400)

        res.pop("password", None)
        res["token"] = datetime.now() + timedelta(minutes=30)

        msg = str({"message": res})
        
        return Response(msg, status=200)

# Input: {email}
#
# Output: {
# response (Account details with additional field "token" or error message)
# }

class LogoutAccount(Resource):
    def __init__(self):
        self.url = "/account/logout"

    def post(self):
        try:
            email = str(request.form.get("email"))
        except:
            msg = str({"message": "Invalid data format"})
            return Response(msg, status=400)

        query = {"email": email}
        res = Connection().findOne("accounts", query)

        if (res == None):
            msg = str({"message": "No such account exists"})
            return Response(msg, status=400)

        res.pop("password", None)
        res["token"] = datetime.now() + timedelta(minutes=-1)
        msg = str({"message": res})

        return Response(msg, status=200)
