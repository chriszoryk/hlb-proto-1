const questionContainer = document.getElementById('question-container');
const nextQuestionButton = document.getElementById('next-question');

let currentQuestionIndex = 0;

const questions = [
  {
    question: 'Do you like cats?',
    options: [
      { text: 'Yes', next: 1 },
      { text: 'No', next: 2 },
    ],
  },
  {
    question: 'Do you like dogs?',
    options: [
      { text: 'Yes', next: 3 },
      { text: 'No', next: 4 },
    ],
  },
  // Add more questions here
];

function displayQuestion(index) {
  questionContainer.innerHTML = '';
  const question = questions[index];

  const questionTitle = document.createElement('h2');
  questionTitle.textContent = question.question;
  questionContainer.appendChild(questionTitle);

  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.addEventListener('click', () => {
      currentQuestionIndex = option.next;
      nextQuestion();
    });
    questionContainer.appendChild(button);
  });
}

function nextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    alert('You have reached the end of the questionnaire.');
  } else {
    displayQuestion(currentQuestionIndex);
  }
}

nextQuestion();
