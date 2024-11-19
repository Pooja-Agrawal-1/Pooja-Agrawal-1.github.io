// Variables to control the decay process and falling images
var decayLevel = 0;
var maxDecayLevel = 10;
var fallingIntervalTime = 5000;
var fallingIntervalBird;
var fallingIntervalPlant;
var screenIsBlack = false; // Flag to check if screen is black
var darknessLevel = 0;
const maxDarkness = 1;

// Selecting all the buttons
const buttons = document.querySelectorAll('#seas-button, #forests-button, #landfills-button');
const seaButtons = document.querySelectorAll('#forests-button, #landfills-button');
const forestButtons = document.querySelectorAll('#seas-button, #landfills-button');
const landfillButtons = document.querySelectorAll('#seas-button, #forests-button');

// References for all graphs
const seaGraph1 = 'seaGraph1.png';
const seaGraph2 = 'seaGraph2.png';
const forestGraph1 = 'forestGraph1.png';
const forestGraph2 = 'forestGraph2.png';
const landfillGraph1 = 'landfillGraph1.png';
const landfillGraph2 = 'landfillGraph2.png';

// HTML element references
const seasButton = document.getElementById('seas-button');
const forestsButton = document.getElementById('forests-button');
const landfillsButton = document.getElementById('landfills-button');
const headerBox = document.getElementById('box-one');
const aboutUsBox = document.getElementById('about-us');
const seasBox = document.getElementById('box-two');
const forestsBox = document.getElementById('box-three');
const landfillBox = document.getElementById('box-four');
const birdContainer = document.getElementById('falling-bird-images-container');
const plantContainer = document.getElementById('falling-plant-images-container');
const seaGraph = document.getElementById('seaGraph');
const forestGraph = document.getElementById('forestGraph');
const landfillGraph = document.getElementById('landfillGraph');
const glitchAudio = document.getElementById('glitch-sound');
const flatlineAudio = document.getElementById('flatline-sound');
const footer = document.getElementById('footer');

// Extract the RGB components
const rgbValues = getRGBVals(headerBox);
const rgbValuesFooter = getRGBVals(footer);

// Initialize color values
var redVal = parseInt(rgbValues[0]);
var greenVal = parseInt(rgbValues[1]);
var blueVal = parseInt(rgbValues[2]);
var redFooter = parseInt(rgbValuesFooter[0]);
var greenFooter = parseInt(rgbValuesFooter[1]);
var blueFooter = parseInt(rgbValuesFooter[2]);

// Add event listeners to start the decay process when buttons are clicked
seasButton.addEventListener('click', startDecay);
forestsButton.addEventListener('click', startDecay);
landfillsButton.addEventListener('click', startDecay);

// Function to update visuals as decay progresses
function updateVisuals() {
    if (screenIsBlack) {
        
        return; // Stop updating if screen is black
    }

    var shadeValue = 255 - Math.min(255, decayLevel * 30);

    // Update colors based on decay level
    redVal -= 5;
    blueVal -= 5;
    greenVal -= 15;
    redFooter -= 25;
    greenFooter -= 25;
    blueFooter -= 25;

    // Apply updated colors to elements
    headerBox.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    headerBox.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    aboutUsBox.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    aboutUsBox.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    seasBox.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    seasBox.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    seasButton.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    seasButton.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    forestsBox.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    forestsBox.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    forestsButton.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    forestsButton.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    landfillBox.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    landfillBox.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    landfillsButton.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    landfillsButton.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
    footer.style.backgroundColor = `rgb(${redFooter}, ${greenFooter}, ${blueFooter})`;
    footer.style.color = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;

    // Create falling images at intervals if not already created
    if (!fallingIntervalPlant) {
        fallingIntervalPlant = setInterval(createFallingPlantImage, fallingIntervalTime);
    }
    if (!fallingIntervalBird) {
        fallingIntervalBird = setInterval(createFallingBirdImage, fallingIntervalTime);
    }

    fallingIntervalTime -= 1000;

    // Darkening the images
    buttons.forEach(button => { 
        button.addEventListener('click', () => {
            document.getElementById('forestImage').classList.add('glitch-active');
            document.getElementById('seaImage').classList.add('glitch-active');
            document.getElementById('landfillImage').classList.add('glitch-active');
            if (!screenIsBlack){
                glitchAudio.play();
            }
            if (darknessLevel < maxDarkness) {
                darknessLevel += 0.1;
                document.getElementById('backgroundOverlay').style.background = `rgba(0, 0, 0, ${darknessLevel})`;
            }
        });
    });

    // Changing and darkening the sea graph
    seaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (seaGraph.src.includes(seaGraph1)) {
                seaGraph.src = seaGraph2;
            } else {
                seaGraph.src = seaGraph1;
            }

            seaGraph.classList.add('darkening');
        });
    });

    // Changing and darkening the forest graph
    forestButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (forestGraph.src.includes(forestGraph1)) {
                forestGraph.src = forestGraph1;
            } else {
                forestGraph.src = forestGraph2;
            }
    
            forestGraph.classList.add('darkening');
    

        });
    });

    // Changing and darkening the landfill graph
    landfillButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (landfillGraph.src.includes(landfillGraph1)) {
                landfillGraph.src = landfillGraph2;
            } else {
                landfillGraph.src = landfillGraph1;
            }
        
            landfillGraph.classList.add('darkening');
        
        });
    });

    // Check if the screen has turned completely black
    if (shadeValue <= 0 ) { // Adjusted the condition to ensure it catches all black scenarios
        screenIsBlack = true; // Set the flag
        clearIntervals(); // Stop the falling images
        glitchAudio.pause();
        flatlineAudio.currentTime = 5;
        flatlineAudio.play();
    }
}

// Function to start the decay process
function startDecay() {
    if (decayLevel <= maxDecayLevel) {
        updateVisuals();
        decayLevel++;
    }
}

// Function to clear intervals
function clearIntervals() {
    if (fallingIntervalPlant) {
        clearInterval(fallingIntervalPlant);
        fallingIntervalPlant = null;
    }
    if (fallingIntervalBird) {
        clearInterval(fallingIntervalBird);
        fallingIntervalBird = null;
    }
    document.body.style.backgroundColor = "black"; // Ensure the screen stays black
    // Clean up existing images
    clearExistingImages();
}

// Function to clear existing images
function clearExistingImages() {
    while (plantContainer.firstChild) {
        plantContainer.removeChild(plantContainer.firstChild);
    }
    while (birdContainer.firstChild) {
        birdContainer.removeChild(birdContainer.firstChild);
    }
}

// Function to get RGB values from an element
function getRGBVals(button) {
    style = window.getComputedStyle(button);
    rgbColor = style.getPropertyValue("background-color");
    rgbVals = rgbColor.match(/\d+/g);
    return rgbVals;
}

// Function to create a falling plant image
function createFallingPlantImage() {
    if (screenIsBlack) {
        return; // Stop if screen is black
    }

    const img = document.createElement('img');
    img.src = 'dead_plant.png'; 
    img.classList.add('fallingImage');
    img.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    img.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random fall duration
    plantContainer.appendChild(img);

    // Remove the image after animation ends
    img.addEventListener('animationend', () => {
        img.remove();
    });
}

// Function to create a falling bird image
function createFallingBirdImage() {
    if (screenIsBlack) {
        return; // Stop if screen is black
    }

    const img = document.createElement('img');
    img.src = 'bird1.PNG'; 
    img.classList.add('fallingImage');
    img.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    img.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random fall duration
    birdContainer.appendChild(img);

    // Remove the image after animation ends
    img.addEventListener('animationend', () => {
        img.remove();
    });
}
