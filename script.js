"use strict";

let grid = true;
let rgb = false;
let drawing = false;
let darken = false;
let lighten = false;

const sketchContainer = document.querySelector(".sketch_container");

const startButton = document
  .querySelector("#start")
  .addEventListener("click", buttonPrompt);

const toggleGridButton = document
  .querySelector("#toggle_grid")
  .addEventListener("click", toggleGrid);

const toggleRGBButton = document
  .querySelector("#toggle_rgb")
  .addEventListener("click", toggleRGB);

const lightenButton = document
  .querySelector("#darken")
  .addEventListener("click", darkening);

const ligthenButton = document
  .querySelector("#lighten")
  .addEventListener("click", lightening);

const gridStatus = document.querySelector(".grid");
const currentMode = document.querySelector(".mode");

function buttonPrompt() {
  //Clears sketching area before starting
  sketchContainer.replaceChildren();
  //Prompts user to input grid size, with default of 32
  let size = prompt("please select grid size", 32);
  //Generates grid with given size
  generateGrid(size);
}

function generateGrid(value) {
  grid = true;
  rgb = false;
  drawing = true;
  darken = false;
  lighten = false;

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
  toggleGrid();
  currentModeStatus();
}
// generateGrid function is responsible for grid generation, used nested loops to ensure that rows and columns are filled exactly as intended

document.addEventListener("mousedown", () => {
  clearSelection();
  if (rgb === false && drawing === true) {
    sketchContainer.addEventListener("mouseover", colorBlack);
  } else if (drawing === true) {
    sketchContainer.addEventListener("mouseover", colorRGB);
  } else if (drawing === false && lighten === true) {
    sketchContainer.addEventListener("mouseover", lightening);
  } else if (drawing === false && darken === true) {
    sketchContainer.addEventListener("mouseover", darkening);
  }
});

document.addEventListener("mouseup", () => {
  if (rgb === false && drawing === true) {
    sketchContainer.removeEventListener("mouseover", colorBlack);
  } else if (drawing === true) {
    sketchContainer.removeEventListener("mouseover", colorRGB);
  } else if (drawing === false && lighten === true) {
    sketchContainer.removeEventListener("mouseover", lightening);
  } else if (drawing === false && darken === true) {
    sketchContainer.removeEventListener("mouseover", darkening);
  }
});

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

function colorBlack(event) {
  let rgb = false;
  let drawing = true;
  let darken = false;
  let lighten = false;
  //Check if the element that triggered the event has the gridsquare class
  if (event.target.classList.contains("gridsquare")) {
    event.target.style.opacity = "100%";

    //Change the background color of a single square to black
    event.target.style.backgroundColor = `rgb(0,0,0)`;
  }
}

function colorRGB(event) {
  let rgb = true;
  let drawing = true;
  let darken = false;
  let lighten = false;
  //Check if the element that triggered the event has the gridsquare class
  if (event.target.classList.contains("gridsquare")) {
    event.target.style.opacity = "100%";
    //Change the background color of a single square to random rgb color

    event.target.style.backgroundColor = `rgb(
      ${Math.random() * 256},
      ${Math.random() * 256},
      ${Math.random() * 256}
    )`;
  }
}

function darkening(event) {
  //Check if the element that triggered the event has the gridsquare class
  drawing = false;
  darken = true;
  lighten = false;
  if (event.target.classList.contains("gridsquare")) {
    let currentColor = window.getComputedStyle(event.target).backgroundColor;
    let r, g, b;

    if (currentColor.startsWith("rgb")) {
      const rgbValues = currentColor.match(/\d+/g);
      r = parseInt(rgbValues[0]);
      g = parseInt(rgbValues[1]);
      b = parseInt(rgbValues[2]);
    } else {
      r = g = b = 0;
    }

    r = Math.max(0, r - Math.round(r * 0.25));
    g = Math.max(0, g - Math.round(g * 0.25));
    b = Math.max(0, b - Math.round(b * 0.25));

    event.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  }
  currentModeStatus();
}

function lightening(event) {
  //Check if the element that triggered the event has the gridsquare class
  drawing = false;
  lighten = true;
  darken = false;
  if (event.target.classList.contains("gridsquare")) {
    let currentColor = window.getComputedStyle(event.target).backgroundColor;
    let r, g, b;

    if (currentColor.startsWith("rgb")) {
      const rgbValues = currentColor.match(/\d+/g);
      r = parseInt(rgbValues[0]);
      g = parseInt(rgbValues[1]);
      b = parseInt(rgbValues[2]);
      console.log(rgbValues);
    } else {
      r = g = b = 255;
    }

    r = Math.min(255, r + Math.round((255 - r) * 0.25));
    g = Math.min(255, g + Math.round((255 - g) * 0.25));
    b = Math.min(255, b + Math.round((255 - b) * 0.25));

    event.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  }
  currentModeStatus();
  e;
}

function toggleRGB() {
  drawing = true;
  darken = false;
  lighten = false;
  rgb = !rgb;
  currentModeStatus();
}

// Function to toggle grid on or off
function toggleGrid() {
  const gridSquares = document.querySelectorAll(".sketch_container > div"); // select all square divs that were created in sketch_container upon starting the game

  gridSquares.forEach((square) => {
    // change outline for each div depending wheter grid is true or false
    if (grid) {
      square.style.outline = "solid 1px rgba(204, 204, 204, 0.226)";
    } else {
      square.style.outline = "none";
    }
  });
  changeGridStatus();
  grid = !grid; // change boolean value of grid on button press
}

function changeGridStatus() {
  if (grid === true) {
    gridStatus.textContent = "grid: ON";
    console.log(gridStatus);
  } else if (grid === false) {
    gridStatus.textContent = "grid: OFF";
    console.log(gridStatus);
  }
}

function currentModeStatus() {
  if (rgb === false && drawing === true) {
    currentMode.textContent = "mode: BLACK";
  } else if (rgb === true && drawing == true) {
    currentMode.textContent = "mode: RAINBOW";
  } else if (drawing === false && darken === true) {
    currentMode.textContent = "mode: DARKENING";
  } else if (drawing === false && lighten === true) {
    currentMode.textContent = "mode: LIGHTENING";
  }
}
