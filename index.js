// select the todo-form
const todoForm = document.querySelector('form');
// select the input box
const todoInput = document.querySelector('.type');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.list-wrapper');
// array which stores every todos
let todos = [];


// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box current value
});


// function to add todo
function addTodo(item) {
  // if item is not empty
  if (item !== '') {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: item
    };
    // then add it to todos array
    todos.push(todo);
    addToLocalStorage(todos); // then store it in localStorage
    // finally clear the input box value
    todoInput.value = '';
  }
}


// function to render given todos to screen
function renderTodos(todos) {
  // clear everything inside <ul> with class=todo-items
  todoItemsList.innerHTML = '';
  // run through each item inside todos
  todos.forEach(function(item) {
    
    const li = document.createElement('div');
    
    li.setAttribute('class', 'item');
    
    li.setAttribute('data-key', item.id);

    li.innerHTML = `<span class= "span-name"><input class = "input" type="text" value="${item.name}" onfocus="getCurrentTask(this)" onblur="editTask(this)"></input></span> <button class="cancel"><i class="fa-solid fa-xmark"></i></button>`;
  
    // finally add the <li> to the list wrapper
    todoItemsList.append(li);
  });}
  


  // function to add todos to local storage
function addToLocalStorage(todos) {
  // convert the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}


// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
  // update the localStorage
  addToLocalStorage(todos);
}




// initially get everything from localStorage
getFromLocalStorage();


// to edit task
var currentTask = null;

    // get current task
    function getCurrentTask(event) {
      currentTask = event.value;
    }

    function editTask(event){
      // getFromLocalStorage()
      let todos = Array.from(JSON.parse(localStorage.getItem("todos")));


      if (event.value === "") {
        alert("Task is empty!");
        event.value = currentTask;
        return;
      }

      todos.forEach(todo => {
        if (todo.name === currentTask) {
          todo.name = event.value;
        }
      });
      // update local storage
      localStorage.setItem('todos', JSON.stringify(todos));
    
    }
    







// after that addEventListener to list wrapper. Because we need to listen for click event in all delete-button 
todoItemsList.addEventListener('click', function(event) {
  
  // check if that is a delete-button
  if (event.target.classList.contains('cancel')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('fa-xmark')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.parentElement.getAttribute('data-key'));
  }
});
