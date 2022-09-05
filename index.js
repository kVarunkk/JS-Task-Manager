// var type = document.querySelector('.type');
// var sub = document.querySelector('.sub');
// var listWrapper = document.querySelector('.list-wrapper');
// var todos = [];
// var close = document.getElementsByClassName("cancel");
// var i;


// function addTodo() {
//   var inputValue = type.value;
//   todos.push(inputValue);
// }


// function addItem() {
  
//   var node = document.createElement('div');
//   var newButton = document.createElement('button');

//   newButton.classList.add('cancel');
//   var node2 = document.createTextNode('X');
//   newButton.appendChild(node2);
//   var newClass = node.classList;
//   newClass.add('list');
//   newClass.add('draggable');
//   node.setAttribute("draggable","true");
  


//   var resultStored = type.value;
//   type.value = "";

//   node.innerHTML += resultStored;
//   node.appendChild(newButton);
//   listWrapper.appendChild(node);


//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
  
  
// }



// sub.addEventListener('click', addItem);

// document.addEventListener("keyup", function(event) {
//   if (event.code === 'Enter') {
//       addItem();
//   }
// });







// try-2

// const LOCAL_STORAGE_LIST_KEY = 'task.lists';


// var listContainer = document.querySelector('.list-wrapper');

// let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] ;

// var newListInput = document.querySelector('.type');

// var form = document.querySelector('form');

// var cancelButtons =  document.getElementsByClassName("cancel");




// form.addEventListener('submit',e=>{
//   e.preventDefault();
//   const listName = newListInput.value;
//   if(listName == null || listName === '') return;
//   const list = createList(listName);
//   newListInput.value = null;
//   lists.push(list);
//   saveAndRender();
// })


// function createList(name){
//   return name;
// }

// function saveAndRender(){
//   save();
//   render();
// }

// function save(){
//   localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists));
// }


// function render(){
//   clearElement(listContainer);
//   lists.forEach((list,index) => {
//     const listElement = document.createElement('div');
//     listElement.classList.add('list');
//     listElement.classList.add('draggable');
//     listElement.setAttribute("draggable","true");
//     listElement.innerText = list;

//     var newButton = document.createElement('button');
//     newButton.classList.add('cancel');
//     var node2 = document.createTextNode('X');
//     newButton.appendChild(node2);
//     listElement.appendChild(newButton);

//     listContainer.appendChild(listElement);

//     remove();

//     newButton.addEventListener('click',()=>{
//       deleteItem(index);
//     })
    

//   })
// }

// function clearElement(element){
//   while(element.firstChild){
//     element.removeChild(element.firstChild);
//   }
// }


// function remove(){

//   for (let i = 0; i < cancelButtons.length; i++) {
//         cancelButtons[i].onclick = function () {
//           var div = this.parentElement;
//           div.style.display = "none";
//           // localStorage.removeItem(LOCAL_STORAGE_LIST_KEY) 
//         }
//       }

     
// }

// function deleteItem(index) {
//   let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))
//   todos.splice(index, 1) 
//   localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(todos)) 
// } 

// // todos.forEach((element, index) =>{ })



// render();














//try-3



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