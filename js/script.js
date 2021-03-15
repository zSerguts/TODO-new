'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, btnDelete, todoButtons, todoContainer){
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoButtons = document.querySelector(todoButtons);
        this.btnDelete = document.querySelector(btnDelete);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage(){
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render(){
        this.todoList.textContent = '';
        this.input.value = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
        `);
        if (todo.completed){
            this.todoCompleted.append(li);
        }   else {
            this.todoList.append(li);
        }
    }

    addTodo(e){
        e.preventDefault();
        if (this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }

    }

    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target){
        this.todoData.forEach((elem, index) => {
            if (target === elem.value){
                this.todoData.delete(index);
                this.render();
            }
        });
    }

    completedItem(target){
        this.todoData.forEach((elem) => {
            if (target === elem.value){
                elem.completed === true ? elem.completed = false : elem.completed = true;
            }
            this.render();
        });
    }

    handler(){
        this.todoContainer.addEventListener('click', elem => {
            let target = elem.target;
            if(target.classList.contains('todo-remove')){
                this.deleteItem(elem.path[2].textContent.trim());
            }   else if (target.classList.contains('todo-complete')){
                this.completedItem(elem.path[2].textContent.trim());
            }
        });
    }

    init (){
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-remove', 
'.todo-buttons', '.todo-container');
todo.init();
todo.handler();