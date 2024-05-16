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

def truncate_collection(collection):
    client = get_mongo_connection()
    db = client.quiz
    coll = db.get_collection(collection)
    # Delete all documents in the collection
    result = coll.delete_many({})
    # Print the number of documents deleted
    print(f"{result.deleted_count} documents deleted from the collection {collection}")
    client.close()
    return result.deleted_count

def get_quiz_questions():
    client = get_mongo_connection()
    db = client.quiz
    questions_coll = db.get_collection("questions")
    questions = list(questions_coll.find())
    client.close()
    return questions

def api_to_mongo(category, difficulty='Easy'):
    # Define the API endpoint and parameters

    url = "https://opentdb.com/api.php"
    params = {
    'amount':'10',
    'category':'18',
    'difficulty':'easy',
    'type':'multiple',
    }
    # response = requests.request("GET", url, headers=headers, params=params)
    response = requests.get( url, params=params)
    if response.status_code == 200:
        data = response.json()
        print(data['results'])
        truncate_collection('questions')
        insert_many_document('questions', data)
        print("Data inserted into MongoDB successfully.")
    else:
        # Return an error message if the request failed
        return f"Error: {response.status_code}"


    
