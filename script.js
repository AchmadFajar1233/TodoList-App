const formTodo = document.querySelector('form')
const todoInput = document.getElementById('input-todo')
const todoUL = document.getElementById('todo__list')

let allTodo = getTodos()
updateTodo()

formTodo.addEventListener('submit', (e) =>{
    e.preventDefault()
    addTodo()
})

const addTodo = () =>{
    const todoValue = todoInput.value.trim()

    if(todoValue.length > 0){
        const todoObject = {
            text: todoValue,
            completed: false,
        }
        allTodo.push(todoObject)
        updateTodo()
        saveTodos()
        todoInput.value = ""
    }
}
function updateTodo (){
    todoUL.innerHTML = ""
    allTodo.forEach((todo, todoIndex) =>{
        const todoItem = createTodoItem(todo, todoIndex)
        todoUL.append(todoItem)
    })
}
function createTodoItem (todo, todoIndex){
    const TodoLi = document.createElement('li')
    const todoValue = todo.text
    const inputId = `todo-${todoIndex}`
    TodoLi.innerHTML = `<input id="${inputId}" type="checkbox" class="input">
                    <label for="${inputId}" class="custom-checkbox">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                    </label>
                    <label for="${inputId}" class="label-2">${todoValue}</label>
                    <button class="todo__list-button_delete">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>`

    const deletButton = TodoLi.querySelector('.todo__list-button_delete')
    deletButton.addEventListener('click', () => {
                deleteList(todoIndex)
            })
    const checkBox = TodoLi.querySelector('input')
    checkBox.addEventListener('change', () =>{
        allTodo[todoIndex].completed = checkBox.checked
        saveTodos()
    })
    checkBox.checked = todo.completed
    return TodoLi
}
function deleteList(todoIndex){
    allTodo = allTodo.filter((_, i) => i !== todoIndex)
    saveTodos()
    updateTodo()
}
function saveTodos (){
    const jsonAllTodods = JSON.stringify(allTodo)
    localStorage.setItem("todos", jsonAllTodods)
}
function getTodos (){
    const todos = localStorage.getItem("todos") || "[]"
    return JSON.parse(todos)
}
