class Todo {
    constructor(id, body) {
        this.id = id;
        this.body = body;
        this.completed = false;
    }
}

window.todos = function () {
    return {
        newTodo: '',
        todos: [],
        get active() {
            return this.todos.filter(todo => !todo.completed);
        },
        addNewTodo() {
            if (this.newTodo.trim().length) {
                this.todos.push((new Todo(this.todos.length + 1, this.newTodo)));
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
        }

    }
};
