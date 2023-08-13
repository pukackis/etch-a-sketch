"use strict";

const sketchContainer = document.querySelector(".sketch_container");

const startButton = document.querySelector("#startBTN");

startButton.addEventListener("click", buttonPrompt);

function buttonPrompt() {
  //Clears sketching area before starting
  sketchContainer.replaceChildren();
  //Prompts user to input grid size, with default of 32
  let size = prompt("please select grid size", 32);
  //Generates grid with given size
  generateGrid(size);
}

function generateGrid(value) {
  if (value <= 100) {
    // fills the remaining columns
    for (let i = 0; i < value; i++) {
      for (let j = 0; j < value; j++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("gridsquare");
        gridSquare.style.height = `${500 / value}px`; // Set height using style property
        gridSquare.style.width = `${500 / value}px`; // Set width using style property
        sketchContainer.appendChild(gridSquare);
      } // generates columns in one dimension
    }
  } else {
    alert("Invalid input, please use numbers between 1 and 100");
  }
}
// generateGrid function is responsible for grid generation, used nested loops to ensure that rows and columns are filled exactly as intended

let isDrawing = false;

document.addEventListener("mousedown", () => {
  isDrawing = true;
  clearSelection();
  sketchContainer.addEventListener("mouseover", colorBlack);
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
  sketchContainer.removeEventListener("mouseover", colorBlack);
});

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

function colorBlack(event) {
  //Check if the element that triggered the event has the gridsquare class
  if (isDrawing && event.target.classList.contains("gridsquare")) {
    //Change the background color of a single square to black
    event.target.style.backgroundColor = "black";
  }
}
