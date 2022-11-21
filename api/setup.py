from setuptools import setup

setup(
	name = "FoodApp",
	include_package_data = True,
	install_requires = [
		"Flask",
		"Flask-RESTful",
		"flask_cors",
		"pymongo"
	]
)