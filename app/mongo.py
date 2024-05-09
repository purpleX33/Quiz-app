from pymongo import MongoClient

def get_mongo_connection():
    client = MongoClient("mongodb+srv://pr4tik33:Mongo_pr4tik33@quiz.1aqzltf.mongodb.net/")
    return client

def insert_document(collection, document):
    client = get_mongo_connection()
    db = client.quiz
    coll = db.get_collection(collection)
    result = coll.insert_one(document)
    client.close()
    return result.inserted_id

def get_quiz_questions():
    client = get_mongo_connection()
    db = client.quiz
    questions_coll = db.get_collection("questions")
    questions = list(questions_coll.find())
    client.close()
    return questions
