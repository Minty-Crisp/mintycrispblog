//bubbles.js
//by Minty Crisp @ MintyCrisp.com
//
//Blank Component
AFRAME.registerComponent('blank', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},

    init: function () {
        //Do something when component first attached.
        //Called once when the component is initialized. Used to set up initial state and instantiate variables.
        var sceneEl = document.querySelector('a-scene'); 
    },

    update: function () {
        //Do something when component's data is updated.
        //Called both when the component is initialized and whenever any of the component’s properties is updated (e.g, via setAttribute). Used to modify the entity.
    },

    remove: function () {
        //Do something the component or its entity is detached.
        //Called when the component is removed from the entity (e.g., via removeAttribute) or when the entity is detached from the scene. Used to undo all previous modifications to the entity.
    },

    tick: function (time, timeDelta) {
        //Do something on every scene tick or frame.
        //Make a minor random position change to each rain element once it completes it's anim loop.
        //Run check functions everyframe this.whatever();
        //Called on each render loop or tick of the scene. Used for continuous changes or checks.
    },

    tock: function (time, timeDelta, canera) {
        //Identical to the tick method but invoked after the scene has rendered.
        //The tock handler is used to run logic that needs access to the drawn scene before it’s pushed into the headset like postprocessing effects.
        //Called on each render loop or tick of the scene after the scene has rendererd. Used for post processing effects or other logic that needs to happen after the scene has been drawn.

    },

    play: function () {
        //Play
        //Called whenever the scene or entity plays to add any background or dynamic behavior. Also called once when the component is initialized. Used to start or resume behavior.
    },

    pause: function () {
        //Pause
        //Called whenever the scene or entity pauses to remove any background or dynamic behavior. Also called when the component is removed from the entity or when the entity is detached from the scene. Used to pause behavior.
    },

    updateSchema: function () {
        //updateSchema
        //Called whenever any of the component’s properties is updated. Can be used to dynamically modify the schema.
    },

    whatever: function () {
        //Whatever
    }
});
//
//Utilities
//
//Current Theme Vairable Initialize Function
AFRAME.registerComponent('variable-init',{
    init: function(){
        //Initialize Starter Variables for components

        //Not yet being utilized fully
        //Settings 
        let settingsWindow = document.querySelector('#settingsWindow');
        //Intialize currentTheme Attribute
        settingsWindow.setAttribute('currentTheme', '0');

        //UI button
        //let secretsUI = document.querySelector('#secretsUI');
        //Set default Secrets text
        //secretsUI.setAttribute('text', {value: '* Secrets Found *\n 0 / 4\n', color: 'white', align: 'center'});

    }
});
//
//Test Component, Reading Info on Attached Entity
AFRAME.registerComponent('info', {

    init: function () {
        //Do something when component first attached.
        //var element = this.el;
        this.helperVector = new THREE.Vector3();
        //this.helperRotation = new THREE.Vector3();
        this.helperQuaternion = new THREE.Quaternion();
        this.results = [];
    },

    tick: function () {
        //var element = this.el;
        let results = this.info();
        let userPos = results[0];
        let userQuat = results[1];
        //console.log(userPos);
        //console.log(userQuat);
    },

    info: function () {
        //var element = this.el;
        var helperVector = this.helperVector;
        //var helperRotation = this.helperRotation;
        var helperQuaternion = this.helperQuaternion;
        var results = this.results;
        //return helperRotation.copy(this.el.object3D.rotation);
        return results = [helperVector.copy(this.el.object3D.position), helperQuaternion.copy(this.el.object3D.quaternion)];

  },
});
//
//UI
//
//Need to test on HMD if raycaster re-enables and if an update function can be used instead of a tick for reading rotation change
//
//

//
//Globals
var moveTo = false;
var moveBack = false;
var moveBrake = false;
var brakeReady = true;
var brakeToggle = true;
var brakeReset; //Delay
var moveSpeedDefault = 0.15;
var moveSpeedSlow = 0.03;

//
//Player Belt
AFRAME.registerComponent('belt', {
    schema: {
        uiid: {type: 'string', default: 'ui'},
        controller1id: {type: 'string', default: 'controller1'},
        controller2id: {type: 'string', default: 'controller2'},
		courserid: {type: 'string', default: 'mouseCursor'},
    },

init: function () {
	//Do something when component first attached.
	// Set up the tick throttling.
	this.throttledFunction3 = AFRAME.utils.throttle(this.everySome, 30, this);
	this.throttledFunction = AFRAME.utils.throttle(this.everySecond, 1000, this);
	this.throttledFunction2 = AFRAME.utils.throttle(this.everyMin, 60000, this);



	//Schema Imoprt
	//
	//Controller Elements
	this.controller1 = document.getElementById(this.data.controller1id);
	this.controller2 = document.getElementById(this.data.controller2id);
	//Cursor Element
	this.mouseCursor = document.getElementById(this.data.courserid);
	//UI to attach
	this.ui = document.getElementById(this.data.uiid);
	//
	//Band Controller Support
	const directionForward = document.getElementById('directionForward');
	const directionReverse = document.getElementById('directionReverse');
	const directionBrake1 = document.getElementById('directionBrake1');
	const directionBrake2 = document.getElementById('directionBrake2');
	const directionBrake3 = document.getElementById('directionBrake3');
	const directionBrake4 = document.getElementById('directionBrake4');
	//this.brakeToggle = true;
	//this.brakeReady = true;



	//Walk Support
	this.camera = document.getElementById('userView');
	this.player = document.getElementById('player');
	this.ui = document.getElementById('ui');
    this.positionCam = new THREE.Vector3();
    this.positionPlayer = new THREE.Vector3();
    this.positionNew = new THREE.Vector3();
    this.positionTemp = new THREE.Vector3();
	this.quaternion = new THREE.Quaternion();
	this.vector;
	this.angle;
	//this.theta;



	//Attach to Player Support
	this.elPosVec3New = new THREE.Vector3();


	//Controller Check Support
	this.controller1PosVec3Now = new THREE.Vector3();
	this.controller1PosVec3Init = new THREE.Vector3();
	//Clone entity's starting rotation
	this.controller1PosVec3Init.copy(this.controller1.object3D.rotation);

	//User Direction Support
	this.velocity;
	this.userPreviousPos = this.player.getAttribute('position');
	this.userPos;
	this.userRot;
	this.userPov;
	this.userTravel;
	this.userView;
	this.newX;
	this.newZ;
//var worldToLocal = new THREE.Matrix4().getInverse(object3D.matrixWorld)
//anotherObject3D.applyMatrix(worldToLocal);


//
//directionForward
directionForward.addEventListener('mouseenter', function(){
moveTo = true;
});

directionForward.addEventListener('mouseleave', function(){
moveTo = false;
});

//
//directionForward
directionReverse.addEventListener('mouseenter', function(){
moveBack = true;
});

directionReverse.addEventListener('mouseleave', function(){
moveBack = false;
});

document.querySelectorAll('.directionBrake').forEach(item => {
  item.addEventListener('mouseenter', event => {
//Brake is disabled for 1.5 seconds after engaging
if(brakeReady){
if(brakeToggle){
//Set reset switch toggle
brakeToggle = false;
//Set reset timer switch toggle
brakeReady = false;
//Brake On
moveBrake = true;
//set brake color to red
directionBrake1.setAttribute('material', {color: 'red'});
directionBrake2.setAttribute('material', {color: 'red'});
directionBrake3.setAttribute('material', {color: 'red'});
directionBrake4.setAttribute('material', {color: 'red'});
//anim positition for forward/reverse bar and brakes
directionForward.emit('brakeOn',{});
directionReverse.emit('brakeOn',{});
directionBrake1.emit('brakeOn',{});
directionBrake2.emit('brakeOn',{});
directionBrake3.emit('brakeOn',{});
directionBrake4.emit('brakeOn',{});
} else {
//Set reset switch toggle
brakeToggle = true;
//Set reset timer switch toggle
brakeReady = false;
//Brake Off
moveBrake = false;
//set brake color to default
directionBrake1.setAttribute('material', {color: 'black'});
directionBrake2.setAttribute('material', {color: 'black'});
directionBrake3.setAttribute('material', {color: 'black'});
directionBrake4.setAttribute('material', {color: 'black'});
//anim positition for forward/reverse bar back to default
directionForward.emit('brakeOff',{});
directionReverse.emit('brakeOff',{});
directionBrake1.emit('brakeOff',{});
directionBrake2.emit('brakeOff',{});
directionBrake3.emit('brakeOff',{});
directionBrake4.emit('brakeOff',{});
}
}
  })
});

document.querySelectorAll('.directionBrake').forEach(item => {
  item.addEventListener('mouseleave', event => {
//This will start the reset timer to allow the brake to be re-engadged
//Brake Reset Timeout
brakeReset = setTimeout(function () {
//Set reset switch toggle
brakeReady = true;
}, 2250); //Delay
  })
});

//End Init
},

//Update
update: function () {
//On Update
},

everySome: function (time, timeDelta) {
	//Do something on every scene tick or frame.

	//console.log('everysome running');
	//console.log(move);

	//testing
	//console.log(this.el.object3D.rotation);
	//this.directionForward.addEventListener('mouseenter', this.walk.bind(this));

if(moveBrake){
	if(moveTo) {
		this.walk('forward', moveSpeedSlow);
	} else if(moveBack) {
		this.walk('reverse', moveSpeedSlow);
	}//end while
}else{
	if(moveTo) {
		this.walk('forward', moveSpeedDefault);
	} else if(moveBack) {
		this.walk('reverse', moveSpeedDefault);
	}//end while
}//end moveBrake
},

everySecond: function (time, timeDelta) {
	//Do something on every scene tick or frame.

	//testing
	//console.log(this.el.object3D.rotation);

},

everyMin: function (time, timeDelta) {
	//Do something on every scene tick or frame.

	//testing
	//console.log(this.el.object3D.rotation);



},

tick: function (time, timeDelta) {
	//Do something on every scene tick or frame.

	//Throttle
	//this.throttledFunction();
	//this.throttledFunction2();
	this.throttledFunction3();

	//Run uiSync Function
	this.uiSync();

},

//Function to calculate distance between two points
distance: function(x1, y1, x2,  y2) {
    //Calculating distance
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
},

uiSync: function () {
//uiSync
//Clone current the entity this component is attached to's position
this.elPosVec3New.copy(this.el.object3D.position);
//No Offsets as UI Parent is at 0 0 0
//Set position for UI at 3js level for speed!
this.ui.object3D.position.copy(this.elPosVec3New);
},

walk: function (action, speed) {
//console.log('walking');

this.vector = new THREE.Vector3();
this.positionNew = new THREE.Vector3();


this.velocity = speed;
//Get Camera Vec3
this.camera.object3D.getWorldDirection(this.vector);
this.positionPlayer.copy(this.player.object3D.position);
//Math out the Angle
//Degrees
//this.angle = Math.atan2(this.vector.x,this.vector.z) * 180 / Math.PI;
//Radians
this.angle = Math.atan2(this.vector.x,this.vector.z);
// 0 < θ < π/2


if(action === 'forward'){
//check which quadrant the vector is in
if(this.angle > 0 && this.angle < Math.PI/2) {
this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
//console.log('1');
} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
//console.log('2');
} else if(this.angle < 0 && this.angle > -Math.PI/2) {
this.angle += Math.PI;
this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
//console.log('3');
} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
this.angle += (Math.PI * 2);
this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
//console.log('4');
} else {
this.positionNew.x = this.positionPlayer.x;
this.positionNew.z = this.positionPlayer.z;
//console.log('0');
}
} else if(action === 'reverse'){
//check which quadrant the vector is in
if(this.angle > 0 && this.angle < Math.PI/2) {
this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
//console.log('1');
} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
//console.log('2');
} else if(this.angle < 0 && this.angle > -Math.PI/2) {
this.angle += Math.PI;
this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.velocity);
//console.log('3');
} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
this.angle += (Math.PI * 2);
this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.velocity);
this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.velocity);
//console.log('4');
} else {
this.positionNew.x = this.positionPlayer.x;
this.positionNew.z = this.positionPlayer.z;
//console.log('0');
}
}

this.positionNew.y = this.positionPlayer.y;

//No Offsets as UI Parent is at 0 0 0
//Set position for UI at 3js level for speed!
this.player.object3D.position.copy(this.positionNew);
//console.log(this.angle);
//console.log(this.positionNew);

},


//instead of this
//use the event data to determine what console this is on and go from there
controllerCheck: function () {

//Clone current entity's rotation
this.controller1PosVec3Now.copy(this.controller1.object3D.rotation);
//Compare if any change has happened, if so turn on laser
if (this.controller1PosVec3Now.x === this.controller1PosVec3Init.x && this.controller1PosVec3Now.y === this.controller1PosVec3Init.y && this.controller1PosVec3Now.z === this.controller1PosVec3Init.z) {
	//this.controller1.setAttribute('visible', false);
	this.controller1.object3D.visible = false;
	this.controller1.setAttribute('raycaster', {enabled: false});
	//Enable Head Cursor 
	this.mouseCursor.object3D.visible = true;
	this.mouseCursor.setAttribute('raycaster', {enabled: true});
} else {
	//this.controller1.setAttribute('visible', true);
	this.controller1.object3D.visible = true;
	this.controller1.setAttribute('raycaster', {enabled: true});
	//Disable Head Cursor
	this.mouseCursor.object3D.visible = false;
	this.mouseCursor.setAttribute('raycaster', {enabled: false});
}

},

//Check wether entity is far enough away from the user to force a respawn
userDirection: function (){
	//Get User's current XZ position
	this.userPos = this.player.getAttribute('position');
	//Check current User Rotation view
	//let userRot = user.getAttribute('rotation');
	this.userRot = this.camera.getAttribute('rotation');

	//Could use userTravel and userView to determine a shorter distance in which a particle is flagged for respawn. Think as soon as something is out of the users view like they just walked past it.

	//Check which direction the user is traveling
	if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northWest -x-z
		this.userTravel = 'northWest';
	} else if((this.userPreviousPos.x + this.userPos.x < 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southWest -x +z
		this.userTravel = 'southWest';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z > 0)){
		//southEast +x+z
		this.userTravel = 'southEast';
	} else if((this.userPreviousPos.x + this.userPos.x > 0) && (this.userPreviousPos.z + this.userPos.z < 0)){
		//northEast +x-z
		this.userTravel = 'northEast';
	} else {
		//Default
		this.userTravel = 'northEast';
	}
	//After previous to current position check, update the previous position value to be compared against on the next run cycle
	this.userPreviousPos = this.userPos;

	//If POV Rotation is more then 360 or -360, divide it by sets of 360 to obtain 0-360 degrees to assign from
	if( this.userRot.y > 360) {
		let radials = this.userRot.y / 360;
		//Test Logging
		//console.log(radials);
		//console.log(Math.floor(radials));
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else if(this.userRot.y < -360) {
		let radials = this.userRot.y / 360;
		this.userPov = ((Math.floor(radials)) * 360 ) - this.userRot.y;
		this.userPov *= -1;
	} else {
		this.userPov = this.userRot.y;
	}

	//Check which direciton the User is facing
	if ((this.userPov > 0 && this.userPov < 15) || (this.userPov > 345 && this.userPov < 360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov > 255 && this.userPov > 285) {
			//East
			this.userView = 'east';
		} else if (this.userPov > 75 && this.userPov < 105) {
			//West
			this.userView = 'west';
		} else if (this.userPov > 165 && this.userPov < 195) {
			//South
			this.userView = 'south';
		} else if ((this.userPov < 0 && this.userPov > -15) || (this.userPov < -345 && this.userPov > -360)) {
			//North
			this.userView = 'north';
	   } else if (this.userPov < -255 && this.userPov > -285) {
			//West
			this.userView = 'west';
		} else if (this.userPov < -75 && this.userPov > -105) {
			//East
			this.userView = 'east';
		} else if (this.userPov < -165 && this.userPov > -195) {
			//South
			this.userView = 'south';
		} else if (this.userPov > 15 && this.userPov < 75) {//
			//North West
			this.userView = 'northWest';
	   } else if (this.userPov > 105 && this.userPov < 165) {//
			//South West
			this.userView = 'southWest';
		} else if (this.userPov > 195 && this.userPov < 255) {//
			//South East
			this.userView = 'southEast';
		} else if (this.userPov > 285 && this.userPov < 345) {//
			//North East
			this.userView = 'northEast';
		} else if (this.userPov < -15 && this.userPov > -75 ) {//Negative direction
			//North East
			this.userView = 'northEast';
	   } else if (this.userPov < -105 && this.userPov > -165) {
			//South East
			this.userView = 'southEast';
		} else if (this.userPov < -195 && this.userPov > -255) {
			//South West
			this.userView = 'southWest';
		} else if (this.userPov < -285 && this.userPov > -345) {
			//North West
			this.userView = 'northWest';
		} else {
			this.userView = 'north';
		}

	//Test Logging
	console.log("User Direction: " + this.userView);


	//Depending on the User's facing direction, spawn in that quadrant
	if(this.userView === "northWest"){// -x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z = (this.velocity + this.positionPlayer.z) * -1;
		this.positionTemp.z += this.positionPlayer.z;
	} else if(this.userView === "southWest"){// -x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "southEast"){// +x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "northEast"){// +x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z) * -1;
	} else if(this.userView === "north"){// +-x -z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z) * -1;
	} else if(this.userView === "west"){// -x +-z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x) * -1;
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "east"){// +x +-z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else if(this.userView === "south"){// +-x +z
		this.positionTemp.x = (this.velocity + this.positionPlayer.x);
		this.positionTemp.z =(this.velocity + this.positionPlayer.z);
	} else {
		this.positionTemp.x = 0;
		this.positionTemp.z = 0;
	}
	this.positionNew = new THREE.Vector3(this.positionTemp.x, 0, this.positionTemp.z);
},//spawnwithuser

});

//
//Attach
AFRAME.registerComponent('attach', {
    schema: {
        idname: {type: 'string', default: 'ui'}
    },

    init: function () {
        //Do something when component first attached.
        //Thing To Attach
        this.attachee = document.getElementById(this.data.idname);
        //Empty Pos Vec3
        this.newPosVec3 = new THREE.Vector3();
    },

    update: function () {
        //Do something when component's data is updated.
    },

    remove: function () {
        //Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
        //Do something on every scene tick or frame.

        //Run uiSync Function
        this.uiSync();

    },

    pause: function () {
        //Pause
    },
    play: function () {
        //Play
    },
    uiSync: function () {
        //uiSync
        //Clone current the entity this component is attached to's position
        this.newPosVec3.copy(this.el.object3D.position);
        //Offsets
        this.newPosVec3.x = this.newPosVec3.x - this.attachee.object3D.position.x;
        this.newPosVec3.y = this.newPosVec3.y - this.attachee.object3D.position.y;
        this.newPosVec3.z = this.newPosVec3.z - this.attachee.object3D.position.z;
        //Set position for UI at 3js level for speed!
        this.attachee.object3D.position.copy(this.newPosVec3);
    },
});
//
//Theme Button Settings Click Function
AFRAME.registerComponent('themechangebutton',{
    init: function(){
        //This Element
        let element = this.el;
        //Text value attribute
        let button = element.getAttribute('text');
        //Settings Variables
        let settingsWindow = document.querySelector('#settingsWindow');

        //Cherry buttonIcon Material
        let cherryGradMaterial = {
            shader: "threeColorGradientShader",
            topColor: "#FFFFFF",
            middleColor: "#cc55d9",
            bottomColor: "#833c8b"};
        //Cherry buttonBackground Material
        let cherryFlatOpacMaterial = {
            shader: "flat",
            color: "#e84db2",
            opacity: 0.25,
            side: "double"};
        //Cherry Text Color
        let cherryTextColor = "#e84db2";

        //Vaporwave buttonIcon Material
        let vaporwaveGradMaterial = {
            shader: "threeColorGradientShader",
            topColor: "#FFFFFF",
            middleColor: "#00d2ed",
            bottomColor: "#b25a5a"};
        //Vaporwave buttonBackground Material
        let vaporwaveFlatOpacMaterial = {
            shader: "flat",
            color: "#00d2ed",
            opacity: 0.25,
            side: "double"};
        //Vaporwave Text Color
        let vaporwaveTextColor = "#00d2ed";

        //Forest buttonIcon Material
        let forestGradMaterial = {
            shader: "threeColorGradientShader",
            topColor: "#FFFFFF",
            middleColor: "#33b281",
            bottomColor: "#1c6247"};
        //Forest buttonBackground Material
        let forestFlatOpacMaterial = {
            shader: "flat",
            color: "#33b281",
            opacity: 0.25,
            side: "double"};
        //Forest Text Color
        let forestTextColor = "#33b281";

        //Theme Objects in Scene
        //Collection of theme button selections
        let allThemeButtonSelections;
        //Collection of all button click backgrounds
        let allIconBackgrounds
        //Collection of all UI Icons
        let allIcons;
        //Collection of all UI Icon text
        let allIconsText;
        //Collection of all UI Screen Borders
        let allScreenBorders;
        //Collection of all other text
        let allOtherText;
        //Collection of all other UI for theme
        let allOtherThemeUI;
        //Delay collecting UI to ensure all are created before starting
        var collectionTimeout = setTimeout(function () {
            //Collection of Settings Theme display click buttons
            allThemeButtonSelections = document.querySelectorAll('.themeButton');
            //Collection of all UI 3D icons
            allIcons = document.querySelectorAll('.buttonIcon');
            //Collection of all Media UI icon button backgrounds click
            allIconBackgrounds = document.querySelectorAll('.buttonBackground');
            //Collection of all UI icon text
            allIconsText = document.querySelectorAll('.iconText');
            //Collection of all UI Screen Borders
            allScreenBorders = document.querySelectorAll('.screenBorder');
            //Collection of all UI text - just cottageOS right now
            allOtherText = document.querySelectorAll('.otherText');
            //Collection of all other UI for theme, currently planes/curved
            allOtherThemeUI = document.querySelectorAll('.themeui');
        }, 250); //Delay

        //Listen for Click to change Theme
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            if (button.value === "Cherry") {

                //Mark selection as current theme
                settingsWindow.setAttribute('currentTheme', '0');

                //Reset other button selections back to black text
                for (let i = 0; i < allThemeButtonSelections.length; i++){
                    allThemeButtonSelections[i].setAttribute('color', "black");
                }

                //Display marked selection
                element.setAttribute('color', "white");

                //Change Theme to selection
                //Icons
                for (let j = 0; j < allIcons.length; j++){
                    allIcons[j].setAttribute('material', cherryGradMaterial);
                }
                //Click Material
                for (let k = 0; k < allIconBackgrounds.length; k++){
                    allIconBackgrounds[k].setAttribute('material', cherryFlatOpacMaterial);
                }
                //Icon Text
                for (let l = 0; l < allIconsText.length; l++){
                    allIconsText[l].setAttribute('color', cherryTextColor);
                }
                //Screen Borders
                for (let m = 0; m < allScreenBorders.length; m++){
                    allScreenBorders[m].setAttribute('material', cherryGradMaterial);
                }
                //Other Text
                for (let n = 0; n < allOtherText.length; n++){
                    allOtherText[n].setAttribute('color', cherryTextColor);
                }
                //Other UI
                for (let o = 0; o < allOtherThemeUI.length; o++){
                    allOtherThemeUI[o].setAttribute('material', cherryFlatOpacMaterial);
                }
            } else if (button.value === "Vaporwave") {
                //Mark selection as current theme
                settingsWindow.setAttribute('currentTheme', '1');
                //Reset other button selections back to black text
                for (let i = 0; i < allThemeButtonSelections.length; i++){
                    allThemeButtonSelections[i].setAttribute('color', "black");
                }
                //Display marked selection
                element.setAttribute('color', "white");
                //Change Theme to selection
                //Icons
                for (let j = 0; j < allIcons.length; j++){
                    allIcons[j].setAttribute('material', vaporwaveGradMaterial);
                }
                //Click Material
                for (let k = 0; k < allIconBackgrounds.length; k++){
                    allIconBackgrounds[k].setAttribute('material', vaporwaveFlatOpacMaterial);
                }
                //Icon Text
                for (let l = 0; l < allIconsText.length; l++){
                    allIconsText[l].setAttribute('color', vaporwaveTextColor);
                }
                //Screen Borders
                for (let m = 0; m < allScreenBorders.length; m++){
                    allScreenBorders[m].setAttribute('material', vaporwaveGradMaterial);
                }
                //Other Text
                for (let n = 0; n < allOtherText.length; n++){
                    allOtherText[n].setAttribute('color', vaporwaveTextColor);
                }
                //Other UI
                for (let o = 0; o < allOtherThemeUI.length; o++){
                    allOtherThemeUI[o].setAttribute('material', vaporwaveFlatOpacMaterial);
                }
            } else if (button.value === "Forest") {
                //Mark selection as current theme
                settingsWindow.setAttribute('currentTheme', '2');
                //Reset other button selections back to black text
                for (let i = 0; i < allThemeButtonSelections.length; i++){
                    allThemeButtonSelections[i].setAttribute('color', "black");
                }
                //Display marked selection
                element.setAttribute('color', "white");
                //Change Theme to selection
                //Icons
                for (let j = 0; j < allIcons.length; j++){
                    allIcons[j].setAttribute('material', forestGradMaterial);
                }
                //Click Material
                for (let k = 0; k < allIconBackgrounds.length; k++){
                    allIconBackgrounds[k].setAttribute('material', forestFlatOpacMaterial);
                }
                //Icon Text
                for (let l = 0; l < allIconsText.length; l++){
                    allIconsText[l].setAttribute('color', forestTextColor);
                }
                //Screen Borders 
                for (let m = 0; m < allScreenBorders.length; m++){
                    allScreenBorders[m].setAttribute('material', forestGradMaterial);
                }
                //Other Text
                for (let n = 0; n < allOtherText.length; n++){
                    allOtherText[n].setAttribute('color', forestTextColor);
                }
                //Other UI
                for (let o = 0; o < allOtherThemeUI.length; o++){
                    allOtherThemeUI[o].setAttribute('material', forestFlatOpacMaterial);
                }
            } else {
                //default
            }

        });
    }
});
//
//Spawn Button Function
AFRAME.registerComponent('spawnmediabuttons',{
    init: function(){
        //Do something when component first attached.
        var sceneEl = document.querySelector('a-scene'); 
        //let element = this.el;
        //var user = document.querySelector('#userView');

        //Which Buttons are Active to Show
        let settingsButton = true;
        let leftSkipButton = true;
        let backwardsButton = true;
        let stopButton = true;
        let playPauseButton = true;
        let forwardButton = true;
        let rightSkipButton = true;
        let cancelButton = true;
        //Store current buttons
        var currentButtons = [];
        if (settingsButton) {
            currentButtons.push("settingsButton");
        }
        if (leftSkipButton) {
            currentButtons.push("leftSkipButton");
        }
        if (backwardsButton) {
            currentButtons.push("backwardsButton");
        }
        if (stopButton) {
            currentButtons.push("stopButton");
        }
        if (playPauseButton) {
            currentButtons.push("playPauseButton");
        }
        if (forwardButton) {
            currentButtons.push("forwardButton");
        }
        if (rightSkipButton) {
            currentButtons.push("rightSkipButton");
        } 
        if (cancelButton) {
            currentButtons.push("cancelButton");
        }
        //Create button particles
        buttons(2, 180);
        //

//Button Spawn
function buttons(distance, degrees) {
    //Create parent identity w/ id
    let buttonsUI = document.createElement('a-entity');
    buttonsUI.setAttribute('id','buttonsUI');
    //Set Default Rotation
    buttonsUI.setAttribute('rotation', {x: 0, y: 80, z: 0}); //Offset Y rotation to center
    //Append parent entity to scene
    sceneEl.appendChild(buttonsUI);
    //How many buttons to create
    //buttonsAmount
    //How many degrees to cover for button placement
    //degrees
    //How far away from the user
    //distance
    let spawnHeight = 0.5;

    //Button Properties
    //Set Scale
    let scaleX = 0.1;
    let scaleY = 0.1;
    let scaleZ = 0.1;
    let scaleVec3 = new THREE.Vector3(scaleX, scaleY, scaleZ);
    //Set Position
    let posX = 0;
    let posY = 0.5;//spawnheight
    let posZ = -2;// negative distance
    let positionVec3 = new THREE.Vector3(posX, posY, posZ);
    //Set Rotation
    let rotX = -30; //Rotate upwards to the user
    let rotY = 0;
    let rotZ = 0;
    let rotationVec3 = new THREE.Vector3(rotX, rotY, rotZ);

    //List of default icons to show
    //Settings
    //Left Skip
    //Backwards
    //Stop
    //Play or Pause
    //Forwards
    //Right Skip
    //Close or Cancel

    //Initialize new buttons
    for (var i = 0; i < currentButtons.length; i++) {
        //Create button Entity
        let button = document.createElement('a-entity');
        button.classList.add("button");
        //Set Id
        button.setAttribute('id', currentButtons[i]);
        //Set Rotation
        let yDegree = i * ((degrees / currentButtons.length) * -1); //Divide degrees by total amount of buttons evenly
        let radianRotation = new THREE.Vector3(0, yDegree, 0);
        button.setAttribute('rotation', radianRotation);
        //Attach to parent entity
        buttonsUI.appendChild(button);

        //Set Default Icon Material
        let iconMaterial = {
            shader: "threeColorGradientShader",
            topColor: "#FFFFFF",
            middleColor: "#cc55d9",
            bottomColor: "#833c8b"};

        //Set Default Circle Geometry
        let clickGeometry = {
            primitive: "circle",
            radius: 2,
            segments: 12};
        //Set Default Circle Material
        let clickMaterial = {
            shader: "flat",
            color: "#e84db2",
            opacity: 0.25,
            side: "double"};

        if (currentButtons[i] === "settingsButton") {
            //Internal buttonParts for Setting Button
            for (var j = 0; j < 4; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                    //Settings Button Control Component
                    buttonPart.setAttribute('settingsbutton', {});
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #settings');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 3) {//Label Text
                    //Display as a-text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Settings");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } else if (currentButtons[i] === "leftSkipButton") {
            //Internal buttonParts for Left Skip Button
            for (var j = 0; j < 4; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #left_skip');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 3) {//Label Text
                    //Display as a-text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Left Skip");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } else if (currentButtons[i] === "backwardsButton") {
            //Internal buttonParts for Backwards Button
            for (var j = 0; j < 4; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #backward');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 3) {//Label Text
                    //Display Text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Backwards");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } else if (currentButtons[i] === "stopButton") {
            //Internal buttonParts for Stop Button
            for (var j = 0; j < 4; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #stop');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 3) {//Label Text
                    //Display Text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Stop");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } else if (currentButtons[i] === "playPauseButton") {
            //Internal buttonParts for Play Pause Button
            for (var j = 0; j < 5; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                    //Set Click Componenet
                    buttonPart.setAttribute('playpausebutton', {});
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #play');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //Set Class
                    buttonPart.classList.add("playButton", "buttonIcon");
                } else if (j === 3) {//alt id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #pause');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //Set Class
                    buttonPart.classList.add("pauseButton", "buttonIcon");
                    //Make invisible default for click function
                    buttonPart.setAttribute('visible', false);
                } else if (j === 4) {//Label Text
                    //Display Text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Play");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } else if (currentButtons[i] === "forwardButton") {
            //Internal buttonParts for Forward Button
            for (var j = 0; j < 4; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #forward');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 3) {//Label Text
                    //Display Text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Forward");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } else if (currentButtons[i] === "rightSkipButton") {
            //Internal buttonParts for Right Skip Button
            for (var j = 0; j < 4; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #right_skip');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                }else if (j === 3) {//Label Text
                    //Display Text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Right Skip");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } else if (currentButtons[i] === "cancelButton") {
            //Internal buttonParts for Cancel Button
            for (var j = 0; j < 4; j++) {
                //Create button Entity
                let buttonPart = document.createElement('a-entity');
                //Set Properties
                buttonPart.setAttribute('scale', scaleVec3);
                buttonPart.setAttribute('position', positionVec3);
                buttonPart.setAttribute('rotation', rotationVec3);
                //Set Id
                buttonPart.setAttribute('id', "buttonPart" + j);

                if (j === 0) {//clickable button background
                    //Set Geometry
                    buttonPart.setAttribute('geometry', clickGeometry);
                    //Set Material
                    buttonPart.setAttribute('material', clickMaterial);
                    //Set Class
                    buttonPart.classList.add("clickable", "buttonBackground");
                } else if (j === 1) {//border icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #border');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 2) {//id icon
                    //Obj Model
                    buttonPart.setAttribute('obj-model', 'obj: #cancel');
                    //Set Material
                    buttonPart.setAttribute('material', iconMaterial);
                    //buttonIcon Class
                    buttonPart.classList.add("buttonIcon");
                } else if (j === 3) {//Label Text
                    //Display Text
                    buttonPart = document.createElement('a-text');
                    //Set Text
                    buttonPart.setAttribute('value', "Cancel");
                    buttonPart.setAttribute('color', '#e84db2');
                    buttonPart.setAttribute('align', 'center');
                    buttonPart.setAttribute('width', '2.5');
                    buttonPart.setAttribute('opacity', '0.5');
                    buttonPart.setAttribute('font', 'sourcecodepro');
                    //Set Position Offset
                    let newPosY = 0.24;
                    let newPosZ = -1.825;
                    let newPositionVec3 = new THREE.Vector3(posX, newPosY, newPosZ);
                    buttonPart.setAttribute('position', newPositionVec3);
                    //Reset Rotation Offset
                    buttonPart.setAttribute('rotation', rotationVec3);
                    //buttonIcon Class
                    buttonPart.classList.add("iconText");
                }//buttonPart Loop
                //Attach to parent entity
                button.appendChild(buttonPart);
            }//button Loop Settings
        } 

    }//Particles Loop
}//Button Spawn Function

    }//Init End
});//Button Spawn Component
//
//Play Pause Button Click Function
AFRAME.registerComponent('playpausebutton',{
    init: function(){
        //This Element
        let button = this.el;
        //UI button
        let play = document.querySelector('.playButton');
        let pause = document.querySelector('.pauseButton');
        //Toggle value initialization
        let toggle = true;

        //Listen for Click to change teleportType
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            if (toggle) {
                //Toggle to Pause after click
                play.setAttribute('visible', false);
                pause.setAttribute('visible', true);
                toggle = false;
            } else {
                //Toggle to Pause after click
                play.setAttribute('visible', true);
                pause.setAttribute('visible', false);
                toggle = true;
            }
        });
    }
});
//
//Settings Button Click Function
AFRAME.registerComponent('settingsbutton',{
    init: function(){
        //This Element
        let button = this.el;
        //UI Background
        let settingsWindow = document.querySelector('#settingsWindow');
        //Toggle value initialization
        let toggle = true;

        //Collection of theme button
        let allThemeButtons = document.querySelectorAll('.themeButton');

        //Listen for Click to change teleportType
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            if (toggle) {
                //Toggle to Pause after click
                settingsWindow.setAttribute('visible', true);
                toggle = false;
                //Make all theme buttons clickable
                for (let i = 0; i < allThemeButtons.length; i++){
                    allThemeButtons[i].classList.toggle('clickable');
                }
            } else {
                //Toggle to Pause after click
                settingsWindow.setAttribute('visible', false);
                toggle = true;
                //Make all theme selection buttons unclickable
                for (let i = 0; i < allThemeButtons.length; i++){
                    allThemeButtons[i].classList.toggle('clickable');
                }
            }
        });
    }
});
//
//Scene
//
//Enivornment spawn on scene change
AFRAME.registerComponent('scenespawner', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},
    init: function () {
        //Do something when component first attached.
        var sceneEl = document.querySelector('a-scene'); 
        //let element = this.el;
        var user = document.querySelector('#userView');
        //Prevent large assets from spawning right next to user's spawn point 0,0
        let userSpawnPreventArea = 6;
        //All particles array
        let allParticles = [];
        //Particle Generation
        //function(ParticlesAmount, ParticlesRadius, TimeScale)
        //
        //Create pond & lily particles
        pondLilyParticles(5, 30, 0);
        //
        //Create grass particles
        grassParticles(30, 120, 2);
        //
        //Create tree particles
        treeParticles(18, 120, 0);
        //
        //Create rock particles
        rockParticles(10, 120, 0);
        //
        //Create firefly particles
        fireflyParticles(8, 120, 0);
        //
        //Create flower particles
        flowerParticles(22, 120, 0);
        //
        //Create flower particles
        cloudParticles(8, 400, 0);
        //

//Grass Particles
function grassParticles(particlesAmount, spawnRadius, TimeScale) {
    //Create parent identity w/ id
    let grassParent = document.createElement('a-entity');
    grassParent.setAttribute('id','grassParent');
    //Append parent entity to scene
    sceneEl.appendChild(grassParent);
    //How many grass patches to create
    //particlesAmount
    //Minimum distance for spawning
    let spawnDistance = 1;
    //Grass area to spawn
    //spawnRadius
    let spawnArea = spawnRadius/2.5;
    let spawnHeight = -0.5;
    //Time Scale for built in anim
    //let playScale = 4; // Fast
    let playScale = TimeScale;//Function Argument
    //Initialize new particles
    for (var i = 0; i < particlesAmount; i++) {
        //Create grass Entity
        let grass = document.createElement('a-entity');
        //GLTF Model
        grass.setAttribute('gltf-model', '#purplegrass');
        grass.classList.add("grass");
        //Random Time Scale
        let randomPlayScale = Math.random() * playScale + playScale/2;
        grass.setAttribute('animation-mixer', {timeScale: randomPlayScale});
        //Random Delay
        let randomDelay = (Math.random() * 4) * 1000;
        //Random Scale from 1 - 1.5
        let scaleX = Math.random() * 0.5 + 0.5;
        let scaleY = Math.random() * 0.5 + 0.5;
        let scaleZ = Math.random() * 0.5 + 0.5;
        grass.setAttribute('scale', {x: scaleX, y: scaleY, z: scaleZ});
        //Random Rotation of Y
        grass.setAttribute('rotation', {x: 0, y: Math.random() * 360, z: 0});
        //Random Position anywhere within spawnRadius around user
        let posX = Math.random() * spawnRadius - spawnArea;
        let posY = spawnHeight;
        let posZ = Math.random() * spawnRadius - spawnArea;
        //Set Position
        let positionVec3 = new THREE.Vector3(posX, posY, posZ);
        grass.setAttribute('position', positionVec3);
        //After setting initial position, loop through all previous entities position and ensure it is a minimum distance away.
        checkAllParticles: while (true) {
        for(let z=0; z < allParticles.length; z++) {
            //Check the distance, if too close, change and repeat
            if(distance(positionVec3.x, positionVec3.z, allParticles[z].position.x, allParticles[z].position.z) < allParticles[z].spawnDistance || distance(positionVec3.x,positionVec3.z,0,0) < userSpawnPreventArea) {
                posX = Math.random() * spawnRadius - spawnArea;
                posY = positionVec3.y;
                posZ = Math.random() * spawnRadius - spawnArea;
                positionVec3 = new THREE.Vector3(posX, posY, posZ);
                continue checkAllParticles;//Restart checkAllParticles loop
            } else {//The distance is good, exit the loop and set entity position
                grass.setAttribute('position', positionVec3);
            }//If distance check
        }//Previous entities array loop
        break;
        }
        //Grass spawn anim properties
        let scaleParams = {
            property: 'scale',
            from: '0.01 0.01 0.01',
            to: {x: scaleX, y: scaleY, z: scaleZ},
            dur: 3000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeInSine',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        grass.setAttribute('animation__spawnscale', scaleParams);
        //Create a new object for the completed entity
        let grassObject = {entity: grass, position: positionVec3, spawnDistance: spawnDistance};
        //Append to allParticles
        allParticles.push(grassObject);
        //Attach to scene with a random delay
        var spawnTimeout = setTimeout(function () {
            //Attach to parent entity
            grassParent.appendChild(grass);
        }, randomDelay); //Delay
    }//Particles Loop
}//grassParticles Function

//Tree Particles
function treeParticles(particlesAmount, spawnRadius, TimeScale) {
    //Create parent identity w/ id
    let treeParent = document.createElement('a-entity');
    treeParent.setAttribute('id','treeParent');
    //Append parent entity to scene
    sceneEl.appendChild(treeParent);
    //How many trees to create
    //particlesAmount
    //Minimum distance for spawning
    let spawnDistance = 8;
    //Tree area to spawn
    //spawnRadius
    let spawnArea = spawnRadius/2.5;
    let spawnHeight = -0.5;
    //Time Scale for built in anim
    //let playScale = 4; // Fast - No anim for trees yet
    let playScale = TimeScale;//Function Argument
    //Initialize new particles
    for (var i = 0; i < particlesAmount; i++) {
        //Create tree Entity
        let tree = document.createElement('a-entity');
        //GLTF Model
        tree.setAttribute('gltf-model', '#tree6');
        tree.classList.add("tree");
        //Random Delay
        let randomDelay = (Math.random() * 4) * 1000;
        //Random Scale from 1 - 1.5
        let scaleX = Math.random() * 0.5 + 0.5;
        let scaleY = Math.random() * 0.5 + 0.5;
        let scaleZ = Math.random() * 0.5 + 0.5;
        tree.setAttribute('scale', {x: scaleX, y: scaleY, z: scaleZ});
        //Random Rotation of Y
        tree.setAttribute('rotation', {x: 0, y: Math.random() * 360, z: 0});
        //Random Position anywhere within spawnRadius around user
        let posX = Math.random() * spawnRadius - spawnArea;
        let posY = spawnHeight;
        let posZ = Math.random() * spawnRadius - spawnArea;
        //Set Position
        let positionVec3 = new THREE.Vector3(posX, posY, posZ);
        tree.setAttribute('position', positionVec3);
        //After setting initial position, loop through all previous entities position and ensure it is a minimum distance away.
        checkAllParticles: while (true) {
        for(let z=0; z < allParticles.length; z++) {
            //Check the distance, if too close, change and repeat
            if(distance(positionVec3.x, positionVec3.z, allParticles[z].position.x, allParticles[z].position.z) < allParticles[z].spawnDistance || distance(positionVec3.x,positionVec3.z,0,0) < userSpawnPreventArea) {
                posX = Math.random() * spawnRadius - spawnArea;
                posY = positionVec3.y;
                posZ = Math.random() * spawnRadius - spawnArea;
                positionVec3 = new THREE.Vector3(posX, posY, posZ);
                continue checkAllParticles;//Restart checkAllParticles loop
            } else {//The distance is good, exit the loop and set entity position
                tree.setAttribute('position', positionVec3);
            }//If distance check
        }//Previous entities array loop
        break;
        }
        //Tree spawn anim properties
        let scaleParams = {
            property: 'scale',
            from: '0.01 0.01 0.01',
            to: {x: scaleX, y: scaleY, z: scaleZ},
            dur: 5000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        tree.setAttribute('animation__spawnscale', scaleParams);
        //Tree sway 1 anim properties
        let swayParams1 = {
            property: 'object3D.rotation.z',
            from: '-2',
            to: '2',
            dur: 6000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutBack',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        tree.setAttribute('animation__sway1', swayParams1);
        //Tree sway 2 anim properties
        let swayParams2 = {
            property: 'object3D.rotation.x',
            from: '1',
            to: '-1',
            dur: 4000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutBack',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        tree.setAttribute('animation__sway2', swayParams2);
        //Create a new object for the completed entity
        let treeObject = {entity: tree, position: positionVec3, spawnDistance: spawnDistance};
        //Append to allParticles
        allParticles.push(treeObject);
        //Attach to scene with a random delay
        var spawnTimeout = setTimeout(function () {
            //Attach to scene or parent
            treeParent.appendChild(tree);
        }, randomDelay); //Delay
    }//Particles loop
}//treeParticles Function

//Rock Particles
function rockParticles(particlesAmount, spawnRadius, TimeScale) {
    //Create parent identity w/ id
    let rockParent = document.createElement('a-entity');
    rockParent.setAttribute('id','rockParent');
    //Append parent entity to scene
    sceneEl.appendChild(rockParent);
    //How many rocks to create
    //particlesAmount
    //Minimum distance for spawning
    let spawnDistance = 4;
    //Tree area to spawn
    //spawnRadius
    let spawnArea = spawnRadius/2.5;
    //Time Scale for built in anim
    //let playScale = 4; // Fast - No anim for rock yet
    let playScale = TimeScale;//Function Argument
    //Initialize new particles
    for (var i = 0; i < particlesAmount; i++) {
        //Create rock Entity
        let rock = document.createElement('a-entity');
        //Randomize radius from 0.5 - 1.5
        let randomRadius = Math.random() * 0.75 + 0.25;
        //Randomize detail from 0-3
        let randomDetail = Math.floor(Math.random() * 3);
        //Set primitive shape
        rock.setAttribute('geometry', {primitive: 'icosahedron', radius: randomRadius, detail: randomDetail});
        //randomize color and or use gradient shader
        if(i % 5 === 0){
            rock.setAttribute('material', {color: '#766d6b'});
        } else if (i % 4 === 0) {
            rock.setAttribute('material', {color: '#4d4746'});
        } else if (i % 3 === 0) {
            rock.setAttribute('material', {color: '#a2796c'});
        }else {
            rock.setAttribute('material', {color: '#9b8983'});
        }
        rock.classList.add("rock");
        //Random Delay
        let randomDelay = (Math.random() * 8 + 3) * 1000;
        //Random Scale
        let scaleX = Math.random() * 1 + 0.5;
        let scaleY = Math.random() * 1 + 0.5;
        let scaleZ = Math.random() * 1 + 0.5;
        rock.setAttribute('scale', {x: scaleX, y: scaleY, z: scaleZ});
        //Random Rotation of XYZ
        rock.setAttribute('rotation', {x: Math.random() * 360, y: Math.random() * 360, z: Math.random() * 360});
        //Random Position anywhere within spawnRadius around user
        let posX = Math.random() * spawnRadius - spawnArea;
        let posY = Math.random() * 0.75 - 0.65;
        let posZ = Math.random() * spawnRadius - spawnArea;
        //Set Position
        let positionVec3 = new THREE.Vector3(posX, posY, posZ);
        rock.setAttribute('position', positionVec3);
        //After setting initial position, loop through all previous entities position and ensure it is a minimum distance away.
        checkAllParticles: while (true) {
        for(let z=0; z < allParticles.length; z++) {
            //Check the distance, if too close, change and repeat
            if(distance(positionVec3.x, positionVec3.z, allParticles[z].position.x, allParticles[z].position.z) < allParticles[z].spawnDistance || distance(positionVec3.x,positionVec3.z,0,0) < userSpawnPreventArea) {
                posX = Math.random() * spawnRadius - spawnArea;
                posY = positionVec3.y;
                posZ = Math.random() * spawnRadius - spawnArea;
                positionVec3 = new THREE.Vector3(posX, posY, posZ);
                continue checkAllParticles;//Restart checkAllParticles loop
            } else {//The distance is good, exit the loop and set entity position
                rock.setAttribute('position', positionVec3);
            }//If distance check
        }//Previous entities array loop
        break;
        }
        //Rock spawn anim properties
        let scaleParams = {
            property: 'scale',
            from: '0.01 0.01 0.01',
            to: {x: scaleX, y: scaleY, z: scaleZ},
            dur: 6000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        rock.setAttribute('animation__spawnscale', scaleParams);
        //Create a new object for the completed entity
        let rockObject = {entity: rock, position: positionVec3, spawnDistance: spawnDistance};
        //Append to allParticles
        allParticles.push(rockObject);
        //Attach to scene with a random delay
        var spawnTimeout = setTimeout(function () {
            //Attach to scene or parent
            rockParent.appendChild(rock);
        }, randomDelay); //Delay
    }//Particles loop
}//rockParticles Function

//Firefly Particles
function fireflyParticles(particlesAmount, spawnRadius, TimeScale) {
    //Create parent identity w/ id
    let fireflyParent = document.createElement('a-entity');
    fireflyParent.setAttribute('id','fireflyParent');
    //Append parent entity to scene
    sceneEl.appendChild(fireflyParent);
    //Firefly Pos array
    let fireflyPos = [];
    //How many firefly to create
    //particlesAmount
    //Minimum distance for spawning
    let spawnDistance = 8;
    //Tree area to spawn
    //spawnRadius
    let spawnArea = spawnRadius/2.5;
    //Time Scale for built in anim
    //let playScale = 4; // Fast - No anim for firefly yet
    let playScale = TimeScale;//Function Argument
    //Initialize new particles
    for (var i = 0; i < particlesAmount; i++) {
        //Create rock Entity
        let firefly = document.createElement('a-entity');
        //Randomize radius
        let randomRadius = Math.random() * 0.1 + 0.05;
        //Set primitive shape
        firefly.setAttribute('geometry', {primitive: 'dodecahedron', radius: randomRadius, detail: 1});
        //randomize color and or use gradient shader
        if(i % 5 === 0){
            firefly.setAttribute('material', {color: '#965b15', shader: 'standard', emissive: '#965b15', emissiveIntensity: 0.82});
        } else if (i % 4 === 0) {
            firefly.setAttribute('material', {color: '#adb734', shader: 'standard', emissive: '#adb734', emissiveIntensity: 0.82});
        } else if (i % 3 === 0) {
            firefly.setAttribute('material', {color: '#6e167e', shader: 'standard', emissive: '#6e167e', emissiveIntensity: 0.82});
        }else {
            firefly.setAttribute('material', {color: '#7e1a16', shader: 'standard', emissive: '#7e1a16', emissiveIntensity: 0.82});
        }
        firefly.classList.add("firefly");
        //Random Delay
        let randomDelay = (Math.random() * 10) * 1000;
        //Random Scale
        let scaleX = Math.random() * 0.25 + 0.75;
        let scaleY = Math.random() * 0.25 + 0.75;
        let scaleZ = Math.random() * 0.25 + 0.75;
        firefly.setAttribute('scale', {x: scaleX, y: scaleY, z: scaleZ});
        //Random Rotation of XYZ
        firefly.setAttribute('rotation', {x: 0, y: 0, z: 0});
        //Random Position anywhere within spawnRadius around user
        let posX = Math.random() * spawnRadius - spawnArea;
        let posY = Math.random() * 1.25 + 0.25;
        let posZ = Math.random() * spawnRadius - spawnArea;
        //Set Position
        let positionVec3 = new THREE.Vector3(posX, posY, posZ);
        firefly.setAttribute('position', positionVec3);
        //Create random To position, X diff is 20, Y diff is 3, Z diff is 10
        let posToX;
        let posToY = posY + 3;
        let posToZ;
        let randomNum = Math.random() * 2 -1;
        if (randomNum > 0) {
            posToX = posX + 20;
        } else {
            posToX = posX - 20;
        }
        randomNum = Math.random() * 2 -1;
        if (randomNum > 0) {
        posToZ = posZ + 10;
        } else {
        posToZ = posZ - 10;
        }
        //for these object, checking distance for all other should not be needed, check only other fireflys
        checkAllParticles: while (true) {
        for(let z=0; z < fireflyPos.length; z++) {
            //Check the distance, if too close, change and repeat
            if(distance(positionVec3.x, positionVec3.z, fireflyPos[z].x, fireflyPos[z].z) < spawnDistance || distance(positionVec3.x,positionVec3.z,0,0) < userSpawnPreventArea) {
                posX = Math.random() * spawnRadius - spawnArea;
                posY = positionVec3.y;
                posZ = Math.random() * spawnRadius - spawnArea;
                positionVec3 = new THREE.Vector3(posX, posY, posZ);
                continue checkAllParticles;//Restart checkAllParticles loop
            } else {//The distance is good, exit the loop and set entity position
                firefly.setAttribute('position', positionVec3);
            }//If distance check
        }//Previous entities array loop
        break;
        }
        //Firefly spawn anim properties
        let scaleParams = {
            property: 'scale',
            from: '0.01 0.01 0.01',
            to: {x: scaleX, y: scaleY, z: scaleZ},
            dur: 6000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        firefly.setAttribute('animation__spawnscale', scaleParams);
        //Firefly emissive anim properties
        let emissiveParams = {
            property: 'material.emissiveIntensity',
            from: '0.92',
            to: '0.22',
            dur: 4000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        firefly.setAttribute('animation__emissiveflux', emissiveParams);
        //Firefly movement 1 anim properties
        let move1 = {
            property: 'object3D.position.x',
            from: posX,
            to: posToX,
            dur: 80000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        firefly.setAttribute('animation__move1', move1);
        //Firefly movement 2 anim properties
        let move2 = {
            property: 'object3D.position.y',
            from: posY,
            to: posToY,
            dur: 8000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        firefly.setAttribute('animation__move2', move2);
        //Firefly movement 3 anim properties
        let move3 = {
            property: 'object3D.position.z',
            from: posZ,
            to: posToZ,
            dur: 80000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        firefly.setAttribute('animation__move3', move3);
        //Instead of using allParticles, create it's own array to check spawn point
        fireflyPos.push(positionVec3);
        //Attach to scene with a random delay
        var spawnTimeout = setTimeout(function () {
            //Attach to scene or parent
            fireflyParent.appendChild(firefly);
        }, randomDelay); //Delay
    }//Particles loop
}//fireflyParticles Function

//Flower Particles
function flowerParticles(particlesAmount, spawnRadius, TimeScale) {
    //Create parent identity w/ id
    let flowerParent = document.createElement('a-entity');
    flowerParent.setAttribute('id','flowerParent');
    //Append parent entity to scene
    sceneEl.appendChild(flowerParent);
    //How many flowers to create
    //particlesAmount
    //Minimum distance for spawning
    let spawnDistance = 4;
    //Flower area to spawn
    //spawnRadius
    let spawnArea = spawnRadius/2.5;
    let spawnHeight = -0.5;
    let playScale = TimeScale;//Function Argument
    //Initialize new particles
    for (var i = 0; i < particlesAmount; i++) {
        //Create tree Entity
        let flower = document.createElement('a-entity');
        //GLTF Model
        flower.setAttribute('gltf-model', '#flower1');
        flower.classList.add("flower");
        //Random Delay
        let randomDelay = (Math.random() * 4) * 1000;
        //Random Scale from 1 - 1.5
        let scaleX = Math.random() * 1 + 6;
        let scaleY = Math.random() * 1 + 4;
        let scaleZ = Math.random() * 1 + 6;
        flower.setAttribute('scale', {x: scaleX, y: scaleY, z: scaleZ});
        //Random Rotation of Y
        flower.setAttribute('rotation', {x: 0, y: Math.random() * 360, z: 0});
        //Random Position anywhere within spawnRadius around user
        let posX = Math.random() * spawnRadius - spawnArea;
        let posY = spawnHeight;
        let posZ = Math.random() * spawnRadius - spawnArea;
        //Set Position
        let positionVec3 = new THREE.Vector3(posX, posY, posZ);
        flower.setAttribute('position', positionVec3);
        //After setting initial position, loop through all previous entities position and ensure it is a minimum distance away.
        checkAllParticles: while (true) {
        for(let z=0; z < allParticles.length; z++) {
            //Check the distance, if too close, change and repeat
            if(distance(positionVec3.x, positionVec3.z, allParticles[z].position.x, allParticles[z].position.z) < allParticles[z].spawnDistance || distance(positionVec3.x,positionVec3.z,0,0) < userSpawnPreventArea) {
                posX = Math.random() * spawnRadius - spawnArea;
                posY = positionVec3.y;
                posZ = Math.random() * spawnRadius - spawnArea;
                positionVec3 = new THREE.Vector3(posX, posY, posZ);
                continue checkAllParticles;//Restart checkAllParticles loop
            } else {//The distance is good, exit the loop and set entity position
                flower.setAttribute('position', positionVec3);
            }//If distance check
        }//Previous entities array loop
        break;
        }
        //Flower spawn anim properties
        let scaleParams = {
            property: 'scale',
            from: '0.01 0.01 0.01',
            to: {x: scaleX, y: scaleY, z: scaleZ},
            dur: 5000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        flower.setAttribute('animation__spawnscale', scaleParams);
        //Flower sway 1 anim properties
        let swayParams1 = {
            property: 'object3D.rotation.z',
            from: '-1.5',
            to: '1.5',
            dur: 2000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutBack',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        flower.setAttribute('animation__sway1', swayParams1);
        //Flower sway 2 anim properties
        let swayParams2 = {
            property: 'object3D.rotation.x',
            from: '3',
            to: '-3',
            dur: 4000,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutBack',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        flower.setAttribute('animation__sway2', swayParams2);
        //Create a new object for the completed entity
        let flowerObject = {entity: flower, position: positionVec3, spawnDistance: spawnDistance};
        //Append to allParticles
        allParticles.push(flowerObject);
        //Attach to scene with a random delay
        var spawnTimeout = setTimeout(function () {
            //Attach to scene or parent
            flowerParent.appendChild(flower);
        }, randomDelay); //Delay
    }//Particles loop
}//flowerParticles Function

//Pond and Lily Particles
function pondLilyParticles(particlesAmount, spawnRadius, TimeScale) {
    //Only make 1 pond per function
    //Minimum distance for spawning other entities
    let spawnDistance = 7;
    let spawnHeight = -0.5;
    //Create parent identity w/ id
    let pond = document.createElement('a-entity');
    pond.setAttribute('id','pond');
    //Set primitive shape
    let pondRadius = 7;
    pond.setAttribute('geometry', {primitive: 'circle', radius: pondRadius, segments: 64});
    //Set material
    pond.setAttribute('material', {color: '#55a5be', opacity: '0.75', metalness: '0', roughness: '1'});
    //Set rotation
    pond.setAttribute('rotation', {x: -90, y: 0, z: 0});
    //Set Position
    let posX;
    let posY = spawnHeight;
    let posZ;
    //Set 1 of 4 spots around user
    let randomNum = Math.floor(Math.random() * 4);
    if (randomNum === 0) {
    posX = -12;
    posZ = 3;
    } else if (randomNum === 1){
    posX = 12;
    posZ = -3;
    } else if (randomNum === 2){
    posX = -17;
    posZ = -7;
    } else if (randomNum === 3){
    posX = 17;
    posZ = 7;
    } else {
    posX = -10;
    posZ = 10;
    }
    //Set Position
    let positionVec3 = new THREE.Vector3(posX, posY, posZ);
    pond.setAttribute('position', positionVec3);
    //Pond spawn anim properties
    let pondScaleParams = {
        property: 'scale',
        from: '0.01 0.01 0.01',
        to: {x: 1, y: 1, z: 1},
        dur: 5000,
        delay: 0,
        loop: 'false',
        dir: 'normal',
        easing:'easeInOutElastic',
        elasticity: 400,
        autoplay: 'true',//false
        enabled: 'true',
        //startEvents: 'spawn',
        };
    //Attach Anim to Element
    pond.setAttribute('animation__spawnscale', pondScaleParams);
    //Append parent entity to scene
    sceneEl.appendChild(pond);
    //Create a new object for the pond to be position checked on other entity's
    let pondObject = {entity: pond, position: positionVec3, spawnDistance: spawnDistance};
    //Append to allParticles
    allParticles.push(pondObject);
    //How many lilys to create
    //particlesAmount
    //Minimum distance for spawning
    let lilySpawnDistance = 1;
    //Lily area to spawn
    let lilySpawnRadius = pondRadius/2;
    let lilySpawnArea = lilySpawnRadius/2;
    let lilySpawnHeight = 0.05;
    //Initialize new particles
    for (var i = 0; i < particlesAmount; i++) {
        //Create tree Entity
        let lily = document.createElement('a-entity');
        //Set primitive shape
        lily.setAttribute('geometry', {primitive: 'circle', radius: 0.5, segments: 8, thetaStart: 0, thetaLength: 270});
        //Set material
        lily.setAttribute('material', {color: '#0f5334', opacity: '0.75', metalness: '0', roughness: '1'});
        lily.classList.add("lily");
        //Random duration for anim
        let randomDur = (Math.random() * 6) * 1000;
        //Random Delay
        let randomDelay = (Math.random() * 2) * 1000;
        lily.setAttribute('scale', {x: 1, y: 1, z: 1});
        //Random Rotation of Z
        let rotationZ = Math.random() * 360;
        lily.setAttribute('rotation', {x: 0, y: 0, z: rotationZ});
        //Set 1 of 5 positions within the pond
        let lilyPosX;
        let lilyPosY;
        let lilyPosZ = lilySpawnHeight;
        if (i === 0) {
            lilyPosX = -3;
            lilyPosY = -3;
        } else if (i === 1) {
            lilyPosX = -3;
            lilyPosY = 3;
        } else if (i === 2) {
            lilyPosX = 3;
            lilyPosY = -3;
        } else if (i === 3) {
            lilyPosX = 3;
            lilyPosY = 3;
        } else {
            lilyPosX = 0;
            lilyPosY = 0;
        }
        //Set Position
        let lilyPositionVec3 = new THREE.Vector3(lilyPosX, lilyPosY, lilyPosZ)
        lily.setAttribute('position', lilyPositionVec3);
        //Lily spawn anim properties
        let scaleParams = {
            property: 'scale',
            from: '0.01 0.01 0.01',
            to: {x: 1, y: 1, z: 1},
            dur: 5000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        lily.setAttribute('animation__spawnscale', scaleParams);
        //Lily sway 1 anim properties
        let swayParams1 = {
            property: 'object3D.position.x',
            from: lilyPosX,
            to: lilyPosX + 0.5,
            dur: 8000 + randomDur,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutCirc',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        lily.setAttribute('animation__sway1', swayParams1);
        //Lily sway 2 anim properties
        let swayParams2 = {
            property: 'object3D.position.y',
            from: lilyPosY,
            to: lilyPosY + 0.25,
            dur: 4000 + randomDur,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'easeInOutCirc',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        lily.setAttribute('animation__sway2', swayParams2);
        //Lily rotation anim properties
        let rotationParams = {
            property: 'object3D.rotation.z',
            from: rotationZ,
            to: rotationZ + 360,
            dur: 32000 + randomDur,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        lily.setAttribute('animation__rotationZ', rotationParams);
        //Add a secret to first lily created
        if(i === 0){
            lily.setAttribute('secret-Button');
            lily.classList.add('clickable');
        }
        //Attach to pond with a random delay
        var spawnTimeout = setTimeout(function () {
            //Attach to scene or parent
            pond.appendChild(lily);
        }, randomDelay); //Delay
    }//Particles loop
}//pondLilyParticles Function

//Cloud Particles
function cloudParticles(particlesAmount, spawnRadius, TimeScale) {
    //Create parent identity w/ id
    let cloudParent = document.createElement('a-entity');
    cloudParent.setAttribute('id','cloudParent');
    //Append parent entity to scene
    sceneEl.appendChild(cloudParent);
    //How many cloud to create
    //particlesAmount
    //Minimum distance for spawning
    let spawnDistance = 50;
    //Cloud area to spawn
    //spawnRadius
    let spawnArea = spawnRadius/2.5;
    let spawnHeight = 100;
    //Initialize new particles
    for (var i = 0; i < particlesAmount; i++) {
        //Create cloud Entity
        let cloud = document.createElement('a-entity');
        //GLTF Model
        cloud.setAttribute('gltf-model', '#cloud');
        cloud.classList.add("cloud");
        //Random Duration
        let randomDuration = (Math.random() * 25) * 1000;
        //Random Delay
        let randomDelay = (Math.random() * 4) * 1000;
        //Random Scale from 1 - 1.5
        let scaleX = Math.random() * 2 + 2;
        let scaleY = Math.random() * 2 + 2;
        let scaleZ = Math.random() * 2 + 2;
        cloud.setAttribute('scale', {x: scaleX, y: scaleY, z: scaleZ});
        //Random Rotation
        let rotationX = Math.random() * 360;
        let rotationY = Math.random() * 360;
        let rotationZ = Math.random() * 360;
        cloud.setAttribute('rotation', {x: rotationX, y: rotationY, z: rotationZ});
        //Set various positions
        let posX;
        let posY = spawnHeight;
        let posZ;
        if (i === 0) {
        posX = -240;
        posZ = 25;
        } else if (i === 1) {
        posX = -345;
        posZ = -150;
        } else if (i === 2) {
        posX = -200;
        posZ = -80;
        } else if (i === 3) {
        posX = -15;
        posZ = -350;
        } else if (i === 4) {
        posX = -250;
        posZ = -250;
        } else if (i === 5) {
        posX = -100;
        posZ = -275;
        } else if (i === 6) {
        posX = -350;
        posZ = 50;
        } else {
        posX = 140;
        posZ = -320;
        }
        //Set Position
        let positionVec3 = new THREE.Vector3(posX, posY, posZ);
        cloud.setAttribute('position', positionVec3);
        //Cloud spawn anim properties
        let scaleParams = {
            property: 'scale',
            from: '0.01 0.01 0.01',
            to: {x: scaleX, y: scaleY, z: scaleZ},
            dur: 5000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        cloud.setAttribute('animation__spawnscale', scaleParams);
        //Cloud move 1 anim properties
        let move1 = {
            property: 'object3D.position.x',
            from: posX,
            to: posX + spawnRadius,
            dur: 192000 + randomDuration,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        cloud.setAttribute('animation__move1', move1);
        //Cloud move 2 anim properties
        let move2 = {
            property: 'object3D.position.y',
            from: posY,
            to: posY + 20,
            dur: 24000 + randomDuration,
            delay: 0,
            loop: 'true',
            dir: 'alternate',
            easing:'linear',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        cloud.setAttribute('animation__move2', move2);
        //Cloud move 3 anim properties
        let move3 = {
            property: 'object3D.position.z',
            from: posZ,
            to: posZ + spawnRadius,
            dur: 192000 + randomDuration,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        cloud.setAttribute('animation__move3', move3);
        //Cloud rotation anim properties
        let rotation = {
            property: 'rotation',
            from: {x: rotationX, y: rotationY, z: rotationZ},
            to: {x: rotationX + 360, y: rotationY + 360, z: rotationZ + 360},
            dur: 192000 + randomDuration,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'true',//false
            enabled: 'true',
            //startEvents: 'spawn',
            };
        //Attach Anim to Element
        cloud.setAttribute('animation__rotation', rotation);
        //Add a secret to first cloud created
        if(i === 0){
            cloud.setAttribute('secret-Button');
            cloud.classList.add('clickable');
        }
        //Attach to scene with a random delay
        var spawnTimeout = setTimeout(function () {
            //Attach to scene or parent
            cloudParent.appendChild(cloud);
        }, randomDelay); //Delay
    }//Particles loop
}//cloudParticles Function

//Function to calculate distance between two points
function distance(x1, y1, x2,  y2) {
    //Calculating distance
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
}
    }//init function
});//component
//
//Environment Spawning with Users - Grass,Tree
AFRAME.registerComponent('environmentspawnwithuser', {
//schema: {
//bar: {type: 'number'},
//baz: {type: 'string'}
//},
init: function () {
//Do something when component first attached.

//Throttle
this.throttledFunction = AFRAME.utils.throttle(this.respawning, 500, this);

//All Support
this.sceneEl = this.el;
//Respawn Support
this.camera = document.getElementById('userView');
this.player = document.getElementById('player');
this.vector = new THREE.Vector3();
this.positionNew = new THREE.Vector3();
this.positionPlayer = new THREE.Vector3();
this.angle;
this.spawnCheckDistance = 40;

this.allParticles = [];

//
//Environment Objects for Spawning

//Add all env Objects to this array
this.envAll = [];

//
//Object 1
//Grass gltf w/anim
var envObj1 = {
name: 'grass',
ready: [],
total: 69,
spawnDistance: 69,
spawnFreeSpace: 2,
spawnHeight: -1,
allObjs: [],
build: 'gltf',
src: '#purplegrass',
scaleRange: 0.5,
scaleMinX: 0.5,
scaleMinY: 0.75,
scaleMinZ: 0.5,
gltfAnim: true,
gltfPlayScale: 3,
anim: false,
animAll: [],
};
this.envAll.push(envObj1);

//
//Object 2
//Tree gltf
var envObj2 = {
name: 'tree',
ready: [],
total: 22,
spawnDistance: 69,
spawnFreeSpace: 8,
spawnHeight: -0.5,
allObjs: [],
build: 'gltf',
src: '#tree6',
scaleRange: 0.5,
scaleMinX: 1,
scaleMinY: 1,
scaleMinZ: 1,
gltfAnim: false,
gltfPlayScale: 0,
anim: true,
animAll: [
{
property: 'object3D.rotation.z',
from: '-1.5',
to: '1.5',
dur: 4000,
delay: 0,
loop: 'true',
dir: 'alternate',
easing:'easeInOutBack',
elasticity: 400,
autoplay: 'true',
enabled: 'true',
},
{
property: 'object3D.rotation.x',
from: '3',
to: '-3',
dur: 8000,
delay: 0,
loop: 'true',
dir: 'alternate',
easing:'easeInOutBack',
elasticity: 400,
autoplay: 'true',
enabled: 'true',
},
],
};
this.envAll.push(envObj2);

//
//Object 3
//Geometry Example w/anims and random color
var envObj3 = {
name: 'geo1',
ready: [],
total: 14,
spawnDistance: 80,
spawnFreeSpace: 10,
spawnHeight: 2,
allObjs: [],
build: 'geometry',
geometry: {primitive: 'box', width: '1', height: '0.5', depth: '0.1'},
altColors: ['red','orange','yellow','green', 'cyan', 'blue', 'violet'],
material: {shader: 'standard', opacity: '1', color: 'red', roughness: '0.25'},
scaleRange: 0.5,
scaleMinX: 1,
scaleMinY: 1,
scaleMinZ: 1,
gltfAnim: false,
gltfPlayScale: 0,
anim: true,
animAll: [
{
property: 'scale',
from: '1 1 1',
to: '0.25 7 0.25',
dur: 7000,
delay: 500,
loop: 'true',
dir: 'alternate',
easing:'easeInOutSine',
elasticity: 400,
autoplay: 'true',
enabled: 'true',
startEvents: 'respawn',
},
{
property: 'rotation',
from: '0 0 0',
to: '0 360 0',
dur: 30000,
delay: 0,
loop: 'true',
dir: 'linear',
easing:'easeInOutSine',
elasticity: 400,
autoplay: 'true',
enabled: 'true',
},
],

};
this.envAll.push(envObj3);


//
//Object 4
//Flower gltf w/aframe anims
var envObj4 = {
name: 'flower',
ready: [],
total: 42,
spawnDistance: 69,
spawnFreeSpace: 1,
spawnHeight: -0.5,
allObjs: [],
build: 'gltf',
src: '#flower1',
scaleRange: 0.75,
scaleMinX: 6,
scaleMinY: 3,
scaleMinZ: 6,
gltfAnim: false,
gltfPlayScale: 0,
anim: true,
animAll: [
{
property: 'object3D.rotation.z',
from: '-1.5',
to: '1.5',
dur: 2000,
delay: 0,
loop: 'true',
dir: 'alternate',
easing:'easeInOutBack',
elasticity: 400,
autoplay: 'true',
enabled: 'true',
},
{
property: 'object3D.rotation.x',
from: '3',
to: '-3',
dur: 4000,
delay: 0,
loop: 'true',
dir: 'alternate',
easing:'easeInOutBack',
elasticity: 400,
autoplay: 'true',
enabled: 'true',
},
],
};
this.envAll.push(envObj4);

//
//Object 5
//Geometry Example w/ Randomized Colors
var envObj5 = {
name: 'rocks',
ready: [],
total: 22,
spawnDistance: 100,
spawnFreeSpace: 6,
spawnHeight: -0.69,
allObjs: [],
build: 'geometry',
altGeometry: {radius: 1, detail: 4},
geometry: {primitive: 'icosahedron', radius: 0.25, detail: 0},
altColors: ['#6d534a', '#714334', '#a07f73', '#4a3a34'],
material: {shader: 'standard', opacity: '1', color: '#714334', roughness: '0.69'},
scaleRange: 0.5,
scaleMinX: 1,
scaleMinY: 1,
scaleMinZ: 1,
gltfAnim: false,
gltfPlayScale: 0,
anim: false,
animAll: [],
};
this.envAll.push(envObj5);



//Take an object defined in schema to be reproduced
//Gather the important component data to be added to new entities
//Use additional schema data and minor rng to randomize/customize
//
//entity.getAttribute('geometry').primitive;
// >> "box"
//(Math.random() * 4) * 1000
//
//Init Particles
//
//Loop through array to spawn each
for(let i = 0; i < this.envAll.length; i++){
	this.envParticleSpawn(this.envAll[i]);
	//console.log(this.envAll[i]);
}

},//init function


tick: function (time, timeDelta) {
	//Do something on every scene tick or frame.

	//Instead of interval, could use a listener for when the user moves to then check those things

//Only spawn when user is moving fast
if(moveBrake){} else if(moveTo || moveBack) {
		//Throttle
		this.throttledFunction();
	}

},

// Function to calculate distance between two points
distance: function(x1, y1, x2,  y2) {
//Calculating distance
return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
},

//Main Throttled function
respawning: function() {
	//Loop through array to respawn sets
	for(let i = 0; i < this.envAll.length; i++){
		this.envParticleRespawn(this.envAll[i]);
		//console.log(this.envAll[i]);
	}
},

//Spawning Function
envParticleSpawn: function (envObject) {

//Create particle Entity
let particleParent = document.createElement('a-entity');
particleParent.setAttribute('id',envObject.name);
this.sceneEl.appendChild(particleParent);

//Initialize particles
for (let i = 0; i < envObject.total; i++) {

//Ready to spawn
envObject.ready[i] = true;

let particle = document.createElement('a-entity');
particle.classList.add(envObject.name);

//Check Build
if(envObject.build === 'gltf'){
//GLTF Model
particle.setAttribute('gltf-model', envObject.src);
//If Anim exits, set Time Scale
if(envObject.gltfAnim){
//Randomize Time Scale Slightly
let randomPlayScale = Math.random() * envObject.gltfPlayScale + envObject.gltfPlayScale/2;
//Set Anim On and Speed
particle.setAttribute('animation-mixer', {timeScale: randomPlayScale});
}

} else if(envObject.build === 'geometry') {

//Draw Info
if(envObject.altGeometry){
envObject.geometry.radius = Math.random()*envObject.altGeometry.radius + envObject.altGeometry.radius/2;

envObject.geometry.detail = Math.floor(Math.random()*envObject.altGeometry.detail);
}
particle.setAttribute('geometry', envObject.geometry);

if(envObject.altColors){
envObject.material.color = envObject.altColors[Math.floor(Math.random()*envObject.altColors.length)];
}
particle.setAttribute('material', envObject.material);

}

//Random Scale
let scaleX = Math.random() * envObject.scaleRange + envObject.scaleMinX;
let scaleY = Math.random() * envObject.scaleRange + envObject.scaleMinY;
let scaleZ = Math.random() * envObject.scaleRange + envObject.scaleMinZ;
particle.setAttribute('scale', {x: scaleX, y: scaleY, z: scaleZ});


//Random Rotation 360
particle.setAttribute('rotation', {x: 0, y: Math.random() * 360, z: 0});

//Random Position anywhere within spawnDistance around user
let posX = Math.random() * envObject.spawnDistance - (envObject.spawnDistance/2);
let posY = envObject.spawnHeight;
let posZ = Math.random() * envObject.spawnDistance - (envObject.spawnDistance/2);
let positionVec3 = new THREE.Vector3(posX, posY, posZ);
particle.setAttribute('position', positionVec3);

//Particle respawn anim properties
let respawnScaleParams = {
	property: 'scale',
	from: '0.01 0.01 0.01',
	to: {x: scaleX, y: scaleY, z: scaleZ},
	dur: 500,
	delay: 0,
	loop: 'false',
	dir: 'normal',
	easing:'easeInSine',
	elasticity: 400,
	autoplay: 'false',
	enabled: 'true',
	startEvents: 'respawn',
	};
//Attach Anim to Element
particle.setAttribute('animation__spawnscale', respawnScaleParams);

//If A-Frame Animated
if(envObject.anim){
//Loop through all anims to add to entity
for(let h = 0; h < envObject.animAll.length; h++){
//Attach Anim to Element. 1st is Anim Name, 2nd is Properties
particle.setAttribute('animation__' + h, envObject.animAll[h]);
}
}


//Attach to all grass array for ref
envObject.allObjs[i] = particle;

//Attach for spawn recheck
let objInfo = {entity: particle, position: positionVec3, spawnFreeSpace: envObject.spawnFreeSpace};
this.allParticles.push(objInfo);

//Attach to parent
particleParent.appendChild(particle);

}//end particle loop

},//end envParticleSpawn

//
//Spawning Function
envParticleRespawn: function (envObject) {
console.log('envParticleRespawn');

this.vector = new THREE.Vector3();
this.positionNew = new THREE.Vector3();

//Get Camera Vec3
this.camera.object3D.getWorldDirection(this.vector);
this.positionPlayer.copy(this.player.object3D.position);
//Math out the Angle
//Degrees
//this.angle = Math.atan2(this.vector.x,this.vector.z) * 180 / Math.PI;
//Radians
this.angle = Math.atan2(this.vector.x,this.vector.z);
//check which quadrant the vector is in
if(this.angle > 0 && this.angle < Math.PI/2) {
this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.spawnCheckDistance);
this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.spawnCheckDistance);
//console.log('Q1');
} else if(this.angle > Math.PI/2 && this.angle < Math.PI) {
this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.spawnCheckDistance);
this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.spawnCheckDistance);
//console.log('Q2');
} else if(this.angle < 0 && this.angle > -Math.PI/2) {
this.angle += Math.PI;
this.positionNew.x = this.positionPlayer.x + (Math.sin(this.angle) * this.spawnCheckDistance);
this.positionNew.z = this.positionPlayer.z + (Math.cos(this.angle) * this.spawnCheckDistance);
//console.log('Q3');
} else if(this.angle < -Math.PI/2 && this.angle > -Math.PI) {
this.angle += (Math.PI * 2);
this.positionNew.x = this.positionPlayer.x - (Math.sin(this.angle) * this.spawnCheckDistance);
this.positionNew.z = this.positionPlayer.z - (Math.cos(this.angle) * this.spawnCheckDistance);
//console.log('Q4');
} else {
this.positionNew.x = this.positionPlayer.x;
this.positionNew.z = this.positionPlayer.z;
//console.log('Err0');
}


//Check Particles
for (var j = 0; j < envObject.total; j++){
//Check only if the grass is not in the middle of repsawning
if (envObject.ready[j]) {
	let currPart = envObject.allObjs[j];
	//console.log(currPart);
	let partPos = currPart.object3D.position;
	//Check distance between particle and distantCheckPoint
	if (this.distance(partPos.x, partPos.z, this.positionNew.x, this.positionNew.z) > envObject.spawnDistance) {
		//Start spawning, no longer ready
		envObject.ready[j] = false;

		//Define new Coords
		let newX = this.positionNew.x;
		let newZ = this.positionNew.z;
		let newVec3 = new THREE.Vector3();
		let ranNum = Math.floor(Math.random()*4);

		if(ranNum === 0){
			//+x+z
			newX += (Math.random() * envObject.spawnDistance/2);
			newZ += (Math.random() * envObject.spawnDistance/2);
		} else if(ranNum === 1){
			//+x-z
			newX += (Math.random() * envObject.spawnDistance/2);
			newZ += (Math.random() * envObject.spawnDistance/2) * -1;
		} else if(ranNum === 2){
			//-x+z
			newX += (Math.random() * envObject.spawnDistance/2) * -1;
			newZ += (Math.random() * envObject.spawnDistance/2);
		} else if(ranNum === 3){
			//-x-z
			newX += (Math.random() * envObject.spawnDistance/2) * -1;
			newZ += (Math.random() * envObject.spawnDistance/2) * -1;
		}

		//Apply new XZ position
		newVec3.x = newX;
		newVec3.y = envObject.spawnHeight;
		newVec3.z = newZ;
		currPart.object3D.position.copy(newVec3);

checkAllParticles: while (true) {
for(let z=0; z < this.allParticles.length; z++) {
	//Check the distance, if too close, change and repeat
	if(this.distance(currPart.x, currPart.z, this.allParticles[z].position.x, this.allParticles[z].position.z) < this.allParticles[z].spawnFreeSpace || this.distance(currPart.x,currPart.z,0,0) < 2.5){//userSpawnPreventArea 

		currPart.x = this.positionNew.x;
		currPart.z = this.positionNew.z;
		ranNum = Math.floor(Math.random()*4);

		if(ranNum === 0){
			//+x+z
			currPart.x += (Math.random() * envObject.spawnDistance/2);
			currPart.z += (Math.random() * envObject.spawnDistance/2);
		} else if(ranNum === 1){
			//+x-z
			currPart.x += (Math.random() * envObject.spawnDistance/2);
			currPart.z += (Math.random() * envObject.spawnDistance/2) * -1;
		} else if(ranNum === 2){
			//-x+z
			currPart.x += (Math.random() * envObject.spawnDistance/2) * -1;
			currPart.z += (Math.random() * envObject.spawnDistance/2);
		} else if(ranNum === 3){
			//-x-z
			currPart.x += (Math.random() * envObject.spawnDistance/2) * -1;
			currPart.z += (Math.random() * envObject.spawnDistance/2) * -1;
		}

		continue checkAllParticles;//Restart checkAllParticles loop
	} else {//The distance is good, exit the loop
	}//If distance check
}//Previous entities array loop
break;
}

		//Trigger Anim
		currPart.emit('respawn',{});

		//console.log(newVec3);
		//Reset to allow for repsawning
		envObject.ready[j] = true;
		//console.log(currPart);
	}//distance check
}//ready
}//Particles for loop

},//end spawning



});//end component
//
//Add Rain to the Scene
AFRAME.registerComponent('rain', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},
    init: function () {
        //Do something when component first attached.
        //Create Rain Entities
        var sceneEl = document.querySelector('a-scene'); 
        //Create rain Parent Entity to hold all
        var weather = document.createElement('a-entity');
        //Set element class
        weather.classList.add("weather");
        //Add Rain Elements to scene
        sceneEl.appendChild(weather);
        //Allow for selecting various particles sizes, and speed
        //How many particles to create
        var particlesAmount = 150;
        //Which particle to use
        var particleType = 'triangle'; //plane, triangle, etc...
        //How many particles to create
        var baseSize = 'large'; //small, normal, large
        //How fast animations should complete
        //Need to pass this variable to the raindrop component
        var particlesSpeed = 'normal'; //slow, normal, fast
        //Rain area to spawn
        let spawnRadius = 40;//40-100
        let spawnArea = spawnRadius/2;
        //Automosphere Height, Spawn Y Position
        let spawnHeight = 40;
        //Initialize Particles
        for (var i = 0; i < particlesAmount; i++) {
            //Create individual Entity for each particle
            let weatherEl = document.createElement('a-entity');
            //Create Entity to hold each rain drop and splash 
            var weatherElGroup = document.createElement('a-entity');
            //Set element class
            weather.classList.add("weatherElGroup");
            //Add group to main Weather Entity
            weather.appendChild(weatherElGroup);
            //Prep Size properties
            let sizeA;
            let sizeB;
            let sizeC;
            //Check Geometry Selection
            if (particleType === 'triangle') {
                //Triangle Sizes
                if (baseSize === 'small') {
                    sizeA = new THREE.Vector3(-0.015, -0.3, 0);
                    sizeB = new THREE.Vector3(0.015, -0.3, 0);
                    sizeC = new THREE.Vector3(0, 0, 0);
                } else if (baseSize === 'large') {
                    sizeA = new THREE.Vector3(-0.04, -0.55, 0);
                    sizeB = new THREE.Vector3(0.04, -0.55, 0);
                    sizeC = new THREE.Vector3(0, 0, 0);
                } else {//Normal
                    sizeA = new THREE.Vector3(-0.025, -0.4, 0);
                    sizeB = new THREE.Vector3(0.025, -0.4, 0);
                    sizeC = new THREE.Vector3(0, 0, 0);
                }
                //Triangle Version
                weatherEl.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeA, vertexB: sizeB, vertexC: sizeC});
            } else { //Defaults to Plane
                //Plane Sizes
                if (baseSize === 'small') {
                    sizeA = 0.025;
                    sizeB = 0.5;
                } else if (baseSize === 'large') {
                    sizeA = 0.035;
                    sizeB = 0.5;
                } else {//Normal
                    sizeA = 0.025;
                    sizeB = 0.4;
                }
                //Plane Version
                weatherEl.setAttribute('geometry', {primitive: 'plane', width: 0.025, height: 0.5});
            }
            //Set Element material - Rain/Water
            weatherEl.setAttribute('material', {color: '#55a5be', opacity: 0.75, metalness: 0, roughness: 1, side: 'double'});
            //Set Element random starting Position
            let posX = Math.random() * spawnRadius - spawnArea;
            let posY = spawnHeight;
            let posZ = Math.random() * spawnRadius - spawnArea;
            weatherEl.setAttribute('position', {x: posX, y: posY, z: posZ});
            //Set Element random Scale
            weatherEl.setAttribute('scale', {x: Math.random() * 1 + 0.5, y: Math.random() * 1 + 0.5, z: Math.random() * 1 + 0.5});
            //Test set look-at component
            weatherEl.setAttribute('look-at','#userView'); //double check
            //Set element class
            weatherEl.classList.add("weatherEl");
            //Attach raindrop Component for Anim | XZ Loop Change
            weatherEl.setAttribute('raindrop',{});
            //Splash
            //Generate a splash at floor level position
            let attachSplash = false;
            if ( i % 1 === 0 ){//Adjustable amount of splashes
                var weatherElSplash = document.createElement('a-entity');
                //Prep Size properties
                let sizeSplashA = new THREE.Vector3(-0.1, -0.1, 0);
                let sizeSplashB = new THREE.Vector3(0.1, -0.1, 0);
                let sizeSplashC = new THREE.Vector3(0, 0, 0);
                //Triangle Version
                weatherElSplash.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeSplashA, vertexB: sizeSplashB, vertexC: sizeSplashC});
                //Splash Material - Water
                weatherElSplash.setAttribute('material', {color: '#327186', opacity: 0.75, metalness: 0, roughness: 1, side: 'double'});
                //Splash
                weatherElSplash.setAttribute('rotation', '-90 0 0');
                //Turn element invisible to start
                weatherElSplash.setAttribute('visible', false);
                //Match rain positioning
                weatherElSplash.setAttribute('position', {x: posX, y: '0.05', z: posZ});
                //Set element class
                weatherElSplash.classList.add("weatherElSplash");
                //Attach raindropsplash Component
                //weatherElSplash.setAttribute('raindropsplash', {});
                //Test change visibility in the raindrop component
                attachSplash = true;
            }
            //Add rain Elements to weather wrap Entity
            weatherElGroup.appendChild(weatherEl);
            //Add splash Elements to weather Entity
            if (attachSplash) {
                weatherElGroup.appendChild(weatherElSplash);
            }
        }
    }//End initialization Function
});//rain component
//
//Rain Drop Animations
//Splash display does seem to line up perfectly for every el regardless of offsets
AFRAME.registerComponent('raindrop', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},
    init: function () {
        //Do something when component first attached.
        let element = this.el;
        var player = document.getElementById('player');
        //Need to pass this info from the main Rain component
        //Rain area to spawn
        let spawnRadius = 40;//100
        let spawnArea = spawnRadius/2;
        //Add a random starting time to the animation for fluidity
        //Normal Speed
        let randomDelay = Math.floor(Math.random() * 2000); // 0 - 2 senconds
        //let randomDelay = 1000; testing
        let randomDur = Math.floor(Math.random() * 1000 + 1000); // 1 - 2 seconds
        //let randomDur = 4000; testing
        //Rain drop Animation Properties
        let positionParams = {
            property: 'object3D.position.y',
            to: -2,
            dur: randomDur,
            delay: randomDelay,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'true',
            enabled: 'true',
            };
        //Attach Anim to Element
        element.setAttribute('animation__drop', positionParams);
        //Rain drop splash check
        let splash = false;
        //Check if a sibling exists, if so set to true
        var weatherElSplash = element.nextSibling;
        if (weatherElSplash){
            splash = true;
        }
        function splashAnim () {
            //Display splash
            weatherElSplash.setAttribute('visible', true);
            //Let Splash Animation finish
            setTimeout(function() {
                weatherElSplash.setAttribute('visible', false);
                let weatherPos = element.getAttribute('position');
                weatherElSplash.setAttribute('position', {x: weatherPos.x, z: weatherPos.z});
            }, 500);//Splash anim duration
        }
        //Adjust rain Element XZ position after loop completion
        function changeXZ () {
            //Get User's current XZ position
            let userPos = player.getAttribute('position');
            //Offset XZ with User position
            let newX = Math.random() * spawnRadius - spawnArea + userPos.x;
            let newZ = Math.random() * spawnRadius - spawnArea + userPos.z;
            //Set new XZ position for rain
            element.setAttribute('position', {x: newX, z: newZ});
        }//changeXZ Function
        //Change XZ after first loop is finished every loop afterwards
        setTimeout(function () {
            setInterval(changeXZ, randomDur);
            if (splash){
                setInterval(splashAnim, randomDur);
            }
        }, randomDelay + randomDur);
    }
});
//
//Lightning Bolt Creator and Handler
AFRAME.registerComponent('lightningbolt', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},
    init: function () {
        //Do something when component first attached.
        var sceneEl = document.querySelector('a-scene'); 
        //let element = this.el;
        var user = document.querySelector('#userView');
        //Need to pass this info from the main Rain component
        //Rain area to spawn
        let lightningRadius = 80;//100
        let lightningArea = lightningRadius/2;
        //Time in between lightning strikes
        let intervalTime = Math.floor((Math.random() * 5000) + 15000 ); // 15 - 20 senconds
        //Test Logging
        console.log("Bolt Interval Time: " + intervalTime);
        //Lightning bolt Parent wrapper
        var bolt = document.createElement('a-entity');
        bolt.setAttribute('position', {x:'0' , y: '0', z: '0'});
        bolt.setAttribute('scale', '1 1 1');
        bolt.setAttribute('visible', false);
        bolt.classList.add("bolt");
        //Rain drop Animation Properties
        let visibleParams = {
            property: 'visible',
            from: false,
            to: true,
            dur: 250,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'linear',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        bolt.setAttribute('animation__visibility', visibleParams);
        sceneEl.appendChild(bolt); //double check emitter for this anim
        //Lightning bolt Parent wrapper
        var lightningbolt = document.createElement('a-entity');
        lightningbolt.setAttribute('position', {x:'0' , y: '7.5', z: '-3'});
        lightningbolt.setAttribute('scale', '10 10 0');
        lightningbolt.classList.add("lightningbolt");
        bolt.appendChild(lightningbolt);
        //Lightning bolt splash sizes
        let sizeSplashA = new THREE.Vector3(-0.05, -0.5, 0);
        let sizeSplashB = new THREE.Vector3(0.05, -0.5, 0);
        let sizeSplashC = new THREE.Vector3(0, 0, 0);
        //Lightning bolt splash left
        var lightningboltleftsplash = document.createElement('a-entity');
        lightningboltleftsplash.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeSplashA, vertexB: sizeSplashB, vertexC: sizeSplashC});
        lightningboltleftsplash.setAttribute('position', {x:'-0.15' , y: '-0.7', z: '0'});
        lightningboltleftsplash.setAttribute('scale', '0.25 0.25 0.25');
        lightningboltleftsplash.setAttribute('rotation', '0 0 215');
        lightningboltleftsplash.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        lightningboltleftsplash.classList.add("lightningboltleftsplash");
        //Splash left Scale anim properties
        let leftScaleParams = {
            property: 'scale',
            from: '0.1 0.1 0.1',
            to: '1 1 1',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltleftsplash.setAttribute('animation__scale', leftScaleParams);
        //Splash left Rotation anim properties
        let leftRotateParams = {
            property: 'rotation',
            from: '0 0 215',
            to: '0 0 250',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltleftsplash.setAttribute('animation__rotation', leftRotateParams);
        //Append to Lightning Bolt parent Entity
        lightningbolt.appendChild(lightningboltleftsplash);
        //Main bolt wrapper
        var mainBoltWrapper = document.createElement('a-entity');
        mainBoltWrapper.setAttribute('rotation', '0 0 -5');
        mainBoltWrapper.classList.add("midBoltWrapper");
        lightningbolt.appendChild(mainBoltWrapper);
        //Top bolt wrapper
        var boltTopWrapper = document.createElement('a-entity');
        boltTopWrapper.setAttribute('rotation', '0 0 0');
        boltTopWrapper.setAttribute('scale', '0.25 1 1');
        boltTopWrapper.classList.add("boltTopWrapper");
        mainBoltWrapper.appendChild(boltTopWrapper);
        //Top bolt
        var topBolt = document.createElement('a-entity');
        topBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        topBolt.setAttribute('position', {x:'1.6' , y: '4', z: '0'});
        topBolt.setAttribute('rotation', '0 0 45');
        topBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        topBolt.classList.add("topBolt");
        boltTopWrapper.appendChild(topBolt);
        //TopMid bolt wrapper
        var boltTopMidWrapper = document.createElement('a-entity');
        boltTopMidWrapper.setAttribute('rotation', '0 0 0');
        boltTopMidWrapper.setAttribute('scale', '0.25 1 1');
        boltTopMidWrapper.classList.add("boltTopMidWrapper");
        mainBoltWrapper.appendChild(boltTopMidWrapper);
        //TopMid bolt
        var topMidBolt = document.createElement('a-entity');
        topMidBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        topMidBolt.setAttribute('position', {x:'1.2' , y: '3', z: '0'});
        topMidBolt.setAttribute('rotation', '0 0 45');
        topMidBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        topMidBolt.classList.add("topMidBolt");
        boltTopMidWrapper.appendChild(topMidBolt);
        //Mid bolt wrapper
        var boltMidWrapper = document.createElement('a-entity');
        boltMidWrapper.setAttribute('rotation', '0 0 0');
        boltMidWrapper.setAttribute('scale', '0.25 1 1');
        boltMidWrapper.classList.add("boltMidWrapper");
        mainBoltWrapper.appendChild(boltMidWrapper);
        //Mid bolt
        var midBolt = document.createElement('a-entity');
        midBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        midBolt.setAttribute('position', {x:'0.8' , y: '2', z: '0'});
        midBolt.setAttribute('rotation', '0 0 45');
        midBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        midBolt.classList.add("midBolt");
        boltMidWrapper.appendChild(midBolt);
        //BottomMid bolt wrapper
        var boltBottomMidWrapper = document.createElement('a-entity');
        boltBottomMidWrapper.setAttribute('rotation', '0 0 0');
        boltBottomMidWrapper.setAttribute('scale', '0.25 1 1');
        boltBottomMidWrapper.classList.add("boltBottomMidWrapper");
        mainBoltWrapper.appendChild(boltBottomMidWrapper);
        //BottomMid bolt
        var bottomMidBolt = document.createElement('a-entity');
        bottomMidBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        bottomMidBolt.setAttribute('position', {x:'0.4' , y: '1', z: '0'});
        bottomMidBolt.setAttribute('rotation', '0 0 45');
        bottomMidBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        bottomMidBolt.classList.add("bottomMidBolt");
        boltBottomMidWrapper.appendChild(bottomMidBolt);
        //Bottom bolt wrapper
        var boltBottomWrapper = document.createElement('a-entity');
        boltBottomWrapper.setAttribute('rotation', '0 0 0');
        boltBottomWrapper.setAttribute('scale', '0.25 1 1');
        boltBottomWrapper.classList.add("boltBottomWrapper");
        mainBoltWrapper.appendChild(boltBottomWrapper);
        //Bottom bolt
        var bottomBolt = document.createElement('a-entity');
        bottomBolt.setAttribute('geometry', {primitive: 'plane', width: 1, height: 1});
        bottomBolt.setAttribute('position', {x:'0' , y: '0', z: '0'});
        bottomBolt.setAttribute('rotation', '0 0 45');
        bottomBolt.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        bottomBolt.classList.add("bottomBolt");
        boltBottomWrapper.appendChild(bottomBolt);
        //Lightning bolt splash right
        var lightningboltrightsplash = document.createElement('a-entity');
        lightningboltrightsplash.setAttribute('geometry', {primitive: 'triangle', vertexA: sizeSplashA, vertexB: sizeSplashB, vertexC: sizeSplashC});
        lightningboltrightsplash.setAttribute('position', {x:'0.05' , y: '-0.7', z: '0'});
        lightningboltrightsplash.setAttribute('scale', '0.25 0.25 0.25');
        lightningboltrightsplash.setAttribute('rotation', '0 0 -215');
        lightningboltrightsplash.setAttribute('material', {color: '#f09e1b', opacity: 0.75, shader: 'flat', side: 'double'});
        lightningboltrightsplash.classList.add("lightningboltrightsplash");
        //Splash left Scale anim properties
        let rightScaleParams = {
            property: 'scale',
            from: '0.1 0.1 0.1',
            to: '1 1 1',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltrightsplash.setAttribute('animation__scale', rightScaleParams);
        //Splash left Rotation anim properties
        let rightRotateParams = {
            property: 'rotation',
            from: '0 0 -215',
            to: '0 0 -250',
            dur: 1000,
            delay: 0,
            loop: 'true',
            dir: 'normal',
            easing:'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        lightningboltrightsplash.setAttribute('animation__rotation', rightRotateParams);
        //Append to Lightning Bolt parent Entity
        lightningbolt.appendChild(lightningboltrightsplash);
        //Bolt floor
        var boltfloor = document.createElement('a-entity');
        boltfloor.setAttribute('geometry', {primitive: 'circle', radius: 4, segments: 16});
        boltfloor.setAttribute('position', {x:'-0.5' , y: '0.2', z: '-3'});
        boltfloor.setAttribute('rotation', '-90 0 0');
        boltfloor.setAttribute('material', {color: '#dba54f', opacity: 0.75, shader: 'flat', side: 'double'});
        boltfloor.classList.add("boltfloor");
        bolt.appendChild(boltfloor);
        //Bolt cloud
        var boltCloud = document.createElement('a-entity');
        boltCloud.setAttribute('gltf-model','#cloud');
        boltCloud.setAttribute('position', {x:'6' , y: '50', z: '-2'});
        boltCloud.setAttribute('rotation', '0 0 180');
        boltCloud.classList.add("boltCloud");
        bolt.appendChild(boltCloud);
        //Ambient Light
        let ambientLight;
        if (document.querySelector('#ambientLight')) {
            ambientLight = document.querySelector('#ambientLight');
            ambientLight.setAttribute('light',{type: 'ambient', color: '#716a9a', intensity: 0.5});
        } else {
            ambientLight = document.createElement('a-entity');
            ambientLight.setAttribute('light',{type: 'ambient', color: '#716a9a', intensity: 0.5});
            ambientLight.setAttribute('id','#ambientLight');
            sceneEl.appendChild(ambientLight);
            //search all entitys for an ambient light and modify it if it exists
            //let ambientLightSearch = document.querySelectorAll('a-entity');
            //for(let i=0; i < ambientLightSearch.length; i++){
                //if(ambientLightSearch[i].getAttribute('light').ambient) {
                    //ambientLight = ambientLightSearch[i];
                    //currently will select the last ambient light found
                    //create an array to store all found ambient lights
                    //grab one to reset values and delete the rest?
                   //}
            //}
        }
        //Lighting anim 1
        let lighting1 = {
            property: 'light.intensity',
            from: '0.5',
            to: '4.5',
            dur: 1,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing:'easeOutCirc',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt1', lighting1);
        //Lighting anim 2
        let lighting2 = {
            property: 'light.intensity',
            from: '4.5',
            to: '0',
            dur: 200,
            delay: 300,
            loop: 'false',
            dir: 'normal',
            easing:'easeInElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt2', lighting2);
        //Lighting anim 3
        let lighting3 = {
            property: 'light.intensity',
            from: '0',
            to: '2.5',
            dur: 1,
            delay: 500,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt3', lighting3);
        //Lighting anim 4
        let lighting4 = {
            property: 'light.intensity',
            from: '3.5',
            to: '0',
            dur: 200,
            delay: 500,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt4', lighting4);
        //Lighting anim 5
        let lighting5 = {
            property: 'light.intensity',
            from: '0',
            to: '3.5',
            dur: 1,
            delay: 700,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt5', lighting5);
        //Lighting anim 6
        let lighting6 = {
            property: 'light.intensity',
            from: '2.5',
            to: '0.5',
            dur: 50,
            delay: 1000,
            loop: 'false',
            dir: 'normal',
            easing:'easeInOutElastic',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'boltHit',
            pauseEvents: 'boltStop',
            };
        ambientLight.setAttribute('animation__lightningbolt6', lighting6);
        //Bolt Scene Connectors
        let boltWrap = document.querySelector('.bolt');
        let boltLeft = document.querySelector('.lightningboltleftsplash');
        let boltRight = document.querySelector('.lightningboltrightsplash');
        let boltSound = document.querySelector('#boltSound');
        //Spawn with the User
        function spawnWithUser(){
            //Get User's current XZ position
            let userPos = user.getAttribute('position');
            //Offset XZ with User position
            let newX = ((Math.random() * lightningRadius) - lightningArea) + userPos.x;
            let newZ = ((Math.random() * lightningRadius) - lightningArea) + userPos.z;
            //Change XZ position
            boltWrap.setAttribute('position', {x: newX, y: 0.15, z: newZ});
        }
        //Initialize starting position
        spawnWithUser()
        //Lightning Bolt anim
        setInterval(function(){
            boltSound.emit('boltHit');
                setTimeout(function () {
                boltWrap.setAttribute('visible', true);
                ambientLight.emit('boltHit');
                setTimeout(function() {
                    boltWrap.emit('boltHit');
                    boltLeft.emit('boltHit');
                    boltRight.emit('boltHit');
                    //Reset anim properties
                    setTimeout(function() {
                        boltWrap.setAttribute('visible', false);
                        bolt.emit('boltStop');
                        ambientLight.emit('boltStop');
                        //ambientLight.setAttribute('visible', true);
                        boltLeft.emit('boltStop');
                        boltLeft.setAttribute('scale','0.25 0.25 0.25');
                        boltLeft.setAttribute('rotation','0 0 215');
                        boltRight.emit('boltStop');
                        boltRight.setAttribute('scale','0.25 0.25 0.25');
                        boltRight.setAttribute('rotation','0 0 -215');
                        //Update XYZ Coords
                        spawnWithUser()
                    }, 800); //Timeout
                }, 250); //Timeout
            }, 1500); //Sound delay adjustment
        }, intervalTime);
    }
});
//
//Teleport
//
//Teleport Button Click Function
AFRAME.registerComponent('teleport-button',{
    init: function(){
        //Scene
        var sceneEl = document.querySelector('a-scene');
        //User 
        let user = document.getElementById('userView');
        //UI button
        //let teleportUi = document.querySelector('#teleportUI');
        let teleportUi = this.el;
        //Toggle value initialization
        let i = 0;
        //Default to Blink
        teleportUi.setAttribute('text', {value: '* Current Teleport Type *\n Instant\n', color: 'white', align: 'center'});

        //Listen for Click to change teleportType
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            if(i === 0) {
                user.setAttribute('teleportType', 'fade');
                i++;
                teleportUi.setAttribute('text', {value: '* Current Teleport Type *\n Fade\n', color: 'white', align: 'center'});
            } else if(i === 1) {
                user.setAttribute('teleportType', 'locomotion');
                i++;
                teleportUi.setAttribute('text', {value: '* Current Teleport Type *\n Locomotion\n', color: 'white', align: 'center'});
            } else if(i === 2) {
                user.setAttribute('teleportType', 'sphere');
                i++;
                teleportUi.setAttribute('text', {value: '* Current Teleport Type *\n Sphere\n', color: 'white', align: 'center'});
            } else if(i === 3) {
                user.setAttribute('teleportType', 'blink');
                i++;
                teleportUi.setAttribute('text', {value: '* Current Teleport Type *\n Blink\n', color: 'white', align: 'center'});
            } else {
                user.setAttribute('teleportType', 'instant');
                i = 0;
                teleportUi.setAttribute('text', {value: '* Current Teleport Type *\n Instant\n', color: 'white', align: 'center'});
            }
        });
    }
});
//
//Movement and Interactions
AFRAME.registerComponent('teleportation',{
    init: function(){
        //Scene
        var sceneEl = document.querySelector('a-scene');
        //This element
        let element = this.el;
        //Player Rig 
        let user = document.getElementById('player');
        //User View
        let userView = document.getElementById('userView');

        //current Teleportation method.
        let teleportType = 'instant';
        //let teleportType = 'fade';
        //let teleportType = 'locomotion';
        //let teleportType = 'sphere';
        //let teleportType = 'blink';
        //Attach teleportType to User for button adjustment
        userView.setAttribute('teleportType', teleportType);

        //Initialize 
        if (element.classList.contains('teleport')) {
            active = false; //is the button active for teleport
            //Set parent wrapper's active status
            element.parentNode.setAttribute('active', 'false');

        } else if (element.classList.contains('cancel')) {
            active = true; //is the button active for cancel
            element.classList.toggle('clickable', false);
            //Set parent wrapper's active status
            element.parentNode.setAttribute('active', 'false');
        }
        //Reset Event
        this.el.addEventListener('reset', function() {
            if (element.classList.contains('teleport')) {
                active = false; //is the button active for teleport
                //Reset parent wrapper's active status
                element.parentNode.setAttribute('active', 'false');
            } else if (element.classList.contains('cancel')) {
                active = true; //is the button active for cancel
                element.classList.toggle('clickable', false);
                //Reset parent wrapper's active status
                element.parentNode.setAttribute('active', 'false');
            }
        });
        //Reset Instant Event
        this.el.addEventListener('resetInstant', function() {
            if (element.classList.contains('teleport')) {
                active = false; //is the button active for teleport
                //Reset parent wrapper's active status
                element.parentNode.setAttribute('active', 'false');
            } else if (element.classList.contains('cancel')) {
                active = true; //is the button active for cancel
                element.classList.toggle('clickable', false);
                //Reset parent wrapper's active status
                element.parentNode.setAttribute('active', 'false');
            }
        });

        //Listen for Click to teleport
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            //Retreive current teleportType from user
            teleportType = userView.getAttribute('teleportType');

            if(element.parentNode.getAttribute('active') === 'false') {//default state
                //Allow cancel circle to be viewable and clickable
                element.nextSibling.classList.toggle('clickable', true);
                element.nextSibling.emit('click1',{});
                //Set rotation anim for select circle
                let userPov = userView.getAttribute('rotation');
                let rotationParams = {
                    property: 'object3D.rotation.y',
                    to: userPov.y,
                    dur: 500,
                    delay: 0,
                    loop: 'false',
                    dir: 'normal',
                    easing:'easeInOutSine',
                    elasticity: 400,
                    autoplay: 'true',
                    enabled: 'true',
                    };
                element.parentNode.setAttribute('animation__rotateToUser', rotationParams);
                //if clicked once and activated, setAttribute that be checked for reset
                element.parentNode.setAttribute('active', 'true');
            } else {//circle1 and circle2 are ready to be clicked
                //if circle1 was selected, teleport user and reset properties
                //if circle2 was selcted, reset properties
                if (element.classList.contains('teleport')) {//Teleport circle selected
                    //Click 2 on circle1 moves user and resets both circle1 and circle2
                    //Currently selected circle position for teleportation
                    let teleportPos = element.parentNode.getAttribute('position');
                    //Get Users current y position
                    let userPos = user.getAttribute('position');
                    //Get Users current y position
                    //let playerPos = player.getAttribute('position');
                    //New Position Vec3
                    var newPosition = new THREE.Vector3();
                    //Teleportation Type
                    if (teleportType === 'instant') {
                        //instant
                        //Emit instant reset for only the teleport elements which are active
                        let allTeleportors = document.querySelectorAll('.teleporter');
                        for (let i= 0; i < allTeleportors.length; i++){
                            if (allTeleportors[i].parentNode.getAttribute('active') === 'true') {
                                allTeleportors[i].emit('resetInstant',{});
                                allTeleportors[i].nextSibling.emit('resetInstant',{});
                            }
                        }
                        //Clone current entity's position User
                        newPosition.copy(teleportPos);
                        //Reset User's Y back to 0 - Flat Mode
                        newPosition.y = 0;
                        //Teleport the user to the space with a slight delay for circle repositioning
                        var posTimeout = setTimeout(function () {
                            //Set position for UI at 3js level for speed!
                            user.object3D.position.copy(newPosition);
                        }, 150); //Delay
                    } else if (teleportType === 'fade') {
                        //fade
                        //Start a fade in and out anim, move the user inbetween the fade
                        //fade screen
                        let fadeScreen = document.getElementById('fadescreen');
                        //fade anim
                        fadeScreen.emit('fade',{});
                        //Do a reset on element to not interfer with anim
                        element.emit('reset',{});//select circle
                        element.nextSibling.emit('reset',{});//cancel circle
                        //Clone current entity's position User
                        newPosition.copy(teleportPos);
                        //Reset User's Y back to 0 - Flat Mode
                        newPosition.y = 0;
                        var posTimeout = setTimeout(function () {
                            //Emit instant reset for only the teleport elements which are active
                            let allTeleportors = document.querySelectorAll('.teleporter');
                            for (let i= 0; i < allTeleportors.length; i++){
                                if (allTeleportors[i].parentNode.getAttribute('active') === 'true') {
                                allTeleportors[i].emit('resetInstant',{});
                                allTeleportors[i].nextSibling.emit('resetInstant',{});
                                }
                            }
                            //Set position for UI at 3js level for speed!
                            user.object3D.position.copy(newPosition);
                        }, 1050); //Delay
                    } else if (teleportType === 'locomotion') {
                        //locomotion
                        //Create locomotion animation based on teleported Pos
                        let travelParams = {
                            property: 'position',
                            from: {x: userPos.x, y: 0, z: userPos.z},
                            to: {x: teleportPos.x, y: 0, z: teleportPos.z},
                            dur: 1000,
                            delay: 0,
                            loop: 'false',
                            dir: 'normal',
                            easing:'easeInOutSine',
                            elasticity: 400,
                            autoplay: 'true',
                            enabled: 'true',
                            };
                        user.setAttribute('animation__locomotion', travelParams);
                        //Do an instant Reset
                        element.nextSibling.emit('reset',{});//cancel circle
                        //Emit instant reset for only the teleport elements which are active
                        let allTeleportors = document.querySelectorAll('.teleporter');
                        for (let i= 0; i < allTeleportors.length; i++){
                            if (allTeleportors[i].parentNode.getAttribute('active') === 'true') {
                                allTeleportors[i].emit('reset',{});
                                allTeleportors[i].nextSibling.emit('reset',{});
                            }
                        }
                    } else if (teleportType === 'sphere') {
                        //sphere
                        //Start a sphere in and out anim, move the user inbetween the sphere
                        let teleportSphere = document.querySelector('#teleportsphere');
                        teleportSphere.emit('teleportSphere',{});
                        //Do a reset on element to not interfer with anim
                        element.emit('reset',{});//select circle
                        element.nextSibling.emit('reset',{});//cancel circle
                        //Clone current entity's position User
                        newPosition.copy(teleportPos);
                        //Reset User's Y back to 0 - Flat Mode
                        newPosition.y = 0;
                        var posTimeout = setTimeout(function () {
                            //Emit instant reset for only the teleport elements which are active
                            let allTeleportors = document.querySelectorAll('.teleporter');
                            for (let i= 0; i < allTeleportors.length; i++){
                                if (allTeleportors[i].parentNode.getAttribute('active') === 'true') {
                                allTeleportors[i].emit('resetInstant',{});
                                allTeleportors[i].nextSibling.emit('resetInstant',{});
                                }
                            }
                            //Set position for UI at 3js level for speed!
                            user.object3D.position.copy(newPosition);
                        }, 1000); //Delay
                    } else if (teleportType === 'blink') {
                        //Blink
                        //Start a blink in and out anim, move the user inbetween the blink
                        //Blink screen
                        let blinkScreen1 = document.querySelector('#blinkscreen1');
                        let blinkScreen2 = document.querySelector('#blinkscreen2');
                        //Blink anim
                        blinkScreen1.emit('blink',{});
                        blinkScreen2.emit('blink',{});
                        //Do an reset on element to not interfer with anim
                        element.emit('reset',{});//select circle
                        element.nextSibling.emit('reset',{});//cancel circle
                        //Clone current entity's position User
                        newPosition.copy(teleportPos);
                        //Reset User's Y back to 0 - Flat Mode
                        newPosition.y = 0;
                        var posTimeout = setTimeout(function () {
                            //Emit instant reset for only the teleport elements which are active
                            let allTeleportors = document.querySelectorAll('.teleporter');
                            for (let i= 0; i < allTeleportors.length; i++){
                                if (allTeleportors[i].parentNode.getAttribute('active') === 'true') {
                                allTeleportors[i].emit('resetInstant',{});
                                allTeleportors[i].nextSibling.emit('resetInstant',{});
                                }
                            }
                            //Set position for UI at 3js level for speed!
                            user.object3D.position.copy(newPosition);
                        }, 800); //Delay
                    }
                } else if (element.classList.contains('cancel')) {//Cancel circle selected
                    //Click2 on circle2 resets both circle1 and circle2
                    element.emit('reset',{});//cancel circle
                }
            }
        });
    },
});
//
//Secret
//
//Secrets Initialize Function
AFRAME.registerComponent('secret-init',{
    init: function(){
        //User 
        let user = document.getElementById('player');
        //Intialize secrets Attribute
        user.setAttribute('secretsfound', '0');
        //UI button
        let secretsUI = document.getElementById('secretsUI');
        //Set default Secrets text
        secretsUI.setAttribute('text', {value: '* Secrets Found *\n 0 / 4\n', color: 'white', align: 'center'});
        //Create locomotion animation
        let travelUpParams = {
            property: 'position.y',
            from: 0,
            to: 171.6,
            dur: 20000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing: 'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'secretTeleportUp',
            };
        user.setAttribute('animation__secretTeleportUp', travelUpParams);
        //Create locomotion animation
        let travelDownParams = {
            property: 'position.y',
            from: 171.6,
            to: 0,
            dur: 20000,
            delay: 0,
            loop: 'false',
            dir: 'normal',
            easing: 'easeInOutSine',
            elasticity: 400,
            autoplay: 'false',
            enabled: 'true',
            startEvents: 'secretTeleportDown',
            };
        user.setAttribute('animation__secretTeleportDown', travelDownParams);
    }
});
//
//Secrets Button Click Function
AFRAME.registerComponent('secret-button',{
    init: function(){
        //User 
        let user = document.getElementById('player');
        //This element
        let element = this.el;
        //UI button
        let secretsUI = document.querySelector('#secretsUI');
        //Secret Found Notifcation
        let notification = document.querySelector('#secretFound');
        //Secret Teleport button
        let secretTeleport1 = document.querySelector('#secretTeleport1');
        let secretTeleport2 = document.querySelector('#secretTeleport2');
        //Listen for Click to change teleportType
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            //retrieve current secrets found
            let secretsFound = user.getAttribute('secretsfound');
            //Display Notification
            notification.emit('secretFound',{});
            //remove clickable class on successful click
            element.classList.toggle('clickable', false);
            if(secretsFound === '0') {
                user.setAttribute('secretsfound', '1');
                secretsUI.setAttribute('text', {value: '* Secrets Found *\n 1 / 4\n', color: 'white', align: 'center'});
            } else if(secretsFound === '1') {
                user.setAttribute('secretsfound', '2');
                secretsUI.setAttribute('text', {value: '* Secrets Found *\n 2 / 4\n', color: 'white', align: 'center'});
            } else if(secretsFound === '2') {
                user.setAttribute('secretsfound', '3');
                secretsUI.setAttribute('text', {value: '* Secrets Found *\n 3 / 4\n', color: 'white', align: 'center'});
            } else if(secretsFound === '3') {
                user.setAttribute('secretsfound', '4');
                secretsUI.setAttribute('text', {value: '* All Secrets Found *\n 4 / 4\n', color: 'white', align: 'center'});
                //spawn secret teleport button
                secretTeleport1.setAttribute('visible', true);
                secretTeleport1.classList.add('clickable');
                //spawn secret teleport button
                secretTeleport2.setAttribute('visible', true);
                secretTeleport2.classList.add('clickable');
            }
        });
    }
});
//
//Secret Teleport Up Function
AFRAME.registerComponent('secret-teleport1',{
    init: function(){
        //User 
        let user = document.getElementById('player');
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            user.emit('secretTeleportUp',{});
        });
    }
});
//
//Secret Teleport Down Function
AFRAME.registerComponent('secret-teleport2',{
    init: function(){
        //User 
        let user = document.getElementById('player');
        this.el.addEventListener('click', function(){
            //Do Somthing on Click
            user.emit('secretTeleportDown',{});
        });
    }
});

//
//Canvas Component - Testing
AFRAME.registerComponent('canvas-test',{
	init: function(){
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext("2d");
		this.ctx.width = 600;
		this.ctx.height = 400;
		//console.log("somethig should be happening!");
		//console.log(this.canvas);
		//console.log(this.ctx);

		//Image
		//this.img = document.getElementById("#gradient");
		//this.ctx.drawImage(this.img, 10, 10);
		//this.img = document.getElementById("sky");
		//this.img.onload = function(){
			//this.ctx.drawImage(this.img,0,0,40,40);}

		//Square
		//this.ctx.beginPath();
		//this.ctx.rect(20, 20, 150, 100);
		//this.ctx.fillStyle = "red"; 
		//this.ctx.fill();

		// set fill and stroke styles
		//this.ctx.fillStyle = '#F0DB4F';
		//this.ctx.strokeStyle = 'red';
		// draw a rectangle with fill and stroke
		//this.ctx.fillRect(50, 50, 150, 100);
		//this.ctx.strokeRect(50, 50, 150, 100);

		// Create linear gradient
		//this.grd = this.ctx.createLinearGradient(0, 0, 200, 0);
		//this.grd.addColorStop(0, "red");
		//this.grd.addColorStop(1, "white");
		// Create circular gradient
		this.grd = this.ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
		this.grd.addColorStop(0, "red");
		this.grd.addColorStop(1, "white");

		// Fill with gradient
		this.ctx.strokeStyle = 'blue';
		this.ctx.fillStyle = this.grd;
		this.ctx.fillRect(10, 10, 150, 80);
		this.ctx.strokeRect(50, 50, 150, 100);

		//Text
		this.ctx.font = "30px Comic Sans MS";
		this.ctx.fillStyle = "green";
		this.ctx.textAlign = "center";
		this.ctx.fillText("Hello World", canvas.width/2, canvas.height/2);
		//this.ctx.fillText("Hello World", 10, 50);
		//this.ctx.strokeText("Hello World", 10, 50);
		//this.ctx.fill();
	}
});
//Attach stats text (fps, etc...) to a window in-vr. Allow user to toggle

//Create a generic component which you attach to an entity and give it a parameter
//of the object in which you want to attach this object to. Keeping the current offset between the objects wether that be far or close.

//have a new icon be the 1 icon on the screen
//it will be in an entity that follows the user and is updated via component
//when user selects it, the main menu of icons will rotate into position animated
//screens will as well animated

//Allow setting to adjust button text to show always, highlight show 1 or all, recently highlight display timer

//Add animations for position movement and adjustment

//Enhance the current 3 themes colors for greater color variance pop.
//Create gradient color animation for ui theme

//Get Color Picker to work and set up 3 Color Gradient Selection or create more themes.

//Make other items adjustable like scale of UI, position, rotation, animation, etc...
//Or make a series of options like zoomed out 1, or small/large, etc...
//
//media menu
//
//Settings
//
//Left Skip
//
//Backwards
//
//Stop
//
//Play Pause
//
//Forwards
//
//Right Skip
//
//Cancel Close



