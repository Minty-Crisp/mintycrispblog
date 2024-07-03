//
//ivx : A-Frame UX Library
//v0.3 Engine
//https://github.com/Minty-Crisp/ivx
//
//Created by Minty-Crisp (mintycrisp.com)

//ivx v0.3 Project Library, World, Zone, Scene & ivxObj toys

//
//Customize

//
//Replace the following keywords
//Single Word, No Caps, Project Name : toy
//name : toyZone
//Start Scene : toyZoneScene0
//More Scene : toyZoneScene1
//Start Zone : toyZone
//More Scene :toyZone1Scene0
//More Zone : toyZone1
//Scenario : toyScenario
//World : toyWorld
//Reloading Library, Start with Capital : Toy

//ivx-scene-library
//User Library : User added Library items
AFRAME.registerComponent('toy-library', {
dependencies: ['ivx'],
init: function () {
//ivx System Connection
const ivx = document.querySelector('a-scene').systems.ivx;

//Lights
ivx.directionalLight.core.components.light.intensity = 1;
ivx.directionalLight.core.position = new THREE.Vector3(-0.25,0.75,1);
ivx.directionalLight2.core.components.light.intensity = 0.2;
ivx.directionalLight2.core.position = new THREE.Vector3(0.25,0.75,-0.5);
ivx.directionalLight3.core.components.light.intensity = 0.5;
ivx.directionalLight3.core.position = new THREE.Vector3(0.25,0.75,0.5);
ivx.ambientLight.core.components.light.intensity = 0.5;

//
//skyBoxToy
ivx.skyBoxToyData = {
data:'skyBoxToyData',
id:'skyBoxToy',
sources:false,
lights:[
ivx.directionalLight,
ivx.directionalLight2,
ivx.directionalLight3,
ivx.ambientLight,
],
sky:[
ivx.skyGrad,
],
space:[
],
};
ivx.skyBoxToy = ivx.SkyBox(ivx.skyBoxToyData);

//Core toy
ivx.toyParentData = {
	data:'toyParentData',
	id:'toyParent',
	position: new THREE.Vector3(0,0,0),
	scale: new THREE.Vector3(0.1,0.1,0.1),
	classes: ['a-ent', 'clickable'],
};
ivx.toyParent = ivx.Core(ivx.toyParentData);

//Plastic
ivx.plasticData = {
data:'plasticData',
id:'plastic',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
material: {shader: "standard", color: "#c3c3c3", opacity: 0.45, metalness: 0.5, roughness: 0.5, },
components:{
	['obj-model']:{obj: './toy/3d/toy/plastic.obj'},
},
};
ivx.plastic = ivx.Core(ivx.plasticData);

//Sticker
ivx.stickerData = {
data:'stickerData',
id:'sticker',
position: new THREE.Vector3(-7,3,3.1),
scale: new THREE.Vector3(4,4,4),
classes: ['clickable','a-ent'],
geometry:{primitive: 'plane', width:1, height: 1},
material: {shader: "standard", src:'./toy/img/sticker.png'},
};
ivx.sticker = ivx.Core(ivx.stickerData);

//board
ivx.boardData = {
data:'boardData',
id:'board',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components:{
	['gltf-model']:'./toy/3d/toy/board.glb',
},
};
ivx.board = ivx.Core(ivx.boardData);




//game
ivx.gameData = {
data:'gameData',
id:'game',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components:{
	['gltf-model']:'./toy/3d/toy/game.glb',
},
};
ivx.game = ivx.Core(ivx.gameData);

//hair
ivx.hairData = {
data:'hairData',
id:'hair',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components:{
	['gltf-model']:'./toy/3d/toy/hair.glb',
},
};
ivx.hair = ivx.Core(ivx.hairData);

//headphones
ivx.headphonesData = {
data:'headphonesData',
id:'headphones',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components:{
	['gltf-model']:'./toy/3d/toy/headphones.glb',
},
};
ivx.headphones = ivx.Core(ivx.headphonesData);

//hmd
ivx.hmdData = {
data:'hmdData',
id:'hmd',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components:{
	['gltf-model']:'./toy/3d/toy/hmd.glb',
},
};
ivx.hmd = ivx.Core(ivx.hmdData);

//minty
ivx.mintyData = {
data:'mintyData',
id:'minty',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components:{
	['gltf-model']:'./toy/3d/toy/minty.glb',
},
};
ivx.minty = ivx.Core(ivx.mintyData);

//pizza
ivx.pizzaData = {
data:'pizzaData',
id:'pizza',
scale: new THREE.Vector3(1,1,1),
classes: ['clickable','a-ent'],
components:{
	['gltf-model']:'./toy/3d/toy/pizza.glb',
},
};
ivx.pizza = ivx.Core(ivx.pizzaData);
















//Build Scene Library Objects
ivx.buildToyLibrary = () => {

}
ivx.ToBeRebuilt('buildToyLibrary');

},
});

//ivx-project
//ivx Scenario : NodeScene and MapZone's Data and Cores
AFRAME.registerComponent('toy-scenes', {
dependencies: ['ivx'],
init: function () {
//ivx System Connection
const ivx = document.querySelector('a-scene').systems.ivx;
//
//World Atlas MapZones & NodeScenes


//
//toy World

//
//Zone 0
ivx.toyZoneData = {
	info:{
		id: 'toyZone',
		name: 'toyZone',
		zoneNum: 0,
		start: 'toyZoneScene0',
		travelMenu: false,
	},
	controls:{
	},
	start:{
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
};
//Zone 0 Scene 0
ivx.toyZoneScene0Data = {
	info:{
		id:'toyZoneScene0',
		name: 'Zone 0 | Scene 0',
		description: 'Default scene to load on Scenario/Zone.',
		sceneText: false,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{
		toyParent: {SpawnCore:null},
		plastic: {SpawnCore:ivx.toyParent},
		sticker: {SpawnCore:ivx.toyParent},
		board: {SpawnCore:ivx.toyParent},
		game: {SpawnCore:ivx.toyParent},
		hair: {SpawnCore:ivx.toyParent},
		headphones: {SpawnCore:ivx.toyParent},
		hmd: {SpawnCore:ivx.toyParent},
		minty: {SpawnCore:ivx.toyParent},
		pizza: {SpawnCore:ivx.toyParent},
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
	map:{
		data: ivx.toyZoneData.toyZoneScene0,
	},
};
//Zone 0 Scene 1
ivx.toyZoneScene1Data = {
	info:{
		id:'toyZoneScene1',
		name: 'Zone 0 | Scene 1',
		description: 'A connected Scene within Zone 0.',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
	map:{
		data: ivx.toyZoneData.toyZoneScene1,
	},
};
//Zone 0 Scene 0
ivx.toyZoneScene0 = ivx.SceneNode(ivx.toyZoneScene0Data);
//Zone 0 Scene 1
ivx.toyZoneScene1 = ivx.SceneNode(ivx.toyZoneScene1Data);
//Map Zone 0
ivx.toyZone = ivx.MapZone(ivx.toyZoneData);

//
//Zone 1
ivx.toyZone1Data = {
	info:{
		id: 'toyZone1',
		name: 'toyZone1',
		zoneNum: 0,
		start: 'toyZone1Scene0',
		travelMenu: true,
	},
	controls:{

	},
	start:{

	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
};
//Zone 1 Scene 0
ivx.toyZone1Scene0Data = {
	info:{
		id:'toyZone1Scene0',
		name: 'Zone 1 | Scene 0',
		description: 'A new Zone and Scene to move to/from. The floor here is raycast click teleportable.',
		sceneText: true,
		fog: false,
		map: false,
		spawnPos:{x:0,y:0,z:0},
	},
	controls:{
	},
	start:{

	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{

	},
	map:{
		data: ivx.toyZone1Data.toyZone1Scene0,
	},
};
//Zone 1 Scene 0
ivx.toyZone1Scene0 = ivx.SceneNode(ivx.toyZone1Scene0Data);
//Zone 1
ivx.toyZone1 = ivx.MapZone(ivx.toyZone1Data);

//
//Scenarios

//
//Testing Scenario
ivx.toyScenarioData = {
	info:{
		id: 'toyScenario',
		name: 'v03 Testing Scenario',
		scenarioNum: 0,
		startZone: 'toyZone',
		instructions: 'A scenario testing the new features and functionality of the A-Frame UX Library engine v0.3.',
	},
	
	map:{
		toyZone:{
			toyZoneScene0:{
				connect0: {inZone: true, node: 'toyZoneScene1',},
				connect1: {inZone: 'toyZone1', node: 'toyZone1Scene0',},
			},
			toyZoneScene1:{
				connect0: {inZone: true, node: 'toyZoneScene0',},
			},
		},
		toyZone1:{
			toyZone1Scene0:{
				connect0: {inZone: 'toyZone', node: 'toyZoneScene0',},
			},
		},
	},
	controls:{
		//
		//Default Player Controls
		action5Down:{ivxObj: 'player', func: 'MainMenuAction', name: 'Toggle Main Menu', info: 'Go back in the Main Menu or Spawn/Despawn Companion.'},
		action6Down:{ivxObj: 'player', func: 'CycleCameraZoom', name: 'Cycle Camera Zoom', info: 'Cycle through various camera zoom lengths.'},
		action7Down:{ivxObj: 'player', func: 'SnapLeft', name: 'Snap View Left', info: 'Quick snap rotate to the left.'},
		action8Down:{ivxObj: 'player', func: 'SnapRight', name: 'Snap View Right', info: 'Quick snap rotate to the right.'},
	},
	start:{
		skyBoxToy:{SpawnSkyBox: null},
	},
	delay:{
	},
	interval:{
	},
	event:{
	},
	interaction:{
	},
	exit:{
	},
};
ivx.toyScenario = ivx.Scenario(ivx.toyScenarioData);

//
//Testing World
ivx.toyWorldData = {
	info:{
		id: 'toyWorld',
		name: 'Testing World',
		description: 'A world containing various test scenarios.',
		maxLoadtime: 5000,
		dayTime: 360000,
		inventory: false,
		collision: false,
		physics: false,
		menuStyle: false,
		menuOptions: false,
	},
	scenarios:[
		ivx.toyScenario,
	],
};
ivx.toyWorld = ivx.World(ivx.toyWorldData);

//Default World
ivx.toyWorld.SetAsDefault();

//
//System Loaded
ivx.SystemLoaded();
console.log({msg: 'toy world loaded', world: ivx.toyWorld})

    },
});