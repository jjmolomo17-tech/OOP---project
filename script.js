//  Class representing a single quiz question
class Question {
    constructor(text, options, correctIndex) {
        this.text = text;
        this.options = options;
        this.correctIndex = correctIndex;
    }

    //  Method to check if selected answer is correct
    isCorrect(selectedIndex) {
        return selectedIndex === this.correctIndex;
    }
}

//  Class representing a quiz topic with multiple questions
class QuizTopic {
    constructor(name, questions) {
        this.name = name;
        this.questions = questions;
    }
}

//  Main class to manage quiz logic 
class QuizApp {
    constructor(topics) {
        this.topics = topics; // Object containing all quiz topics
        this.currentTopic = null;
        this.currentQuestionIndex = 0;
        this.score = 0;

        //  DOM elements -Document Object Model, which is a structured representation of the HTML content loaded in the browser.
        this.homeScreen = document.getElementById('home-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.questionText = document.getElementById('question-text');
        this.answerOptions = document.getElementById('answer-options');
        this.progressText = document.getElementById('progress');
        this.scoreText = document.getElementById('score');
        this.finalScore = document.getElementById('final-score');
        this.percentage = document.getElementById('percentage');

        //  Event listeners for buttons - buttons that make your webpage interactive
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());
        document.getElementById('home-btn').addEventListener('click', () => this.goHome());

        //  Topic selection logic
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => this.startQuiz(card.dataset.topic));
        });
    }

    //  Start quiz for selected topic
    startQuiz(topicName) {
        this.currentTopic = this.topics[topicName];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.homeScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        this.quizScreen.classList.remove('hidden');
        this.loadQuestion();
    }

    //  Load current question and render options
    loadQuestion() {
        const question = this.currentTopic.questions[this.currentQuestionIndex];
        this.questionText.textContent = question.text;
        this.answerOptions.innerHTML = '';

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.classList.add('answer');
            btn.textContent = option;
            btn.addEventListener('click', () => this.handleAnswer(index, btn));
            this.answerOptions.appendChild(btn);
        });

        this.progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.currentTopic.questions.length}`;
        this.scoreText.textContent = `Score: ${this.score}`;
    }

    // Handle answer selection and apply feedback
    handleAnswer(selectedIndex, button) {
        const question = this.currentTopic.questions[this.currentQuestionIndex];
        const isCorrect = question.isCorrect(selectedIndex);

        if (isCorrect) {
            this.score;
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
            // Highlight correct answer
            const correctBtn = this.answerOptions.children[question.correctIndex];
            correctBtn.classList.add('correct');
        }

        // Disable all buttons after selection
        Array.from(this.answerOptions.children).forEach(btn => btn.disabled = true);
    }

    //  Move to next question or show results
    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.currentTopic.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    //  Display final score and percentage
    showResults() {
        this.quizScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.finalScore.textContent = `You scored ${this.score} out of ${this.currentTopic.questions.length}`;
        const percent = Math.round((this.score / this.currentTopic.questions.length) * 100);
        this.percentage.textContent = `${percent}%`;
    }

    //  Restart current quiz
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.resultScreen.classList.add('hidden');
        this.quizScreen.classList.remove('hidden');
        this.loadQuestion();
    }

    //  Return to home screen
    goHome() {
        this.resultScreen.classList.add('hidden');
        this.quizScreen.classList.add('hidden');
        this.homeScreen.classList.remove('hidden');
    }
}

//  Sample questions for each topic
const quizData = {
    science: new QuizTopic('Science', [
        new Question('What planet is known as the Red Planet?', ['Earth', 'Mars', 'Jupiter', 'Venus'], 1),
        new Question('What gas do plants absorb?', ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], 1),
    ]),
    history: new QuizTopic('History', [
        new Question('Who was the first president of the USA?', ['Lincoln', 'Washington', 'Jefferson', 'Adams'], 1),
        new Question('In which year did World War II end?', ['1942', '1945', '1948', '1950'], 1),
    ]),
    sports: new QuizTopic('Sports', [
        new Question('How many players in a soccer team?', ['9', '10', '11', '12'], 2),
        new Question('Which sport uses a puck?', ['Football', 'Hockey', 'Basketball', 'Tennis'], 1),
    ]),
    movies: new QuizTopic('Movies', [
        new Question('Who directed "Inception"?', ['Nolan', 'Spielberg', 'Tarantino', 'Cameron'], 0),
        new Question('Which movie features a DeLorean time machine?', ['Matrix', 'Back to the Future', 'Avatar', 'Titanic'], 1),
    ])
};

//  Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp(quizData);
});
