// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event) {
  // prevenmt from auto submitting
  event.preventDefault();
  // todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create li element and give it text content of the input field value
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // add todo to local storage
  saveLovalTodos(todoInput.value);
  // check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML ='<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // trash mark button
  const trashButton = document.createElement('button');
  trashButton.innerHTML ='<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // append to list
  todoList.appendChild(todoDiv);
  // clear input
  todoInput.value='';
}

function deleteCheck (e) {
  e.stopPropagation(); // Stop the event from propagating up the DOM tree
  const item = e.target;
  // delete todo
  if (item.classList.contains('trash-btn')) { 
    const todo = item.parentElement;
    // animation
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function() {
      todo.remove();
      removeLocalTodos(todo);
    });
  }
  // check mark
  if(item.classList.contains('complete-btn')) { 
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}


function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        }else {
          todo.style.display='none' ;
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        } else {
          todo.style.display= 'none';
        }
        break;
    }
  });
}

function saveLovalTodos(todo) {
  // check for todos
  var localTodos = checkLocalTodos();
  localTodos.push(todo);
  localStorage.setItem("localTodos",JSON.stringify(localTodos));
}

function getTodos() {
  // check for todos
  var localTodos = checkLocalTodos();
  localTodos.forEach(function(todo){
    // todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create li element and give it text content of the input field value
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML ='<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // trash mark button
  const trashButton = document.createElement('button');
  trashButton.innerHTML ='<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // append to list
  todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  var localTodos = checkLocalTodos();
  const todoIndex = todo.children[0].innerText;
  localTodos = localTodos.filter((item, index) => item !== todoIndex || index !== localTodos.lastIndexOf(todoIndex));
  localStorage.setItem('localTodos', JSON.stringify(localTodos));
}


function checkLocalTodos() {
  // check for todos
  let localTodos;
  if (localStorage.getItem('localTodos') === null) {
    localTodos=[];
  }else {
    localTodos = JSON.parse(localStorage.getItem('localTodos'))
  }
  return localTodos;
}