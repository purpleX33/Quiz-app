
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from mongo import get_quiz_questions, get_mongo_connection,api_to_mongo,insert_document,get_score
import datetime


app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Define routes
@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')

    client = get_mongo_connection()
    db = client.quiz
    user = db.users.find_one({"email": email})

    client.close()

    if user and password == user['password']:
        session['user_id'] = str(user['_id'])
        return redirect(url_for('genre'))
    else:
        flash('Invalid credentials. Please try again.')
        return redirect(url_for('login'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')

        client = get_mongo_connection()
        db = client.quiz
        existing_user = db.users.find_one({"email": email})

        if existing_user:
            client.close()
            return jsonify({"success": False, "message": "Email already exists"})

        db.users.insert_one({"email": email, "password": password})
        client.close()
        return jsonify({"success": True})

    return render_template('signup.html')

@app.route('/score')
def score():
    ScoreTracker=get_score(session['user_id'])
    return render_template('score.html', score=ScoreTracker)

@app.route('/score', methods=['POST'])
def save_score():
    # Assuming the score is sent as JSON data in the request body
    data = request.json
    score = data.get('score')  # Get the score from the JSON data
    userID= session['user_id']
    
    document = {
        'user_id': userID,
        'score': score,
        'timestamp': datetime.datetime.now()
    }
    insert_document('ScoreTracker', document)
    return jsonify({'success': True}), 200


@app.route('/genre')
def genre():
    return render_template('genre.html')

@app.route('/quiz')
def quiz():
    questions = get_quiz_questions()
    return render_template('quiz.html', questions=questions)

@app.route('/api_to_mongo', methods=['POST'])
def call_api_to_mongo():
    data = request.json
    genre = data.get('genre')
    print(genre)
    if genre:
        api_to_mongo(genre)
        print(genre)
        return 'API call successful', 200
    else:
        return 'Invalid request', 400

@app.route('/submit', methods=['POST'])
def submit():
    # This route will handle form submission when the user submits their answers
    # You can process the submitted answers and calculate the score here
    return 'Answers submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)