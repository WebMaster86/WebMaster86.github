// Variables
let currentExercise = {};
const levels = ['Fácil', 'Medio', 'Difícil'];
const answerInput = document.getElementById('answer');
const resultMessage = document.getElementById('result-message');
const numberButtons = document.getElementById('number-buttons');

// Función para generar un nuevo ejercicio
function generateExercise() {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    switch (level) {
        case 'Fácil':
            currentExercise = { question: `${num1} + ${num2}`, answer: num1 + num2 };
            break;
        case 'Medio':
            currentExercise = { question: `${num1} - ${num2}`, answer: num1 - num2 };
            break;
        case 'Difícil':
            //currentExercise = { question: `${num1} * ${num2}`, answer: num1 * num2 };
            break;
    }

    document.getElementById('exercise-container').innerText = `Resuelve: ${currentExercise.question}`;
    answerInput.value = '';
    resultMessage.innerText = '';
    resultMessage.style.display = 'block'; // Evita que el contenedor se expanda

    // Actualizar números en los botones
    const numbers = [currentExercise.answer - 1, currentExercise.answer, currentExercise.answer + 1];
    for (let i = 0; i < 3; i++) {
        numberButtons.children[i].innerText = numbers[i];
    }

    document.querySelector('button[onclick="checkAnswer()"]').style.display = 'block'; // Muestra el botón de verificar respuesta
}

// Función para seleccionar un número de los botones
function selectNumber(selectedNumber) {
    const selectedButton = numberButtons.querySelector(`button:nth-child(${selectedNumber})`);
    answerInput.value = selectedButton.innerText;
}

// Función para verificar la respuesta
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);

    if (!isNaN(userAnswer)) {
        if (userAnswer === currentExercise.answer) {
            resultMessage.innerText = '¡Excelente! Respuesta correcta.  😊';
        } else {
            resultMessage.innerText = 'Ups! Respuesta incorrecta. ¡Inténtalo de nuevo! ☹️';
        }
    } else {
        resultMessage.innerText = 'Por favor, ingresa un número válido.  😕';
    }
}

// Variables de autenticación
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authContainer = document.getElementById('auth-container');
const gameContainer = document.querySelector('.container');
const logoutButton = document.getElementById('logout-button');

// Inicialmente, esconde el juego hasta que el usuario inicie sesión
gameContainer.style.display = 'none';

// Evento de registro
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // Almacenar usuario
    localStorage.setItem(username, password);
    alert('Usuario registrado con éxito. Por favor, inicie sesión.');
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('current_user');
    localStorage.removeItem('currentExercise'); // Eliminar ejercicio actual al cerrar sesión
    authContainer.style.display = 'block';
    gameContainer.style.display = 'none';
    document.getElementById('exercise-container').innerText = ''; // Limpiar contenido del contenedor de ejercicio
}

// Evento de inicio de sesión
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Verificar usuario
    if (localStorage.getItem(username) === password) {
        authContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        document.getElementById('number-buttons').style.display = 'none'; // Oculta los botones de números
        document.querySelector('button[onclick="generateExercise()"]').style.display = 'none'; // Oculta el botón de nuevo ejercicio
        document.querySelector('button[onclick="showExerciseScreen()"]').style.display = 'block'; // Muestra el botón Ir a Ejercicios

        // Oculta los elementos no deseados
        document.getElementById('exercise-container').style.display = 'block'; // Muestra el contenedor de ejercicio
        document.getElementById('answer').style.display = 'block'; // Muestra el campo de respuesta
        document.getElementById('result-message').style.display = 'block'; // Muestra el mensaje de resultado
        document.querySelector('.container > button:nth-child(6)').style.display = 'none'; // Oculta el botón "Nuevo Ejercicio"

        // Almacena el usuario actual en el almacenamiento local
        localStorage.setItem('current_user', username);
    } else {
        alert('Usuario o contraseña incorrecta.');
    }
});

// Función para mostrar la pantalla de ejercicios
function showExerciseScreen() {
    document.getElementById('number-buttons').style.display = 'block';
    document.querySelector('button[onclick="showExerciseScreen()"]').style.display = 'none';
    document.querySelector('button[onclick="generateExercise()"]').style.display = 'block';
    generateExercise();
}
