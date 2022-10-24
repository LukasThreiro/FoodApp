from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import os.path

app = Flask(__name__)
api = Api(app)

# LOAD CONFIGURATION FROM A CONFIGURATION FILE
try:
    from flaskConfig import FlaskConfig
    app.config.from_object(FlaskConfig)
except:
    from defaultFlaskConfig import DefaultFlaskConfig
    app.config.from_object(DefaultFlaskConfig)

# API SETUP
from services.accountServices import RegisterAccount, LoginAccount, LogoutAccount
api.add_resource(RegisterAccount, RegisterAccount().url)
api.add_resource(LoginAccount, LoginAccount().url)
api.add_resource(LogoutAccount, LogoutAccount().url)

if (__name__ == "__main__"):
    app.run()