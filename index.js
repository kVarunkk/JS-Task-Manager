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
  newClass.add('draggable');
  node.setAttribute("draggable","true");
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




var box = document.getElementsByClass('list');
  
  /* listen to the touchMove event,
  every time it fires, grab the location
  of touch and assign it to box */
  
  for (let i = 0; i < box.length; i++) {
    const element = box[i];
    element.addEventListener('touchmove', function(e) {
      // grab the location of touch
      var touchLocation = e.targetTouches[0];
      
      // assign box new coordinates based on the touch.
      element.style.left = touchLocation.pageX + 'px';
      element.style.top = touchLocation.pageY + 'px';
    })
  }
  
  /* record the position of the touch
  when released using touchend event.
  This will be the drop position. */
  
  for (let i = 0; i < box.length; i++) {
    const element = box[i];
    element.addEventListener('touchend', function(e) {
      // current box position.
      var x = parseInt(element.style.left);
      var y = parseInt(element.style.top);
    })
    
  }
