class Todo {
    constructor(id, body) {
        this.id = id;
        this.body = body;
        this.completed = false;
        this.editing = false;
    }
}

window.todoStore = {
    todos: [],
    getTodos: async function () {
        let response = await fetch('/api/todo', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => data.data)
            .catch(() => {
                console.log('Ooops! Something went wrong!');
            });
        this.todos = response;
    },
    save: async function (todo) {
        const response = await fetch('/api/todo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    delete: async function (id) {
        const response = await fetch('/api/todo/'+id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
};

window.todos = function () {
    return {
        ...todoStore,
        init() {
            this.getTodos();
        },
        newTodo: '',
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
                let todo = new Todo(Date.now(), this.newTodo);
                this.todos.push(todo);
                this.clearInput();
                this.save(todo);
            }
        },
        destroyTodo(id) {
            this.todos = this.todos.filter(todo => todo.id != id);
            this.delete(id);
        },
        clearInput: function () {
            this.newTodo = '';
        },
        completeTodo(todo) {
            todo.completed = !todo.completed;
            this.save(todo);
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
                this.delete(todo.id);
            }
            todo.editing = false;
            this.save(todo);
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
