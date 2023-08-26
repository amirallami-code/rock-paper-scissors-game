let $ = document

const rulesBtn = $.querySelector('.rules')
const modalElem = $.querySelector('.modal')
const closeBtn = $.querySelector('.close-button')

// rules button logic
rulesBtn.addEventListener('click', () => {
    modalElem.style.display = 'flex'
    modalElem.style.opacity = '1'
    modalElem.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
})
closeBtn.addEventListener('click', () => {
    modalElem.style.display = 'none'
    modalElem.style.opacity = '0'
    modalElem.style.backgroundColor = 'transparent'
})