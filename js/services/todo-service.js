const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos

    if (gFilterBy === 'txt') {
        return gTodos.slice().sort((todo, nextTodo) => {
            const txt = todo.txt.toLowerCase()
            const nextTxt = nextTodo.txt.toLowerCase()
            if (txt < nextTxt) return -1
            if (txt < nextTxt) return 1
            return 0
        })
    }

    if (gFilterBy === 'created') {
        return gTodos.slice().sort((todo, nextTodo) => {
            return todo.createdAt - nextTodo.createdAt
        })
    }

    if (gFilterBy === 'importance') {
        return gTodos.slice().sort((todo, nextTodo) => {
            return todo.importance - nextTodo.importance
        })
    }

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'check' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    if (!confirm('Are you sure?')) return
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

// DONE: add createdAt = (timestamp)
// TODO: importance = (number: 1-3). (use another input)
// DONE: Add validation that the todo text is not empty before creating the todo
function _createTodo(txt, importance = 3) {
    if (!txt) return
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getTodoIdxById(todoID) {
    return gTodos.findIndex(todo => todo.id === todoID)
}

function swapTodos(isMoveUp, todoID) {
    const todoIdx = getTodoIdxById(todoID)
    const swapDir = isMoveUp ? -1 : 1
    const currTodo = gTodos[todoIdx]
    const swapedTodo = gTodos[todoIdx + swapDir]
    gTodos[todoIdx] = swapedTodo
    gTodos[todoIdx + swapDir] = currTodo

    saveToStorage(STORAGE_KEY, gTodos)
}

