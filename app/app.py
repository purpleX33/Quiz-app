from flask import Flask, render_template
from mongo import *

app = Flask(__name__)

# Define routes
@app.route('/')
def index():
    return render_template('index.html')

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