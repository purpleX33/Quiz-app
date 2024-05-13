from flask import Flask, render_template
from mongo import get_quiz_questions,api_to_mongo

app = Flask(__name__)

# Define routes
@app.route('/')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/score')
def score():
    return render_template('score.html')

@app.route('/genre')
def genre():
    api_to_mongo(category='linux')
    return render_template('genre.html')

@app.route('/quiz')
def quiz():
    questions = get_quiz_questions()
    return render_template('quiz.html', questions=questions)

@app.route('/submit', methods=['POST'])
def submit():
    # This route will handle form submission when the user submits their answers
    # You can process the submitted answers and calculate the score here
    return 'Answers submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)
