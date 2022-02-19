class Todo {
    constructor(id, body) {
        this.id = id;
        this.body = body;
        this.completed = false;
        this.editing = false;
    }
}

window.todos = function () {
    return {
        newTodo: '',
        todos: [],
        filter: 'all',
        get allCompleted() {
            return this.todos.length == this.completed.length;
        },
        get active() {
            return this.todos.filter(todo => !todo.completed);
        },
        get completed() {
            return this.todos.filter(todo => todo.completed);
        },
        get filterTodos() {
            return {
                all: this.todos,
                active: this.active,
                completed: this.completed
            }[this.filter];
        },
        setFilter(newFilter) {
            this.filter = newFilter;
        },
        addNewTodo() {
            if (this.newTodo.trim().length) {
                this.todos.push((new Todo(Date.now(), this.newTodo)));
                this.clearInput();
            }
        },
        destroyTodo(id) {
            this.todos = this.todos.filter(todo => todo.id != id);
        },
        clearInput: function () {
            this.newTodo = '';
        },
        completeTodo(todo) {
            todo.completed = !todo.completed;
        },
        clearCompletedTodo() {
            this.todos = this.active;
        },
        editTodo(todo) {
            todo.editing = true;
            todo.bodyBeforeEdit = todo.body;
        },
        finishEditTodo(todo) {
            if (todo.body.trim() === '') {
                this.destroyTodo(todo.id);
            }
            todo.editing = false;
        },
        cancelEditTodo(todo) {
            todo.body = todo.bodyBeforeEdit;
            delete todo.bodyBeforeEdit;
            this.finishEditTodo(todo);
        },
        pluraize(word, length) {
            if (length > 1) {
                return word + 's';
            }
            return word
        },
        toggleTodos() {
            let allCompleted = this.allCompleted;
            this.todos.forEach(todo => todo.completed = !allCompleted);
        }
    }
};
