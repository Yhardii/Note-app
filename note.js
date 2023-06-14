let btn = document.getElementById('btn')

console.log(btn)
const appEl = document.getElementById('app')
console.log(appEl);


btn.addEventListener("click", addNote);

function createNoteEl(id, content){
    const element = document.createElement('textarea')
    element.classList.add("note")
    element.placeholder = 'Empty Note'
    element.value = content
    element.addEventListener("dblclick", ()=>{
    const venn = getNotes()
    console.log(venn);

        const warning  = confirm("Do you want to delete this note?")
        if(warning){

            deleteNote(id, element)
            
        }

    })

    element.addEventListener('input',()=>{
        
        
        updateNote(id, element.value)
    })
    return element
    

}

function deleteNote(id, element){
    const notes  = getNotes()
    const target = notes.filter((note)=> note.id == id)[0]
    const index = notes.indexOf(target)
    notes.splice(index, 1)
    saveNote(notes)
    appEl.removeChild(element)
    
}

function updateNote(id, content){
    const notes  = getNotes()
    const target = notes.filter((note)=> note.id == id)[0]
    target.content = content
    saveNote(notes)
}


function addNote(){
    const notes  =  getNotes()
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    }
    console.log(noteObj)
    const noteEl = createNoteEl(noteObj.id, noteObj.content)
    appEl.insertBefore(noteEl, btn)
    notes.push(noteObj)

    saveNote(notes)
}

getNotes().forEach(note =>{
    const noteEl = createNoteEl(note.id, note.content)
    appEl.insertBefore(noteEl, btn)
})

function saveNote(notes){
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}

