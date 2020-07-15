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

//Updates elements and generates titles
//function updateStandards() {
  //Retrieves necessary DOM elements

  var x = document.querySelectorAll(".div1");
  var x2 = document.querySelectorAll(".div2");
  var div3 = document.querySelectorAll(".div3");
  var div5 = document.querySelectorAll(".div5");
  var div6 = document.querySelectorAll(".div6");
  var div7 = document.querySelectorAll(".div7");
  var y = document.querySelectorAll(".sec2");
  var sec3 = document.querySelectorAll(".sec3");
  var sec4 = document.querySelectorAll(".sec4");

  //Generates Concept, Subconcept, and Standard titles on mobile devices
  test=0;
  div5.forEach(function(button){
    /*NEW*/
    var tagTwo = document.createElement("p");
    var textTwo = document.createTextNode("Concept");
    var tagThree = document.createElement("p");
    var textThree = document.createTextNode("Subconcept");
    var tagFour = document.createElement("p");
    var textFour = document.createTextNode("Practices");
    tagThree.appendChild(textThree);
    tagFour.appendChild(textFour);
    tagTwo.appendChild(textTwo);
    tagTwo.classList.add('concept');
    tagThree.classList.add('subconcept');
    tagFour.classList.add('practices');
    div5[test].insertBefore(tagTwo, div5[test].firstChild);
    div6[test].insertBefore(tagThree, div6[test].firstChild);
    div7[test].insertBefore(tagFour, div7[test].firstChild);
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
    div7[test].appendChild(tag);
    test+=1;
  });


  //Removes elements when less button is pressed and adds in more display
  div7.forEach(function(dialog){
    var buttons = dialog.querySelectorAll('.less');
    buttons.forEach(function(button){
    button.addEventListener('click', function(){
      var testy=0;
      dialog.classList.add('gone');
      div7.forEach(function(dialog){
      if(dialog.className != "div6")
        {
          x2[testy].classList.remove('goney');
          div3[testy].classList.add('gone');
          div5[testy].classList.add('gone');
          div6[testy].classList.add('gone');
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
          div7[testy].classList.remove('gone');
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
          div7[test].classList.add('gone');
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
 //}
