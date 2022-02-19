<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Template • TodoMVC</title>
    <!-- CSS overrides - remove if you don't need it -->
    <link rel="stylesheet" href="{{asset('css/all.min.css')}}">
    <script src="{{asset('js/alpine.min.js')}}" defer></script>
</head>
<body>
<section class="todoapp" x-data="todos()">
    <header class="header">
        <h1>todos</h1>
        <input
            @keyup.enter="addNewTodo()"
            x-model="newTodo"
            class="new-todo"
            placeholder="What needs to be done?"
            autofocus
        >
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main" x-show="todos.length">
        <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            x-model="allCompleted"
            @click="toggleTodos()"
        >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
            <template x-for="todo in filterTodos" :key="todo.id">
                <li
                    :class="{completed:todo.completed,editing:todo.editing}"
                >
                    <div class="view">
                        <input
                            class="toggle"
                            type="checkbox"
                            @click="completeTodo(todo)"
                            x-model="todo.completed"
                        >

                        <label
                            x-text="todo.body"
                            @dblclick="editTodo(todo)"
                        ></label>
                        <button class="destroy" @click="destroyTodo(todo.id)"></button>
                    </div>
                    <input
                        class="edit"
                        x-model="todo.body"
                        @keyup.enter="finishEditTodo(todo)"
                        @keyup.escape="cancelEditTodo(todo)"
                    >
                </li>
            </template>
        </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <footer class="footer" x-show="todos.length">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong x-text="active.length">0</strong>
            <span
                x-text="pluraize('item',active.length)"
            ></span>
            left
        </span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a :class="{selected:this.filter=='all'}" href="#/" @click.prevent="setFilter('all')">All</a>
            </li>
            <li>
                <a href="#/active" @click.prevent="setFilter('active')">Active</a>
            </li>
            <li>
                <a href="#/completed" @click.prevent="setFilter('completed')">Completed</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button x-show="completed.length" @click="clearCompletedTodo()" class="clear-completed">Clear completed</button>
    </footer>
</section>
<footer class="info">
    <p>Double-click to edit a todo</p>
    <!-- Remove the below line ↓ -->
    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Created by <a href="http://todomvc.com">MBFouad</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
<!-- Scripts here. Don't remove ↓ -->
{{--<script src="node_modules/todomvc-common/base.js"></script>--}}
<script src="js/app.js"></script>
<script src="js/todo.js"></script>

</body>
</html>
