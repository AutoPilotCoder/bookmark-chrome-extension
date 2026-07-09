let data = []

const saveBtn = document.getElementById('save-button')
const clearBtn = document.getElementById('clear-button')
const tabBtn = document.getElementById('save-tab-button')
const inputElement = document.getElementById('input-element')
const listElement = document.getElementById('list-element')

const savedData = localStorage.getItem('custom_bookmarks')
if (savedData) {
    data = JSON.parse(savedData)
    data.forEach(addInputToList)
}

function saveInput() {
    if (!inputElement.value) return
    data.push(inputElement.value)
    addInputToList(inputElement.value)
    inputElement.value = ''

}

function clearList() {
    data = []
    listElement.innerHTML = ''
    localStorage.removeItem('custom_bookmarks')
}

function addInputToList(value) {
    listElement.innerHTML += `<li><a href="${value}" target="_blank">${value}</a></li>`

    // Alternative
    // let li = document.createElement('li')
    // li.textContent = value
    // listElement.appendChild(li)
    localStorage.setItem('custom_bookmarks', JSON.stringify(data))
}

function addTabToList(value) {
    if (chrome?.tabs?.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0]
            data.push(activeTab.url)
            addInputToList(activeTab.url)
        })
    }
}

saveBtn.addEventListener('click', saveInput);
clearBtn.addEventListener('dblclick', clearList);
tabBtn.addEventListener('click', addTabToList);