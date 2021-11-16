"use strict"
// Theme Toggle
const theme = document.getElementById('theme').addEventListener('change', (event) => {
    // Если нажали на инпут, то у HTML убираем класс dark и light и назначаем нажатый класс
    if (event.target.nodeName === 'INPUT') {
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(event.target.value)
    }
})


// data
const data = [
    {
        id: 0,
        question: 'Для какого тега элемент &lt;!DOCTYPE&gt выступает родителем',
        answers: [
            '&lt;HTML&gt',
            '&lt;TITLE&gt',
            '&lt;BODY&gt',
            '&lt;HEAD&gt',
            'Ни для какого'
        ],
        correct: 4
    },
    {
        id: 1,
        question: 'При наведении мыши на изображение, должна появляться всплывающая подсказка с текстом «Подсказка». Какой код для этого используется',
        answers: [
            '&lt;img src="photo.png" alt="Подсказка"&gt',
            '&lt;img src="photo.png" alt="Подсказка"  title="Изображение"&gt',
            '&lt;img src="photo.png" alt="Подсказка"  title="Подсказка"&gt'
        ],
        correct: 2
    },
    {
        id: 2,
        question: 'В HTML onblur и onfocus это',
        answers: [
            'HTML атрибуты',
            'Атрибуты событий',
            'Стилевые атрибуты'
        ],
        correct: 1
    },
    {
        id: 3,
        question: 'В какую сторону сдвигает элемент положительное значение bottom?',
        answers: [
            'Влево',
            'Вниз',
            'Вправо',
            'Вверх',
        ],
        correct: 3
    },
    {
        id: 4,
        question: 'Можно ли использовать отрицательные значения для свойств padding',
        answers: [
            'Да, отрицательные значения можно использовать',
            'Нет, отрицательные значения использовать нельзя'
        ],
        correct: 1
    },
    {
        id: 5,
        question: 'Верно ли, что null == undefined?',
        answers: [
            'true',
            'false',
        ],
        correct: 0
    },
    {
        id: 6,
        question: 'Верно ли, что null === undefined?',
        answers: [
            'true',
            'false',
        ],
        correct: 1
    },
    {
        id: 7,
        question: 'Какой метод позволяет вызвать функцию, передав в неё аргументы в виде массива?',
        answers: [
            'bind',
            'invoke',
            'call',
            'apply',
        ],
        correct: 3
    },
    {
        id: 8,
        question: 'Какие циклы есть в JavaScript',
        answers: [
            'for, forMap, forEach, while',
            'for, while, do while, forEach',
            'for, while, do while',
            'for, forMap, forEach, while, do while',
        ],
        correct: 2
    },
    {
        id: 2,
        question: 'Где можно использовать JavaScript?',
        answers: [
            'Мобильное приложение',
            'Веб-приложение',
            'Серверные приложения',
            'Прикладное программное обеспечение',
            'Можно во всех перечисленных'
        ],
        correct: 4
    },
]

//  Init
const quiz = document.getElementById('quiz')
const questionsBody = document.getElementById('questions')
const resultsBody = document.getElementById('results')
const btnRestart = document.getElementById('btn-restart')
const btnNext = document.getElementById('btn-next')

// Счетчик вопроса
let questionCounter = 0

// Для хранения ответов
let storage = {
    // индекс вопроса : индекс элемента ответа
}

// Render QUESTIONS Body
const renderQuestionsBody = (questionNumber) => {
    btnNext.disabled = true
    btnRestart.style.opacity = '0' // выкл кнопку restart

    // Render Answers. index при мапе нужен для дальнейшей идентификации нажатого ответа.
    const renderAnswers = (questionNumber) => data[questionNumber].answers
        .map((answer, index) => `
            <li>
                <label>
                    <input class="answer__input" type="radio" name=${questionNumber} value=${index}>
                    <span class="answer">${answer}</span>
                </label>
            </li>`)
        .join('')

    let content = `
    <div class="counter">
        вопрос ${questionNumber + 1}/${data.length}
    </div>
    <div class="questions__question">
        ${data[questionNumber].question}
    </div>
    <ul class="questions__answers">
        ${renderAnswers(questionNumber)}
    </ul>
    `
    // Добавляем в DOM
    questionsBody.innerHTML = content
}

// Observer change INPUTS
quiz.addEventListener('change', (event) => {
    // Включаем кнопку
    btnNext.disabled = false

    // Заносим в storage
    storage[event.target.name] = Number(event.target.value)
})

// Listener BTN NEXT
btnNext.addEventListener('click', () => {
    if (questionCounter + 2 === data.length) {
        // Если вопрос предпоследний поменять текст кнопки Next
        btnNext.textContent = 'Ответить и узнать результаты'
    }
    if (questionCounter + 1 === data.length) {
        // Вопросы закончились. Показать результаты.
        renderResultsBody()
        btnRestart.style.opacity = '1'
        btnNext.style.opacity = '0'
    } else {
        // Если вопросы еще есть - показать следующий вопрос
        questionCounter += 1
        renderQuestionsBody(questionCounter)
        // Вкл disabled кнопки
        btnNext.disabled = true
    }
})

const renderResultsBody = () => {
    // Выкл questionsBody и вкл resultsBody
    questionsBody.style.display = 'none'
    resultsBody.style.display = 'block'

    // Render Results
    const renderResultsAnswers = (questionNumber) => {
        return data[questionNumber].answers.map((answer, index) => {
            // Если индекс итерируемого ответа совпадает с индексом верного ответа, иначе если это верный ответ
            if (index === data[questionNumber].correct) return `<li class="result__answer result__answer--correct">${answer}</li>`
            // Если индекс итерируемого ответа совпадает с нашим ответом
            if (storage[questionNumber] === index) return `<li class="result__answer result__answer--invalid">${answer}</li>`
            // Для всех других случаев
            return `<li class="result__answer">${answer}</li>`
        }).join('')
    }

    // Создаём переменную, в которую при каждой итерации добавляем контент. А не сразу в DOM. Для оптимизации
    let content = `<div class="results__title"> Результаты </div>`

    // Перебираем массив: выводим вопрос и его ответы для каждого элемента
    data.forEach((item, index) => {
        content += `
        <div class="result__question">
            ${data[index].question}
        </div>
        <ul class="result__answers">
            ${renderResultsAnswers(index)}
        </ul>
        `
    })
    // Только теперь добавляем в DOM
    resultsBody.innerHTML = content
}

btnRestart.addEventListener('click', () => {
    storage = {} // Очищаем ответы
    questionCounter = 0 // Счётчик вопроса
    questionsBody.style.display = 'block' // вкл questionBody
    resultsBody.style.display = 'none' // выкл questionBody
    btnNext.style.opacity = '1' // вкл кнопку next
    btnNext.textContent = 'Следующий вопрос' // Сменить текст кнопки
    renderQuestionsBody(questionCounter) // Запускаем рендер вопроса
})

renderQuestionsBody(0)

