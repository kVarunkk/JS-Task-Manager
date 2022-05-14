const LOCAL_STORAGE_LIST_KEY = 'task.lists';


var listContainer = document.querySelector('.list-wrapper');

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] ;

var newListInput = document.querySelector('.type');

var form = document.querySelector('form');

var cancelButtons =  document.getElementsByClassName("cancel");




form.addEventListener('submit',e=>{
  e.preventDefault();
  const listName = newListInput.value;
  if(listName == null || listName === '') return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
})


function createList(name){
  return name;
}

function saveAndRender(){
  save();
  render();
}

function save(){
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists));
}


function render(){
  clearElement(listContainer);
  lists.forEach((list,index) => {
    const listElement = document.createElement('div');
    listElement.classList.add('list');
    listElement.classList.add('draggable');
    listElement.setAttribute("draggable","true");
    listElement.innerText = list;

    var newButton = document.createElement('button');
    newButton.classList.add('cancel');
    var node2 = document.createTextNode('X');
    newButton.appendChild(node2);
    listElement.appendChild(newButton);

    listContainer.appendChild(listElement);

    remove();

    newButton.addEventListener('click',()=>{
      deleteItem(index);
    })
    

  })
}

function clearElement(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}


function remove(){

  for (let i = 0; i < cancelButtons.length; i++) {
        cancelButtons[i].onclick = function () {
          var div = this.parentElement;
          div.style.display = "none";
          // localStorage.removeItem(LOCAL_STORAGE_LIST_KEY) 
        }
      }

     
}

function deleteItem(index) {
  let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))
  todos.splice(index, 1) 
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(todos)) 
} 

// todos.forEach((element, index) =>{ })



render();
