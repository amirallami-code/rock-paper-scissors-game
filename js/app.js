let $ = document

const rulesBtn = $.querySelector('.rules')
const modalElem = $.querySelector('.modal')
const closeBtn = $.querySelector('.close-button')

const levelOneWrapper = $.querySelector('.level-one')
const guideElem = $.querySelector('.guide')
const rockElem = $.querySelector('.rock')
const paperElem = $.querySelector('.paper')
const scissorsElem = $.querySelector('.scissors')

const userPickedElem = $.querySelector('.userPicked')
const levelTwoWrapper = $.querySelector('.level-two')

let userLevel = 1
let userScore = 0
let userSelectedObject = null

let objects = ['rock', 'paper', 'scissors']

// find user object
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

// functions
const objectGenerator = objectName => {

    // unhide transition
    setTimeout(() => {
        levelTwoWrapper.style.display = 'flex'
    }, 500)
    levelTwoWrapper.style.opacity = '1'

    let objectTemplate = `
    <div class="circle ${objectName}">
        <div class="white-bg">
            <img src="images/icon-${objectName}.svg" alt="${objectName}" />
        </div>
    </div>`

    userPickedElem.insertAdjacentHTML('beforeend', objectTemplate)
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