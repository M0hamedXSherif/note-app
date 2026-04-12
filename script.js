// --- DOM Elements ---
const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input");
const notesGrid = document.getElementById("notes-grid");

// --- Initialize Data ---
// Retrieve notes from LocalStorage or start with an empty array if none exist
const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

/**
   Creates a note card and injects it into the DOM
 */
function createNoteCard(text) {
    const noteCard = `
        <div class="note-card">
            <span class="delete-btn">x</span>
            <h3>Note Title</h3>
            <p>${text}</p>
        </div>
    `;
    // Insert the new note at the end of the grid
    notesGrid.insertAdjacentHTML('beforeend', noteCard);
}

// Render existing notes from storage on page load
savedNotes.forEach(noteText => createNoteCard(noteText));

/**
 * Collects all current notes from the UI and saves them to LocalStorage
 */
function saveNotes() {
    const allNotes = document.querySelectorAll(".note-card p");
    const notesArray = [];

    // Extract text content from each note paragraph
    allNotes.forEach(p => {
        notesArray.push(p.innerText);
    });

    // Convert array to string format for storage
    localStorage.setItem("notes", JSON.stringify(notesArray));
}

// --- Event Listeners ---

// Handle adding a new note
addButton.addEventListener("click", () => {
    const inputValue = inputField.value.trim();

    // Validation: ensure the input is not just whitespace
    if (inputValue === "") {
        alert("Please type any text!");
    } else {
        createNoteCard(inputValue); // UI Update
        saveNotes();                // Data Persistence
        inputField.value = "";      // Clear input field
    }
});

// Handle note deletion using Event Delegation
notesGrid.addEventListener("click", (e) => {
    // Check if the clicked element is the delete button
    if (e.target.classList.contains("delete-btn")) {
        // Remove the entire note card from the DOM
        e.target.parentElement.remove();
        // Update storage after removal
        saveNotes();
    }
});