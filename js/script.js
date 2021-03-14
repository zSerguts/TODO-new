'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, btnDelete, todoButtons){
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoButtons = document.querySelector(todoButtons);
        this.btnDelete = todoButtons.querySelectorAll(btnDelete);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage(){
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render(){
        this.todoList.textContent = '';
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

    deleteItem(e){
        let target = e.target;
        console.log(target);
    }

    completedItem(){
        
    }

    handler(){

    }

    init (){
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }

    eventListeners(){
        console.log(this.btnDelete);
        console.log(this.todoList);
        console.log(this.todoButtons);
        this.btnDelete.forEach(elem => {
            elem.addEventListener('click', () =>{
                console.log(1);
            });
        });
        this.todoButtons.addEventListener('click', event => {
            console.log(1);
            let target = event.target;
            if (target.classList.contains('todo-remove')){
                console.log(1);
                this.deleteItem();
            }
        });
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-remove', 
'.todo-buttons');
todo.init();
todo.eventListeners();