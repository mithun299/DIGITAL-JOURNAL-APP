// Load saved notes
let notes = JSON.parse(localStorage.getItem("journalNotes")) || [];

const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const search = document.getElementById("search");

// Save notes to Local Storage
function saveNotes(){
localStorage.setItem("journalNotes",JSON.stringify(notes));
}

// Display Notes
function displayNotes(filteredNotes = notes){

notesContainer.innerHTML = "";

filteredNotes.forEach((note,index)=>{

const div = document.createElement("div");

div.classList.add("note");

div.innerHTML = `
<p>${note.text}</p>
<div class="date">${note.date}</div>

<button onclick="editNote(${index})">
Edit
</button>

<button onclick="deleteNote(${index})">
Delete
</button>
`;

notesContainer.appendChild(div);

});

}

// Add Note
document.getElementById("addBtn").addEventListener("click",()=>{

if(noteInput.value.trim()===""){
alert("Please write something");
return;
}

notes.push({
text:noteInput.value,
date:new Date().toLocaleString()
});

saveNotes();
displayNotes();

noteInput.value="";

});

// Delete Note
function deleteNote(index){

notes.splice(index,1);

saveNotes();

displayNotes();

}

// Edit Note
function editNote(index){

noteInput.value=notes[index].text;

notes.splice(index,1);

saveNotes();

displayNotes();

}

// Search Notes
search.addEventListener("keyup",()=>{

const value = search.value.toLowerCase();

const filtered = notes.filter(note =>
note.text.toLowerCase().includes(value)
);

displayNotes(filtered);

});

displayNotes();