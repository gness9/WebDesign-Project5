/** site.js 
 * You should add your JavaScript code to this file.  
 * See the assignment description in Guide for what
 * your code needs to accomplish.
 */

//classList.toggle()

var dict = {};
var test = 1;
var table = document.getElementById('boxes');

//Creates dictionary for all JSON elements with identifier as key
function displayStandards(data) {
    var current = data[0].identifier;
  var count = 0;
  data.forEach(function(element){
    dict[element.identifier] = count;
    dict[count] = element;
    count++;
  });
  writeStandards();
}

//checks to see if JSON file has matching identifier
function checkStandards(standard){
  for(var key in dict)
    {
      var element = dict[key];
      if(element.identifier == standard.identifier)
        {
          return element;
        }
    }
  return undefined;
}

//Generates standard elements to the DOM using JSON file as basis
function writeStandards() {
  standards.forEach(function(element){
    var match = checkStandards(element);
    if(match)
      {
        test = 1;
        for(key in match){
          if(test == 4){ test+=1; continue; }
          if(match[key] == match["concept"]){ continue; }
          var tag = document.createElement("div");
          var Othertag = document.createElement("p");
          tag.classList.add("div"+test);
          var text = document.createTextNode(match[key]);
          Othertag.appendChild(text);
          Othertag.classList.add("sec"+test);
          tag.appendChild(Othertag);
          test+=1;
          if(test == 3)
           {
              var tagTwo = document.createElement("p");
              tagTwo.classList.add("div"+test);
              var textTwo = document.createTextNode(match["description"]);
              tagTwo.appendChild(textTwo);  
              tag.appendChild(tagTwo);
              test+=1;
           }
          table.appendChild(tag); 
        }
      }
  });
  updateStandards();
}
  
//Uses AJAX to retrieve JSON file and parses it
function useXHR() {
  const xhr = new XMLHttpRequest();
  const url = "standards.json";
  xhr.addEventListener('load', ()=>{
    displayStandards(JSON.parse(xhr.responseText));
  });
  
  xhr.open("GET", url);
  xhr.send();
  xhr.onreadystatechange = function(event){
    // TODO: process request
   if(xhr.readyState === 4 && request.status === 200) {
      // TODO: render the forecast
     displayStandards(JSON.parse(request.responseText));
    }
  }
}

//Delays execution until load event is triggered.
window.addEventListener('load', function(){
useXHR();
});
  

//Updates elements and generates titles
function updateStandards() {
  //Retrieves necessary DOM elements

  var x = document.querySelectorAll(".div1");
  var x2 = document.querySelectorAll(".div2");
  var div3 = document.querySelectorAll(".div3");
  var div5 = document.querySelectorAll(".div5");
  var div6 = document.querySelectorAll(".div6");
  var y = document.querySelectorAll(".sec2");
  var sec3 = document.querySelectorAll(".sec3");
  var sec4 = document.querySelectorAll(".sec4");

  //Generates Subconcept and Standard titles on mobile devices
  test=0;
  div5.forEach(function(button){
    var tagThree = document.createElement("p");
    var textThree = document.createTextNode("Subconcept");
    var tagFour = document.createElement("p");
    var textFour = document.createTextNode("Practices");
    tagThree.appendChild(textThree);
    tagFour.appendChild(textFour);
    tagThree.classList.add('subconcept');
    tagFour.classList.add('practices');
    div5[test].insertBefore(tagThree, div5[test].firstChild);
    div6[test].insertBefore(tagFour, div6[test].firstChild);
    test+=1;
  });

  //Generates more and less buttons on mobile devices
  test=0;
  x2.forEach(function(button){
    var tagThree = document.createElement("button");
    var textThree = document.createTextNode("more...");
    var tagFour = document.createElement("button");
    var textFour = document.createTextNode("less...");
    var tag = document.createElement("div");
    tagThree.appendChild(textThree);
    tagFour.appendChild(textFour);
    tag.appendChild(tagFour);
    tagThree.classList.add('more');
    tagThree.classList.add('more'+test);
    tagFour.classList.add('less');
    tagFour.classList.add('less'+test);
    tag.classList.add('dialog');
    x2[test].insertBefore(tagThree, x2[test].firstChild);
    div6[test].appendChild(tag);
    test+=1;
  });


  //Removes elements when less button is pressed and adds in more display
  div6.forEach(function(dialog){
    var buttons = dialog.querySelectorAll('.less');
    buttons.forEach(function(button){
    button.addEventListener('click', function(){
      var testy=0;
      dialog.classList.add('gone');
      div6.forEach(function(dialog){
      if(dialog.className != "div6")
        {
          x2[testy].classList.remove('goney');
          div3[testy].classList.add('gone');
          div5[testy].classList.add('gone');
        }
      testy+=1;
      });
       });
      });
   });

  //Adds elements when more button is pressed and removes more display
  x2.forEach(function(dialog){
    var buttons = dialog.querySelectorAll('.more');
    buttons.forEach(function(button){
    button.addEventListener('click', function(){
      var testy=0;
      //button.classList.add('gone');
      dialog.classList.add('temp');
      x2.forEach(function(dialog){
      if(dialog.className != "div2")
        {
          x2[testy].classList.add('goney');
          div3[testy].classList.remove('gone');
          div5[testy].classList.remove('gone');
          div6[testy].classList.remove('gone');
        }
      testy+=1;
      });
      dialog.classList.remove('temp');
       });
      });
   });

  //Reverts changes when media query max-width size is triggered
  function changeStandard(element) {
    if (element.matches) {
      table.classList.add('deact');
      x[0].appendChild(y[0]);
      test = 0;
       x.forEach(function(button){
          x[test].appendChild(y[test]);
          div3[test].classList.add('gone');
          div5[test].classList.add('gone');
          div6[test].classList.add('gone');
          test+=1;
      });

    } 
    else {
      table.classList.remove('deact');
      test = 0;
       x2.forEach(function(button){
          x2[test].insertBefore(y[test], x2[test].firstChild);
          x2[test].classList.remove('goney');
          test+=1;
      });
    }
  }

  //Watches for when element hits max-width 750px;
  var element = window.matchMedia("(max-width: 750px)");
  changeStandard(element);
  element.addListener(changeStandard);
 }
