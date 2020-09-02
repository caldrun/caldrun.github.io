const container = document.querySelector('.canvas');
const penBtn = document.querySelector('.pen');
const pencilBtn = document.querySelector('.pencil');
const randomBtn = document.querySelector('.random');
const eraseBtn = document.querySelector('.erase');
const resetBtn = document.querySelector('.reset');


penBtn.addEventListener('click', () => {
    console.log('button clicked');
    //remove active class from any other button
    removeActive();
    penBtn.classList.add('active');
    drawBlack();
});

pencilBtn.addEventListener('click', () => {
    console.log('button clicked');
    removeActive();
    pencilBtn.classList.add('active');
    drawGrey();
});

randomBtn.addEventListener('click', () => {
    console.log('button clicked');
    removeActive();
    randomBtn.classList.add('active');
    drawRandom();
});

eraseBtn.addEventListener('click', () => {
    console.log('button clicked');
    removeActive();
    eraseBtn.classList.add('active');
    erase();
});

resetBtn.addEventListener('click', () => {
    console.log('button clicked');
    reset();
});


function createGrid(size) {
    container.style.setProperty('--grid-rows', size);
    container.style.setProperty('--grid-columns', size);

    for (i = 0; i < size * size; i++) {
        let cell = document.createElement('div');
        
        container.appendChild(cell).className = 'cell';
    }
   
};


function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let randomColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return randomColor;
}

function getShading() {

}

function drawBlack() {
    const pixels = document.querySelectorAll(".cell");

    pixels.forEach( (pixel) => {
        pixel.addEventListener("mouseenter", e => {
            pixel.style.backgroundColor = 'black';
            pixel.style.opacity = '1';
        });
    });
}

function drawGrey() {
    const pixels = document.querySelectorAll(".cell");

    pixels.forEach( (pixel) => {
        let pixelOpacity = 0.1;
        let pixelOpacityInc = 0;
        pixel.addEventListener("mouseenter", e => {
            if(pixelOpacityInc < 1) {
                pixelOpacityInc += 0.1;
            }
            pixel.style.backgroundColor = 'black';
            pixel.style.opacity = pixelOpacity + pixelOpacityInc;
            
        });
    });
}

function drawRandom() {
    const pixels = document.querySelectorAll(".cell");

    pixels.forEach( (pixel) => {
        pixel.addEventListener("mouseenter", e => {
            pixel.style.backgroundColor = getRandomColor();
            pixel.style.opacity = '1';
        });
    });
}

function erase() {
    const pixels = document.querySelectorAll(".cell");

    pixels.forEach( (pixel) => {
        pixel.addEventListener("mouseenter", e => {
            pixel.style.backgroundColor = 'rgb(220, 220, 220)';
            pixel.style.opacity = '1';
        });
    });
}

function reset() {
    const grid = document.querySelector('.canvas');

    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    
    let defaultSize = 16;

    const getSize = Number(prompt("Enter grid size", defaultSize) );

    if(getSize < 4 || getSize > 64) {
        alert("ERROR: Number should be between 4 and 64");
        createGrid(defaultSize);
    } else
    createGrid(getSize);
}


//removes the active class from all buttons
function removeActive() {
    let active = document.getElementsByClassName('active');
    active[0].classList.remove('active')
    if (active[0]) removeActive();
}


//start program
createGrid(16);
drawBlack();
