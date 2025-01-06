const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart');
const yearSpan = document.getElementById('year');

const quizQuestions = [
    {
        question: "Seberapa sering kamu & pasanganmu menghabiskan waktu bersama?",
        answers: {
            a: "Setiap hari",
            b: "Beberapa kali seminggu",
            c: "Jarang sekali"
        },
        correctAnswer: 'a'
    },
    {
        question: "Apakah kamu & pasanganmu memiliki hobi yang sama?",
        answers: {
            a: "Ya, banyak hobi yang sama",
            b: "Beberapa hobi yang sama",
            c: "Tidak ada hobi yang sama"
        },
        correctAnswer: 'a'
    },
    {
        question: "Seberapa sering kamu & pasanganmu berkomunikasi?",
        answers: {
            a: "Setiap saat",
            b: "Beberapa kali sehari",
            c: "Hanya saat perlu"
        },
        correctAnswer: 'a'
    },
    {
        question: "Apakah kamu & pasanganmu sering bertengkar?",
        answers: {
            a: "Hampir tidak pernah",
            b: "Kadang-kadang",
            c: "Sering sekali"
        },
        correctAnswer: 'a'
    },
    {
        question: "Apakah kamu merasa nyaman dengan pasanganmu?",
        answers: {
            a: "Sangat nyaman",
            b: "Cukup nyaman",
            c: "Tidak nyaman"
        },
        correctAnswer: 'a'
    }
];

let currentQuestion = 0;
let score = 0;

// Build quiz
function buildQuiz() {
    const output = [];

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question ${questionNumber === 0 ? 'active' : ''}">
                <div class="question-text">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

// Show current question
function showQuestion(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, i) => {
        question.classList.remove('active');
        if (i === index) {
            question.classList.add('active');
            question.style.animation = 'slideIn 0.5s ease-in'; // Animasi slideIn
        }
    });

    prevButton.disabled = index === 0;
    nextButton.disabled = index === quizQuestions.length - 1;
    submitButton.style.display = index === quizQuestions.length - 1 ? 'block' : 'none';
    restartButton.style.display = 'none'; // Sembunyikan tombol Ulangi Quiz saat pertanyaan aktif
}

// Show results
function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    score = 0;

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            score++;
        }
    });

    let resultMessage = '';
    if (score === quizQuestions.length) {
        resultMessage = "🎉 Kamu & pasanganmu sangat cocok! 🎉";
    } else if (score >= quizQuestions.length / 2) {
        resultMessage = "😊 Kamu & pasanganmu cukup cocok! 😊";
    } else {
        resultMessage = "💔 Kamu & pasanganmu mungkin perlu lebih banyak waktu bersama. 💔";
    }

    resultsContainer.innerHTML = resultMessage;
    resultsContainer.style.display = 'block';
    resultsContainer.style.animation = 'fadeIn 1s ease-in, float 3s infinite ease-in-out'; // Animasi fade dan naik turun
    restartButton.style.display = 'block'; // Tampilkan tombol Ulangi Quiz
    submitButton.style.display = 'none';
}

// Event listeners
prevButton.addEventListener('click', () => {
    currentQuestion--;
    showQuestion(currentQuestion);
});

nextButton.addEventListener('click', () => {
    currentQuestion++;
    showQuestion(currentQuestion);
});

submitButton.addEventListener('click', showResults);

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    buildQuiz();
    showQuestion(currentQuestion);
    resultsContainer.style.display = 'none';
    restartButton.style.display = 'none';
});

// Add event listeners to answers for selection animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.answers label').forEach(label => {
        label.addEventListener('click', () => {
            // Remove selected class from all labels
            document.querySelectorAll('.answers label').forEach(l => l.classList.remove('selected'));
            // Add selected class to clicked label
            label.classList.add('selected');
        });
    });
});

// Dynamic year for copyright
yearSpan.textContent = new Date().getFullYear();

// Initialize quiz
buildQuiz();
showQuestion(currentQuestion);