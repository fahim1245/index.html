const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");
const clearNotesBtn = document.getElementById("clearNotesBtn");

function loadNotes() {
  notesContainer.innerHTML = "";
  const notes = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  notes.forEach((content, index) => createNote(content, index));
}

function createNote(content = "", index = null) {
  const note = document.createElement("textarea");
  note.className = "note";
  note.value = content;

  note.addEventListener("input", () => {
    saveNotes();
  });

  note.addEventListener("dblclick", () => {
    if (confirm("Delete this note?")) {
      note.remove();
      saveNotes();
    }
  });

  notesContainer.appendChild(note);
}

function saveNotes() {
  const notes = Array.from(document.querySelectorAll(".note")).map(note => note.value);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

addNoteBtn.addEventListener("click", () => {
  createNote();
  saveNotes();
});

clearNotesBtn.addEventListener("click", () => {
  if (confirm("Delete all notes?")) {
    localStorage.removeItem("stickyNotes");
    loadNotes();
  }
});

window.addEventListener("load", loadNotes);
