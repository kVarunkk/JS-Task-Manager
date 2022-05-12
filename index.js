var type = document.querySelector('.type');
var sub = document.querySelector('.sub');
var listWrapper = document.querySelector('.list-wrapper');
// var typeValue = document.querySelector('.type').value;
var close = document.getElementsByClassName("cancel");
var i;


function addItem() {
  var node = document.createElement('div');
  var newButton = document.createElement('button');

  newButton.classList.add('cancel');
  var node2 = document.createTextNode('X');
  newButton.appendChild(node2);
  // var newCancel = document.createElement(cancel);
  var newClass = node.classList;
  newClass.add('list');
  // node.appendChild(newCancel);
  // node.appendChild(typeValue);
  listWrapper.appendChild(node);


  var resultStored = type.value;
  // Reset value of input
  type.value = "";

  // Get items container
  //   var items = document.getElementById('items');
  // Add items to container
  node.innerHTML += resultStored;
  node.appendChild(newButton);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}



// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//     // console.log('ji');
//   }
// }

// function removeItem(e){
//     // e.parentNode.remove();
//     // return this.parentNode.remove(); 
//     e.currentTarget.parentNode.remove();
// }

sub.addEventListener('click', addItem);

// var buttonNew = document.querySelectorAll('.cancel');

// for (let index = 0; index < buttonNew.length; index++) {
//     const element = buttonNew[index];
//     element.parentNode.remove();
// }

// buttonNew.addEventListener('click',(e)=>{
//     e.currentTarget.parentNode.remove();
// });