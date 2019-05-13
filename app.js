'use strict';

// middleware getting to our serv in v2

//local storage data recovered here, but not using the data.  methods removed from objects. choosing not to change render methods or reinstantiate. I am choosing to use my valuable time elsewhere
var unicornsParsed = JSON.parse(localStorage.getItem('unicorns'));
console.log(unicornsParsed);

//  global variables
var allUnicorns = [];

//window into the DOM
var unicornTable = document.getElementById('unicorn-table');

//renders all instances of Unicorn
function renderAll(){
  for(var i in allUnicorns){
    allUnicorns[i].render();
  }
}

// header render function -must be done from js if we want it on rerender
function renderHeader(){
  var tHead = document.createElement('thead');
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Unicorn Name';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Color';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Favorite Food';
  trEl.appendChild(thEl);
  tHead.appendChild(trEl);
  unicornTable.appendChild(tHead);
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

// prototype method -adds to constructor
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
  selectEl.setAttribute('id', `${this.id}`);
  selectEl.setAttribute('onchange', 'changeLocation()');

  //options for select element -start with existing location
  var optionEl = document.createElement('option');
  optionEl.textContent = this.location;
  optionEl.setAttribute('value', `${this.location}`);
  selectEl.appendChild(optionEl);

  //iterating thru otherPossibleLocations array to assign remaining options to the select element
  for (var i = 0; i < this.otherPossibleLocations.length; i++){
    optionEl = document.createElement('option');
    optionEl.textContent = this.otherPossibleLocations[i];
    optionEl.setAttribute('value', `${this.otherPossibleLocations[i]}`);
    selectEl.appendChild(optionEl);
  }

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

// function used with onchange attribute in selece element
// would prefer for this to be more dynamic, but it works
// eslint-disable-next-line no-unused-vars
function changeLocation(){
  var randyChange = document.getElementById('randy').value;
  allUnicorns[0].location = randyChange;

  var sallyChange = document.getElementById('sally').value;
  allUnicorns[1].location = sallyChange;

  var patsyChange = document.getElementById('patsy').value;
  allUnicorns[2].location = patsyChange;

  unicornTable.innerHTML = '';
  renderHeader();
  renderAll();
  saveUnicornStatus();
}

function saveUnicornStatus(){
  var stringifiedUnicorns = JSON.stringify(allUnicorns);
  localStorage.setItem('unicorns', stringifiedUnicorns);
}

new Unicorn('Rambunxious Randy', 'randy', 'purple', 'pickles');
new Unicorn('Sassy Sally', 'sally', 'sparkly-glitter', 'waffles');
new Unicorn('Precious Patsy', 'patsy', 'rainbow', 'children\'s fear');

renderHeader();
renderAll();
saveUnicornStatus();
