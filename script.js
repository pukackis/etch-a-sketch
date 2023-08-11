"use strict";

const sketchContainer = document.querySelector(".sketch_container");

let size = prompt("please select grid size");

function generateGrid(value) {
  if (value <= 100) {
    for (let i = 0; i < value; i++) {
      // fills the remaining columns
      for (let j = 0; j < value; j++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("gridsquare");
        gridSquare.style.height = `${960 / value}px`; // Set height using style property
        gridSquare.style.width = `${960 / value}px`; // Set width using style property
        sketchContainer.appendChild(gridSquare);
      } // generates columns in one dimension
    }
  } else {
    alert("Invalid input, please use numbers between 1 and 100");
  }
}
generateGrid(size);

// generateGrid function is responsible for grid generation, used nested loops to ensure that rows and columns are filled exactly as intended

//Add an event listener for the 'mouseover' event on the sketch container
sketchContainer.addEventListener("mouseover", function (event) {
  //Check if the element that triggered the event has the gridsquare class
  if (event.target.classList.contains("gridsquare")) {
    //Change the background color of a single square to black
    event.target.style.backgroundColor = "black";
  }
});
