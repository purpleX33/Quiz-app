from pymongo import MongoClient
import requests
import json

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
    
def insert_many_document(collection, documents):
    client = get_mongo_connection()
    db = client.quiz
    coll = db.get_collection(collection)
    result = coll.insert_many(documents)
    client.close()
    return result.inserted_ids

def get_quiz_questions():
    client = get_mongo_connection()
    db = client.quiz
    questions_coll = db.get_collection("questions")
    questions = list(questions_coll.find())
    client.close()
    return questions

def api_to_mongo(category, difficulty='Easy'):
    # Define the API endpoint and parameters

    url = "https://quizapi.io/api/v1/questions"
    params = {
        'apiKey': 'UoHJy7ilBF00V5FP7HQBFqMqsrE0m4a2nib5GzJ4',
        'limit': 10,
        'category': category,
        'difficulty': difficulty
    }
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Api-Key': 'UoHJy7ilBF00V5FP7HQBFqMqsrE0m4a2nib5GzJ4'
    }
    response = requests.get(url, headers=headers, params=params)
    data = json.loads(response.text)

    # Insert the API response into MongoDB
    insert_many_document('questions', data)
    print("Data inserted into MongoDB successfully.")


    
