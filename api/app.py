
from flask import Flask
from flask_restful import Api

from services.account import LoginAccount, LogoutAccount, RegisterAccount
from services.dish import AddDish, AvailableDishes
from services.order import CreateOrder
from services.restaurant import AddRestaurant, AvailableRestaurants
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

# LOAD CONFIGURATION FROM A CONFIGURATION FILE
try:
    from flaskConfig import FlaskConfig
    app.config.from_object(FlaskConfig)
except:
    from defaultFlaskConfig import DefaultFlaskConfig
    app.config.from_object(DefaultFlaskConfig)

# API SETUP
api.add_resource(RegisterAccount, RegisterAccount().url)
api.add_resource(LoginAccount, LoginAccount().url)
api.add_resource(LogoutAccount, LogoutAccount().url)


api.add_resource(AddRestaurant, AddRestaurant().url)
api.add_resource(AvailableRestaurants, AvailableRestaurants().url)


api.add_resource(AddDish, AddDish().url)
api.add_resource(AvailableDishes, AvailableDishes().url)


api.add_resource(CreateOrder, CreateOrder().url)

if (__name__ == "__main__"):
    app.run()
