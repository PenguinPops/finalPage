const quizData = [
    {
        image: "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWQlMjBhbGwlMjB0eXBlc3xlbnwwfHwwfHx8MA%3D%3D",
        question: "Który z tych kolorów lubisz najbardziej?",
        answers: {
            A: "Brązowy",
            B: "Czarny",
            C: "Biały",
            D: "Żółty"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1518562923427-19e694fbd8e9?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        question: "Jak preferujesz zjeść?",
        answers: {
            A: "Na słono",
            B: "Oby wcale",
            C: "Byle dużo",
            D: "Na słodko"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        question: "Ulubiony posiłek dnia?",
        answers: {
            A: "Kolacja",
            B: "Śniadanie",
            C: "Obiad",
            D: "To co pomiędzy"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1608019528071-c1a5c53c738c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        question: "Twoje ulubione danie z pieczywem to",
        answers: {
            A: "Zapiekanki",
            B: "Kanapki",
            C: "Tosty",
            D: "Drożdżówki"
        }
    }
];


function loadQuestion() {
    console.log(currentQuestion);
    const questionData = quizData[currentQuestion];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('question-container').style.backgroundImage = 'url(' + questionData.image + ')';
    document.getElementById('answerA').innerText = questionData.answers.A;
    document.getElementById('answerB').innerText = questionData.answers.B;
    document.getElementById('answerC').innerText = questionData.answers.C;
    document.getElementById('answerD').innerText = questionData.answers.D;
}

function showResult(index) {
    let results = [];
    fetch('https://penguinpops.github.io/fp-fake-api/data.json')
    .then(response => response.json())
    .then(data => {
        results = data;
    })
    .catch(error => console.error('Error fetching data:', error));
    let result = results[index];
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <div class="result-container">
            <img src="${result.image}" alt="${result.title}" class="result-image">
            <h2 class="result-title">${result.title}</h2>
            <p class="result-content">${result.content}</p>
            <div class="answer" id="qReset" onclick="resetQuiz()">Powtórz quiz</div>
        </div>
    `;
}


function selectAnswer(answer) {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.style.opacity = '0';
    setTimeout(() => {
        ansTable[answer - 1]++;
        currentQuestion++;
        localStorage.setItem('ansTable', JSON.stringify(ansTable));
        localStorage.setItem('currentQuestion', currentQuestion);
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            qStatus = 'done';
            localStorage.setItem("qStatus", qStatus);
            const qResult = ansTable.indexOf(Math.max(...ansTable));
            localStorage.setItem("qResult", qResult);
            showResult(qResult);
        }
        quizContainer.style.opacity = '1';
    }, 600);
}

let currentQuestion;
let ansTable;

function checkQuiz() {
    
    if(localStorage.getItem("qStatus") === 'done'){
        const result = localStorage.getItem("qResult");
        showResult(results[result]);
    }
    else if(localStorage.getItem("qStatus") === 'inprog') {
        const storedAnsTable = localStorage.getItem('ansTable');
        if (storedAnsTable) {
            ansTable = JSON.parse(storedAnsTable);
        }
        currentQuestion = parseInt(localStorage.getItem('currentQuestion'),10);
        loadQuestion();
    }
    else {
        currentQuestion = 0;
        ansTable = [0,0,0,0];
        let qStatus = 'inprog';
        localStorage.setItem("qStatus", qStatus);
        localStorage.setItem("currentQuestion", currentQuestion);
        localStorage.setItem('ansTable', JSON.stringify(ansTable));
        loadQuestion();
    }
}

function resetQuiz() {
    localStorage.setItem("qStatus", "todo");
    localStorage.setItem("qResult", "todo");
    location.reload();
}

