import pymongo
from pymongo import MongoClient
import pprint #pretty print

client = MongoClient("mongodb+srv://pr4tik33:Mongo_pr4tik33@quiz.1aqzltf.mongodb.net/")
db = client.quiz
questions = db.questions
pprint.pprint(questions.find_one())