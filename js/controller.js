
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    var strHTMLs = todos.map((todo, idx) => `
    <li class="${(todo.isDone) ? "done" : ""}"
    onclick="onToggleTodo('${todo.id}')">
    <span>${todo.txt}</span>
    
    ${(idx === 0 || gFilterBy !== 'all') ? "" : `<button class="order" onclick="moveTodo(event, '${todo.id}', true)">+</button>`}
    ${(idx > gTodos.length - 2 || gFilterBy !== 'all') ? "" : `<button class="order" onclick="moveTodo(event,'${todo.id}', false)">-</button>`}
    <button class="delete" onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>`)

    if (!todos.length) {
        document.querySelector('.todo-list').innerHTML = 'No todos / No Active Todos, No Done Todos'
    } else {
        document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    }

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    // debugger
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const elImp = document.querySelector('input[name="todo-importance"]')
    const txt = elTxt.value
    const imp = +elImp.value
    addTodo(txt, imp)
    elTxt.value = ''
    elImp.value = ''
    renderTodos()

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(elFilterbtn) {
    const filterBy = elFilterbtn.classList[0]
    document.querySelector(`.${gFilterBy}`).classList.remove('selected')
    elFilterbtn.classList.add('selected')
    setFilter(filterBy)
    renderTodos()
}


function moveTodo(ev, todoID, isMoveUp) {
    ev.stopPropagation()
    swapTodos(isMoveUp, todoID)
    renderTodos()
}