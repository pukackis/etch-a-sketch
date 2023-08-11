"use strict";

const sketchContainer = document.querySelector(".sketch_container");

function generateGrid(size) {
  for (let i = 0; i < size; i++) {
    // fills the remaining columns
    for (let j = 0; j < size; j++) {
      let gridSquare = document.createElement("div");
      gridSquare.classList.add("gridsquare");
      gridSquare.style.height = `${960 / size}px`; // Set height using style property
      gridSquare.style.width = `${960 / size}px`; // Set width using style property
      sketchContainer.appendChild(gridSquare);
    } // generates columns in one dimension
  }
}

// generateGrid function is responsible for grid generation, used nested loops to ensure that rows and columns are filled exactly as intended
