var type = document.querySelector('.type');
var sub = document.querySelector('.sub');
var listWrapper = document.querySelector('.list-wrapper');
var close = document.getElementsByClassName("cancel");
var i;


function addItem() {
  var node = document.createElement('div');
  var newButton = document.createElement('button');

  newButton.classList.add('cancel');
  var node2 = document.createTextNode('X');
  newButton.appendChild(node2);
  var newClass = node.classList;
  newClass.add('list');
  listWrapper.appendChild(node);


  var resultStored = type.value;
  type.value = "";

  
  node.innerHTML += resultStored;
  node.appendChild(newButton);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}





sub.addEventListener('click', addItem);

document.addEventListener("keyup", function(event) {
  if (event.code === 'Enter') {
      addItem();
  }
});
