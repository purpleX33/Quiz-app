from flask import request, jsonify
import json
import requests

def api_to_mongo():
    # Define the API endpoint and parameters
    url = "https://opentdb.com/api.php"
    params = {
    'amount':'10',
    'category':'18',
    'difficulty':'easy',
    'type':'multiple',
    }

    # Send the HTTP GET request using Flask's request object
    
    # response = requests.request("GET", url, headers=headers, params=params)
    response = requests.get( url, params=params)
    if response.status_code == 200:
        data = response.json()
        print(data['results'])
    else:
        # Return an error message if the request failed
        return f"Error: {response.status_code}"
api_to_mongo()


