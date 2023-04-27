const questions = [
  {
    question: 'Company',
    options: [
      { text: 'Yes', next: 1 },
      { text: 'No', next: 1 },
    ],
  },
  {
    question: 'Main Contact',
    options: [
      { text: 'Yes', next: 2 },
      { text: 'No', next: 2 },
    ],
  },
  {
    question: 'Specialist Contacts',
    options: [
      { text: 'Yes', next: 3 },
      { text: 'No', next: 3 },
    ],
  },
  {
    question: 'CV/Bios',
    options: [
      { text: 'Yes', next: 4 },
      { text: 'No', next: 4 },
    ],
  },
  {
    question: 'Specialist skills',
    options: [
      { text: 'Yes', next: 5 },
      { text: 'No', next: 5 },
    ],
  },
  {
    question: 'Sector',
    options: [
      { text: 'Yes', next: 6 },
      { text: 'No', next: 6 },
    ],
  },
  {
    question: 'Case studies (With tags)',
    options: [
      { text: 'Yes', next: 7 },
      { text: 'No', next: 7 },
    ],
  },
  {
    question: 'Location',
    options: [
      { text: 'Yes', next: 8 },
      { text: 'No', next: 8 },
    ],
  },
  {
    question: 'Commitment to new skills and services with predicated commencement date.',
    options: [
      { text: 'Yes', next: 9 },
      { text: 'No', next: 9 },
    ],
  }
];

const questionContainer = document.getElementById('question-container');
const prevQuestionButton = document.getElementById('prev-question');

let currentQuestionIndex = 0;
let questionHistory = [];
let answers = [];


function displayQuestion(index) {
  if (index >= questions.length) {
    const formattedAnswers = answers.map(answer => `${answer.question}: ${answer.answer}`).join('\n');
    alert(`You've completed the questionnaire. Here are your answers:\n\n${formattedAnswers}`);
    return;
  }

  questionContainer.innerHTML = '';
  const question = questions[index];

  const questionTitle = document.createElement('h2');
  questionTitle.textContent = question.question;
  questionContainer.appendChild(questionTitle);

  question.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.addEventListener('click', () => {
      questionHistory.push(currentQuestionIndex);
      
      answers.push({ question: question.question, answer: option.text });

      if (i === 1) {
        displayTextInput(question.question);
      } else {
        currentQuestionIndex = option.next;
        displayQuestion(currentQuestionIndex);
      }
    });
    questionContainer.appendChild(button);
  });

  prevQuestionButton.style.display = questionHistory.length === 0 ? 'none' : 'inline-block';
}


function displayTextInput(question) {
  questionContainer.innerHTML = '';
  const inputLabel = document.createElement('label');
  inputLabel.textContent = 'Please provide more information:';
  questionContainer.appendChild(inputLabel);

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.id = 'additional-info';
  questionContainer.appendChild(inputField);

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', () => {
    const additionalInfo = document.getElementById('additional-info').value;
    answers[answers.length - 1].answer += ` (${additionalInfo})`;

    const currentOption = questions[currentQuestionIndex].options.find(option => option.text === 'No');
    currentQuestionIndex = currentOption.next;
    displayQuestion(currentQuestionIndex);
  });
  questionContainer.appendChild(submitButton);

  prevQuestionButton.style.display = questionHistory.length === 0 ? 'none' : 'inline-block';
}

function prevQuestion() {
  if (questionHistory.length === 0) return;
  
  currentQuestionIndex = questionHistory.pop();
  answers.pop();
  displayQuestion(currentQuestionIndex);
}

displayQuestion(currentQuestionIndex);
