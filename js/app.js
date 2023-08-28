let $ = document

const rulesBtn = $.querySelector('.rules')
const modalElem = $.querySelector('.modal')
const closeBtn = $.querySelector('.close-button')

const userScoreElem = $.querySelector('.user-score')

const levelOneWrapper = $.querySelector('.level-one')
const guideElem = $.querySelector('.guide')
const rockElem = $.querySelector('.rock')
const paperElem = $.querySelector('.paper')
const scissorsElem = $.querySelector('.scissors')

const userPickedElem = $.querySelector('.userPicked')
const levelTwoWrapper = $.querySelector('.level-two')
const notSelectedElem = $.querySelector('.notSelected')
const SelectedElem = $.querySelector('.Selected')

const resultElem = $.querySelector('.result')
const resultTextElem = $.querySelector('.resultText')
const resultButtonElem = $.querySelector('.resultButton')

let userLevel = 1
let userScore = 0
let userSelectedObject = null
let randomNumber = null

let objects = ['rock', 'paper', 'scissors']

userScore = localStorage.getItem('score')

userScoreElem.innerHTML = userScore

// find user clicked object
if (userLevel == 1) {
    levelOneWrapper.addEventListener('click', event => {
        let userObjectClass = event.target.getAttribute("class")
        let userObjectAlt = event.target.getAttribute("alt")

        if (userObjectClass == 'circle scissors' && userObjectAlt == null || userObjectClass == null && userObjectAlt == 'scissors') {

            userSelectedObject = 'scissors'

        } else if (userObjectClass == 'circle paper' && userObjectAlt == null || userObjectClass == null && userObjectAlt == 'paper') {

            userSelectedObject = 'paper'

        } else if (userObjectClass == 'circle rock' && userObjectAlt == null || userObjectClass == null && userObjectAlt == 'rock') {

            userSelectedObject = 'rock'
        }

        if (userSelectedObject != null) {
            // hide transition
            setTimeout(() => {
                levelOneWrapper.style.display = 'none'
            }, 200)
            levelOneWrapper.style.opacity = '0'
            guideElem.style.opacity = '0'

            userLevel = 2
            objectGenerator(userSelectedObject)
        }
    })
}

resultButtonElem.addEventListener('click', () => {
    localStorage.setItem('score', userScore)
    window.location.reload()
})

// functions
const objectGenerator = objectName => {

    // unhide transition
    setTimeout(() => {
        levelTwoWrapper.style.display = 'flex'
    }, 500)
    levelTwoWrapper.style.opacity = '1'

    let objectTemplate = `
    <div class="circle ${objectName}" id="${objectName}">
        <div class="white-bg">
            <img src="images/icon-${objectName}.svg" alt="${objectName}" />
        </div>
    </div>`

    userPickedElem.insertAdjacentHTML('beforeend', objectTemplate)

    generateRandomNumber(randomNumber)
}

const generateRandomNumber = randomNumber => {
    let createRandomNum = Math.floor(Math.random() * 2.5)

    randomNumber = createRandomNum

    insertObjectToDom(randomNumber)
}

const insertObjectToDom = randomNum => {
    let findRandomObjectName = objects[randomNum]

    if (findRandomObjectName != undefined) {
        setTimeout(() => {
            notSelectedElem.style.display = 'none'
            SelectedElem.style.display = 'flex'
        }, 2500)
        setTimeout(() => {
            SelectedElem.style.opacity = '1'
            definitionLastResult()
        }, 2600)

        // insert random object in DOM
        let randomObjectTemplate = `
        <div class="circle ${findRandomObjectName}" id="${findRandomObjectName}">
            <div class="white-bg">
                <img src="images/icon-${findRandomObjectName}.svg" alt="${findRandomObjectName}" />
            </div>
        </div>`

        SelectedElem.insertAdjacentHTML('beforeend', randomObjectTemplate)
    }
}

const definitionLastResult = () => {

    let definitionResult = null
    let botObjectWrapper = SelectedElem.querySelector('div').getAttribute('id')
    let userObjectWrapper = userPickedElem.querySelector('div').getAttribute('id')

    if (userObjectWrapper === 'rock' && botObjectWrapper === 'paper' ||
        userObjectWrapper === 'scissors' && botObjectWrapper === 'rock' ||
        userObjectWrapper === 'paper' && botObjectWrapper === 'scissors') {
        definitionResult = 'lose'
        userScore++
    } else if (
        userObjectWrapper === 'rock' && botObjectWrapper === 'scissors' ||
        userObjectWrapper === 'scissors' && botObjectWrapper === 'paper' ||
        userObjectWrapper === 'paper' && botObjectWrapper === 'rock'
    ) {
        definitionResult = 'win'
        userScore--
    } else if (userObjectWrapper === botObjectWrapper) {
        definitionResult = 'equal'
    }

    generatLastResult(definitionResult, userScore)
}

const generatLastResult = (result, userScore) => {

    userScoreElem.innerHTML = userScore

    levelTwoWrapper.style.width = '600px'
    setTimeout(() => {
        resultElem.style.opacity = '1'
    }, 300)
    setTimeout(() => {
        resultElem.style.display = 'flex'
    }, 100)

    if (result === 'lose') {
        resultTextElem.innerHTML = 'YOU LOSE'
    } else if (result === 'win') {
        resultTextElem.innerHTML = 'YOU WIN'
    } else if (result === 'equal') {
        resultTextElem.innerHTML = 'EQUAL'
    }
}


// rules button logic
rulesBtn.addEventListener('click', () => {
    modalElem.style.display = 'flex'
    setTimeout(() => {
        modalElem.style.opacity = '1'
        modalElem.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
    }, 0)
})
closeBtn.addEventListener('click', () => {
    modalElem.style.display = 'none'
    modalElem.style.opacity = '0'
    modalElem.style.backgroundColor = 'transparent'
})