from flask import Flask
from pymongo import MongoClient
from bson.objectid import ObjectId
import pathlib
import os

class DBConnection():
	def __init__(self):
		# LOAD DATABASE CONFIGURATION FROM A CONFIGURATION FILE
		try:
		    from .dbConfig import DBConfig
		    cfg = DBConfig()
		except:
		    from .defaultDBConfig import DefaultDBConfig
		    cfg = DefaultDBConfig()

		self.client = MongoClient(cfg.host, cfg.port)
		self.db = self.client.foodAppDB
	
	def findByID(self, collection, _id):
		res = self.db[collection].find_one({"_id": ObjectId(_id)})

		if (res != None):
			res["_id"] = str(res["_id"])

		return res

	def findOne(self, collection, query):
		res = self.db[collection].find_one(query)

		if (res != None):
			res["_id"] = str(res["_id"])

		return res

	def find(self, collection, query):
		tmp = []
		res = self.db[collection].find(query)

		if (res != None):
			for r in res:
				r["_id"] = str(r["_id"])
				tmp.append(r)

		return tmp

	def findByIDAndOtherConditions(self, collection, _id, query):
		query["_id"] = ObjectId(_id)
		return self.find(collection, query)

	def insertOne(self, collection, doc):
		_id = self.db[collection].insert_one(doc)
		res = self.findByID(collection, _id.inserted_id)
		return res
