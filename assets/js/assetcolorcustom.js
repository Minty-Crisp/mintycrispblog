//Test Component
AFRAME.registerComponent('system', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},

    init: function () {
        //Do something when component first attached.
        var sceneEl = document.querySelector('a-scene'); 


//Hide Color Buttons
function hideColorButtons() {
        var c = document.getElementById("colorButtons").children;
        for(i = 0; i < c.length ; i++) {
            c[i].style.display = "none";
        }
}
//Temp, need to adjust style natively for initial load
hideColorButtons();

//Show Color Buttons
function showColorButtons() {
        var c = document.getElementById("colorButtons").children;
        for(i = 0; i < c.length ; i++) {
            c[i].style.display = "inline-block";
        }
}

//Part Button Variables
var partButtonSelection = [];
var colorButtonToggle = true; 
var selectedButton = "none"; 

//Part Buttons Array
var partButtons = [];
//Fill Part Buttons Array
partButtons = document.querySelectorAll('.partButton');
//Clear Part Button Array of Button Selected Style
function clearPartButtonSelection() {
    for(let i=0; i < partButtons.length; i++ ){
        partButtons[i].classList.remove('button-selected');
    }
}

function colorButtonDrawer(buttonSelected) {
    //Color Buttons Toggle
    if (colorButtonToggle && selectedButton === "none"){
        //Display Colors
        showColorButtons();
        //Set selected button
        selectedButton = buttonSelected;
        //Toggle
        colorButtonToggle = false;
    } else if (selectedButton !== buttonSelected && selectedButton !== "none") {
        //Hide Colors
        hideColorButtons();
        //Show with delay
        var testTimeout = setTimeout(function () {
            //Display Colors
            showColorButtons();
        }, 100); //Delay
        //Set selected button
        selectedButton = buttonSelected;
        //Toggle
        colorButtonToggle = false;
    } else {
        //Hide Colors
        hideColorButtons();
        //Set selected button
        selectedButton = "none";
        //Toggle
        colorButtonToggle = true;
    }
}

//Part Buttons

//Board Button Function
document.querySelector("#boardButton").onclick = function() {

//Clear All Part Buttons Selection Style
clearPartButtonSelection();

//Assign Part Selected
partButtonSelection = document.querySelectorAll(".boardPart");

//Drawer Functions for Open/Close
colorButtonDrawer("board");


}



//Wheels Button Function
document.querySelector("#wheelsButton").onclick = function() {

//Clear All Part Buttons Selection Style
clearPartButtonSelection();

//Assign Part Selected
partButtonSelection = document.querySelectorAll(".wheelPart");

//Drawer Functions for Open/Close
colorButtonDrawer("wheels");

}




//Board Button Function
document.querySelector("#truck1Button").onclick = function() {

//Clear All Part Buttons Selection Style
clearPartButtonSelection();

//Assign Part Selected
partButtonSelection = document.querySelectorAll(".truck1Part");

//Drawer Functions for Open/Close
colorButtonDrawer("truck1");

}

//Wheels Button Function
document.querySelector("#truck2Button").onclick = function() {
//Test Logging
console.log("Trucks 2 Button Clicked");

//Clear All Part Buttons Selection Style
clearPartButtonSelection();

//Assign Part Selected
partButtonSelection = document.querySelectorAll(".truck2Part");

//Drawer Functions for Open/Close
colorButtonDrawer("truck2");

}

//Board Button Function
document.querySelector("#truck3Button").onclick = function() {

//Clear All Part Buttons Selection Style
clearPartButtonSelection();

//Assign Part Selected
partButtonSelection = document.querySelectorAll(".truck3Part");

//Drawer Functions for Open/Close
colorButtonDrawer("truck3");

}





//Color Buttons
//Red Button Function
document.querySelector("#redColorButton").onclick = function() {
//Test Logging
console.log("Red Button Clicked");

for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#ce1414'});
}

}
//Green Button Function
document.querySelector("#greenColorButton").onclick = function() {
//Test Logging
console.log("Green Button Clicked");

//Assign Part Color 2 - Green
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#3EB489'});
}

}
//Blue Button Function
document.querySelector("#blueColorButton").onclick = function() {
//Test Logging
console.log("Blue Button Clicked");

//Assign Part Color 3 - Blue
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#4c5baf'});
}

}
//Yellow Button Function
document.querySelector("#yellowColorButton").onclick = function() {
//Test Logging
console.log("Yellow Button Clicked");

//Assign Part Color 4 - Yellow
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#afa74c'});
}

}
//Purple Button Function
document.querySelector("#purpleColorButton").onclick = function() {
//Test Logging
console.log("Purple Button Clicked");

//Assign Part Color 5 - Purple
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#724caf'});
}

}
//Orange Button Function
document.querySelector("#orangeColorButton").onclick = function() {
//Test Logging
console.log("Orange Button Clicked");

//Assign Part Color 6 - Orange
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#c75d2e'});
}

}
//Teal Button Function
document.querySelector("#tealColorButton").onclick = function() {
//Test Logging
console.log("Teal Button Clicked");

//Assign Part Color 7 - Teal
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#37b4a1'});
}

}
//Light Blue Button Function
document.querySelector("#lightBlueColorButton").onclick = function() {
//Test Logging
console.log("Light Blue Button Clicked");

//Assign Part Color 8 - Light Blue
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#3d88ef'});
}

}
//Pink Button Function
document.querySelector("#pinkColorButton").onclick = function() {
//Test Logging
console.log("Pink Button Clicked");

//Assign Part Color 9 - Pink
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#C14B76'});
}

}
//Black Button Function
document.querySelector("#blackColorButton").onclick = function() {
//Test Logging
console.log("Black Button Clicked");

//Assign Part Color 10 - Black
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#3e3d3d'});
}

}
//White Button Function
document.querySelector("#whiteColorButton").onclick = function() {
//Test Logging
console.log("White Button Clicked");

//Assign Part Color 11 - White
for(let i = 0; i < partButtonSelection.length; i++) {
    partButtonSelection[i].setAttribute('material', {color: '#e5e2e2'});
}

}


//Randomize Color Parts Button
//
//Board Button Function
document.querySelector("#randomizeButton").onclick = function() {
//Test Logging
console.log("Randomize Button Clicked");

//Clear Manual Part Color Customization
//Clear All Part Buttons Selection Style
clearPartButtonSelection();
//Clear Part Selection
partButtonSelection = [];

//Hide Colors
hideColorButtons();

//Gather Unique Part Sets Based on Part Buttons Existing
var uniquePartSets = [];
//Add Each Unique Part Set Button Names to Array
uniquePartSets = document.querySelectorAll('.partButton');
//Gather Unique Colors Based on Color Buttons Existing
var uniqueColors = [];
//Add Each Unique Color Button Names to Array
uniqueColors = document.querySelectorAll('.colorButton');
//Hold Parts Array Temp
var partRandomizeHold = [];
//Hold Random Color Temp
var colorRandomizeHold = [];

//Loop through Color Buttons for Available Colors
for (let i = 0; i < uniqueColors.length; i++){
    //Test Logging
    //console.log(uniqueColors[i].id);

    //Grab all Parts in the Unique Set
    if (uniqueColors[i].id === 'redColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#ce1414');
    } else if (uniqueColors[i].id === 'greenColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#3EB489');
    } else if (uniqueColors[i].id === 'blueColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#4c5baf');
    } else if (uniqueColors[i].id === 'yellowColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#afa74c');
    } else if (uniqueColors[i].id === 'purpleColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#724caf');
    } else if (uniqueColors[i].id === 'orangeColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#c75d2e');
    } else if (uniqueColors[i].id === 'tealColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#37b4a1');
    } else if (uniqueColors[i].id === 'lightBlueColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#3d88ef');
    } else if (uniqueColors[i].id === 'pinkColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#C14B76');
    } else if (uniqueColors[i].id === 'blackColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#3e3d3d');
    } else if (uniqueColors[i].id === 'whiteColorButton'){
        //Assign Part Selected
        colorRandomizeHold.push('#e5e2e2');
    }

//
//Orange
//Teal
//Pink
//Black
//White
//light blue



}

//Loop through Unique Part Sets
for (let j = 0; j < uniquePartSets.length; j++){
    //Test Logging
    //console.log(uniquePartSets[j].id);

    //Grab all Parts in the Unique Set
    if (uniquePartSets[j].id === 'boardButton'){
        //Assign Part Selected
        partRandomizeHold = document.querySelectorAll(".boardPart");
    } else if (uniquePartSets[j].id === 'wheelsButton'){
        //Assign Part Selected
        partRandomizeHold = document.querySelectorAll(".wheelPart");
    } else if (uniquePartSets[j].id === 'truck1Button'){
        //Assign Part Selected
        partRandomizeHold = document.querySelectorAll(".truck1Part");
    } else if (uniquePartSets[j].id === 'truck2Button'){
        //Assign Part Selected
        partRandomizeHold = document.querySelectorAll(".truck2Part");
    } else if (uniquePartSets[j].id === 'truck3Button'){
        //Assign Part Selected
        partRandomizeHold = document.querySelectorAll(".truck3Part");
    }
    
    //Pick a random Color from the current existing amount of color buttons
    let ranNum = Math.floor(Math.random() * uniqueColors.length);

    //console.log(ranNum);
    //console.log(uniqueColors[ranNum]);

    //Loop through Part Set to change all to randomized color
    for (let h = 0; h < partRandomizeHold.length; h++){
        partRandomizeHold[h].setAttribute('material', {color: colorRandomizeHold[ranNum]});

    }

}

}

    },

    update: function () {
        //Do something when component's data is updated.
    },

    remove: function () {
        //Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
        //Do something on every scene tick or frame.
        //Make a minor random position change to each rain element once it completes it's anim loop.
        //Run check functions everyframe this.updateSomething();
    },
    pause: function () {
        //Pause
    },
    play: function () {
        //Play
    }
});