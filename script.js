const notesContainer = document.querySelector(".notes-container");
const createNote = document.querySelector(".Btn")
let notes = document.querySelector(".note-box")

// Load notes from local storage on page load.
window.addEventListener('DOMContentLoaded', () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => {
        addNoteToDOM((note.text));
    });
})

// Create a new note when the button is clicked.
createNote.addEventListener('click', () => {

    let noteBox = document.createElement('P')
    let img = document.createElement('IMG')
    let span = document.createElement('SPAN')
    noteBox.className = "note-box";
    noteBox.setAttribute("contenteditable", "true");
    img.src = "./assets/8664938_trash_can_delete_remove_icon.svg";
    span.appendChild(img);
    notesContainer.appendChild(span);
    notesContainer.appendChild(noteBox);

    // addNoteToDOM('');
    saveNotesToLocalStorage()
})

// Delete a note when the delete icon is clicked.
notesContainer.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG') {
        const span = e.target.parentElement;
        const noteBox = span.nextElementSibling;
        if (noteBox) {
            noteBox.remove()
        }
        span.remove();
        saveNotesToLocalStorage();
    }
})

// Save notes to local storage
function saveNotesToLocalStorage() {
    const notes = []
    document.querySelectorAll('.note-box').forEach(noteBox => {
        notes.push({ text: noteBox.innerText});
    })
    localStorage.setItem('notes', JSON.stringify(notes))

}

// Add a note to the DOM
function addNoteToDOM(text) {

    let noteBox = document.createElement('P');
    let img = document.createElement('IMG');
    let span = document.createElement('SPAN');

    noteBox.className = "note-box";
    noteBox.setAttribute("contenteditable", "true");
    noteBox.innerText = text;

    img.src = "./assets/8664938_trash_can_delete_remove_icon.svg";
    span.appendChild(img);

    notesContainer.appendChild(span);
    notesContainer.appendChild(noteBox);

     // Save changes when editing the note
     noteBox.addEventListener('input', saveNotesToLocalStorage);
}

// Light and Dark Mode Theme Switch

let darkMode = localStorage.getItem('darkMode');
const themeSwitch = document.getElementById('theme-switch')

const enableDarkMode = () => {
    localStorage.setItem('darkMode', 'active')
    document.body.classList.add('dark-mode')
}

const disableDarkMode = () => {
    localStorage.setItem('darkMode', null)
    document.body.classList.remove('dark-mode')
}

themeSwitch.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode')
    if(darkMode !== 'active') {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})

if(darkMode === 'active') {
    enableDarkMode()
}