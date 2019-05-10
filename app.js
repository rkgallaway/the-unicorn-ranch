'use strict';

// middleware getting to our serv in v2

//  global variables
var unicorns = [
  {
    name: 'randy',
    location: 'barn',
    color: 'silver',
    favoriteFood: 'pickles'
  },
  {
    name: 'sally',
    location: 'barn',
    color: 'purple',
    favoriteFood: 'waffles'
  }

];


//array of unicorn-objects

//window into the DOM
var unicornTable = document.getElementById('unicorn-table');

//render to DOM - method on object?
// function renderHeader = (){
//   var tHead = document.createElement('thead');
//   var
// }
function render(){
  for(var i = 0; unicorns.length; i++){
    console.log(i);
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = unicorns[i].name;
    trEl.appendChild(tdEl);

    tdEl = document.createElement('td');
    tdEl.textContent = unicorns[i].location;
    trEl.appendChild(tdEl);

    tdEl = document.createElement('td');
    tdEl.textContent = unicorns[i].color;
    trEl.appendChild(tdEl);

    tdEl = document.createElement('td');
    tdEl.textContent = unicorns[i].favoriteFood;
    trEl.appendChild(tdEl);

    unicornTable.appendChild(trEl);
  }
}

render();
//event handling
//on click event.  1st click barn - pasture
// 2nd click pasture-trail
