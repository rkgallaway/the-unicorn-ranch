'use strict';

// middleware getting to our serv in v2

//  global variables
var allUnicorns = [];

//window into the DOM
var unicornTable = document.getElementById('unicorn-table');

//////////////////functions///////////////////////////////
//renders all instances of Unicorn
function renderAll(){
  for(var i in allUnicorns){
    allUnicorns[i].render();
  }
}

// Constructor
function Unicorn(name, id, color, favoriteFood){
  this.name = name;
  this.id = id;
  this.color = color;
  this.favoriteFood = favoriteFood;
  this.location = 'barn';
  this.otherPossibleLocations = [];
  this.otherPossibleLocationCalc = function(currentLocation){
    if(currentLocation === 'barn'){
      this.otherPossibleLocations = ['pasture', 'trails'];
    }
    if(currentLocation === 'pasture'){
      this.otherPossibleLocations = ['barn', 'trails'];
    }
    if(currentLocation === 'trails'){
      this.otherPossibleLocations = ['barn', 'pasture'];
    }
  };
  allUnicorns.push(this);

}

// prototype methods added to Unicorn instances
Unicorn.prototype.render = function(){
  this.otherPossibleLocationCalc(this.location);

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);


  //location td needs a select element with options
  tdEl = document.createElement('td');
  tdEl.setAttribute('class', `${this.location}`);
  //select element
  var selectEl = document.createElement('select');
  selectEl.setAttribute('name', `${this.id}`);
  selectEl.setAttribute('id', `${this.id}`);
  selectEl.setAttribute('onchange', 'changeLocation()');
  //options for select element
  var optionEl = document.createElement('option');
  optionEl.textContent = this.location;
  optionEl.setAttribute('value', `${this.location}`);
  selectEl.appendChild(optionEl);

  optionEl = document.createElement('option');
  optionEl.textContent = 'pasture';
  optionEl.setAttribute('value', 'pasture');
  selectEl.appendChild(optionEl);

  optionEl = document.createElement('option');
  optionEl.textContent = 'trails';
  optionEl.setAttribute('value', 'trails');
  selectEl.appendChild(optionEl);
  tdEl.appendChild(selectEl);
  trEl.appendChild(tdEl);


  tdEl = document.createElement('td');
  tdEl.textContent = this.color;
  trEl.appendChild(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = this.favoriteFood;
  trEl.appendChild(tdEl);

  unicornTable.appendChild(trEl);

};

// eslint-disable-next-line no-unused-vars
function changeLocation(){
  var randyChange = document.getElementById('randy').value;
  allUnicorns[0].location = randyChange;

  var sallyChange = document.getElementById('sally').value;
  allUnicorns[1].location = sallyChange;

  var patsyChanged = document.getElementById('patsy').value;
  allUnicorns[2].location = patsyChanged;

  unicornTable.innerHTML = '';
  renderAll();
  saveUnicornStatus();

}


function saveUnicornStatus(){
  var stringifiedUnicorns = JSON.stringify(allUnicorns);
  localStorage.setItem('unicorns', stringifiedUnicorns);
}


new Unicorn('Rambunxious Randy', 'randy', 'purple', 'pickles');
new Unicorn('Sassy Sally', 'sally', 'sparkly-glitter', 'waffles');
new Unicorn('Precious Patsy', 'patsy', 'rainbow', 'children\'s fears');



renderAll();
saveUnicornStatus();



//event handling
//on click event.  1st click barn - pasture
// 2nd click pasture-trail
