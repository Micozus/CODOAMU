window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let ingredient = document.createElement('li');
const ingList = document.querySelector('.ingredients');
ingList.appendChild(ingredient);

recognition.addEventListener('result', e => {
    ingredient.textContent = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    if (e.results[0].isFinal) {
        ingredient = document.createElement('li');
        ingList.appendChild(ingredient);
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();