//Node Travel JS
//by Minty Crisp @ MintyCrisp.com
//
//
//Node Grid Generator Component
AFRAME.registerComponent('node-grid-gen', {
    //schema: {
        //bar: {type: 'number'},
        //baz: {type: 'string'}
    //},

    init: function () {
        //Do something when component first attached.
        //Called once when the component is initialized. Used to set up initial state and instantiate variables.
        var sceneEl = document.querySelector('a-scene'); 
        //Camera
        var camera = document.querySelector('#player');
        //Player On Board
        var playerOnBoard = document.querySelector('#playerOnBoard');
        //All particles array
        /* allNodes Currently
        allNodes.id;
        allNodes.position;
        allNodes.offset;
        allNodes.offsetAmount; 
        */
        var allNodes = [];
        var allConnectors = [];
        var grid0Object = {};
        //Length of Column and Rows
        var gridSize = 10;
        let level = 0;
        //Run Grid New Fill to create the gridsize X gridsize grid
        gridNewFill(level,grid0Object,gridSize);
        //Use the returned nodePos array in Node Gen to fill with Entities
        nodeGridGen(gridSize, allNodes);
        //Create connecting lines
        gridLines(allNodes, allConnectors);

//Will be adjusted later with a spawner level traveler function
//Append Grid entity to scene
//sceneEl.appendChild(grid);
//Function to generate lines and travel anims
//nodes can only connect to nodes in other rows which will generate the diamond travel effect
//Ran 3rd
function gridLines(allNodes, allConnectors) {
    //
    //allNodes
    //allConnectors

    //console.log(allNodes.length);
    /* allNodes Currently
    allNodes.id;
    allNodes.position;
    allNodes.offset;
    allNodes.offsetAmount; 
    */
/*

*/

    console.log(allNodes[0].connectedNodes);

    //Initialize Connector Parent
    let connectorParent = document.createElement('a-entity');
    connectorParent.setAttribute('id','connectorParent');
    connectorParent.classList.add("connectorParent");

    //Attach to parent entity
    sceneEl.appendChild(connectorParent);

    for (let i=0; i < allNodes.length; i++) {
        //Setups
        let id = allNodes[i].id;
        let pos = allNodes[i].position;
        let offset = allNodes[i].offset;
        let offsetAmount = allNodes[i].offsetAmount;
        let isOdd = allNodes[i].offset;
        let startPosX = pos.x + offsetAmount;
        let startPosY = pos.y + offsetAmount;
        let startPosZ = pos.z + offsetAmount;
        let startPoint = new THREE.Vector3(startPosX, startPosY, startPosZ);

        //Node Lines | Up to 4 per node

        //Endpoint
        //let endPosX = allNodes[i].position.x;
        let endPosX;
        let endPosY;
        let endPosZ;
        let endPoint;
        let end2PosX;
        let end2PosY;
        let end2PosZ;
        let end2Point;

        //Even Column
        if(!isOdd){
            //Test Logging
            //console.log('Even Hit' + i);

            //Check whether a Next or Previous Rows exists
            if(allNodes[i+10]){//Next Row Exists
                //Test Logging
                //console.log('Next Row Exists' + i);
                //Even Rule 1 : +10 
                endPosX = allNodes[i+10].position.x;
                endPosY = allNodes[i+10].position.y;
                endPosZ = allNodes[i+10].position.z;
                endPoint = new THREE.Vector3(endPosX, endPosY, endPosZ);
                //Even Rule 2 : +9
                end2PosX = allNodes[i+9].position.x;
                end2PosY = allNodes[i+9].position.y;
                end2PosZ = allNodes[i+9].position.z;
                end2Point = new THREE.Vector3(end2PosX, end2PosY, end2PosZ);
//if Even
//Even Row, UpRight +10
//Even Row, UpLeft +9
//Even Row, DownRight -10
//Even Row, DownLeft -11
                //if the node is a base 10 do not check rule 2
                //aka left side of grid
                if(i % 10 === 0){
                    //Base 10 do not paint top left line
                    //console.log(i);
                    //Paint Line Up Right
                    //Initialize Connector
                    let connector = document.createElement('a-entity');
                    let connectorName = "connector1-" + i;
                    connector.setAttribute('id',connectorName);
                    connector.setAttribute('scale','5 1 5');
                    connector.classList.add("connector");
                    connector.setAttribute('line', {start: startPoint, end: endPoint, color: 'white'});
                    //Attach to parent entity
                    connectorParent.appendChild(connector);

                    //Create Move Animation to Attach to Player On Board
                    let animName = "animation__node" + i + "to-node" + (i+10);
                    let animName2 = "animation__node" + (i+10) + "to-node" + i;
                    let startEvents = "node" + i + "to-node" + (i+10);
                    let startEvents2 = "node" + (i+10) + "to-node" + i;
                    let stopEventsMove = "playerMoveStop";

                    //Player Move To Up Right
                    let playerMoveFromNodeToUpRight = {
                        property: 'position',
                        to: {x: endPoint.x*5, y: endPoint.y, z: endPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents,
                        pauseEvents: stopEventsMove, 
                    };
                    //Player Move From Down Left
                    let playerMoveFromDownLeftToNode = {
                        property: 'position',
                        to: {x: startPoint.x*5, y: startPoint.y, z: startPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents2,
                        pauseEvents: stopEventsMove, 
                    };

                    //Apply Animations to Player
                    playerOnBoard.setAttribute(animName, playerMoveFromNodeToUpRight);
                    playerOnBoard.setAttribute(animName2, playerMoveFromDownLeftToNode);

                } else {
                    //Even Rule 2 : +9
                    //Paint Line Up Right
                    //Initialize Connector
                    let connector = document.createElement('a-entity');
                    let connectorName = "connector1-" + i;
                    connector.setAttribute('id',connectorName);
                    connector.setAttribute('scale','5 1 5');
                    connector.classList.add("connector");
                    connector.setAttribute('line', {start: startPoint, end: endPoint, color: 'white'});
                    //Attach to parent entity
                    connectorParent.appendChild(connector);

                    //Paint Line
                    //Initialize Connector
                    let connector2 = document.createElement('a-entity');
                    let connector2Name = "connector2-" + i;
                    connector2.setAttribute('id',connector2Name);
                    connector2.setAttribute('scale','5 1 5');
                    connector2.classList.add("connector");
                    connector2.setAttribute('line', {start: startPoint, end: end2Point, color: 'white'});
                    //Attach to parent entity
                    connectorParent.appendChild(connector2);

                    //Create Move Animation to Attach to Player On Board
                    let animName = "animation__node" + i + "to-node" + (i+10);
                    let animName2 = "animation__node" + (i+10) + "to-node" + i;
                    let animName3 = "animation__node" + i + "to-node" + (i+9);
                    let animName4 = "animation__node" + (i+9) + "to-node" + i;
                    let startEvents = "node" + i + "to-node" + (i+10);
                    let startEvents2 = "node" + (i+10) + "to-node" + i;
                    let startEvents3 = "node" + i + "to-node" + (i+9);
                    let startEvents4 = "node" + (i+9) + "to-node" + i;
                    let stopEventsMove = "playerMoveStop";

                    //Player Move To Up Right
                    let playerMoveFromNodeToUpRight = {
                        property: 'position',
                        to: {x: endPoint.x*5, y: endPoint.y, z: endPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents,
                        pauseEvents: stopEventsMove, 
                    };
                    //Player Move From Down Left
                    let playerMoveFromDownLeftToNode = {
                        property: 'position',
                        to: {x: startPoint.x*5, y: startPoint.y, z: startPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents2,
                        pauseEvents: stopEventsMove, 
                    };

                    //Player Move To Up Left
                    let playerMoveFromNodeToUpLeft = {
                        property: 'position',
                        to: {x: end2Point.x*5, y: end2Point.y, z: end2Point.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents3,
                        pauseEvents: stopEventsMove, 
                    };
                    //Player Move From Down Left
                    let playerMoveFromDownRightToNode = {
                        property: 'position',
                        to: {x: startPoint.x*5, y: startPoint.y, z: startPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents4,
                        pauseEvents: stopEventsMove, 
                    };

                    //Apply Animations to Player
                    playerOnBoard.setAttribute(animName, playerMoveFromNodeToUpRight);
                    playerOnBoard.setAttribute(animName2, playerMoveFromDownLeftToNode);
                    playerOnBoard.setAttribute(animName3, playerMoveFromNodeToUpLeft);
                    playerOnBoard.setAttribute(animName4, playerMoveFromDownRightToNode);


                }
            }
            //Prev Row Exists
            if(allNodes[i-10]){
                //Test Logging
                //console.log('Prev Row Exists' + i);
                //Even Rule 1 : -10 
                //Even Rule 2 : -11
                endPosX = allNodes[i-10].position.x;
                endPosY = allNodes[i-10].position.y;
                endPosZ = allNodes[i-10].position.z;
                endPoint = new THREE.Vector3(endPosX, endPosY, endPosZ);
                end2PosX = allNodes[i-11].position.x;
                end2PosY = allNodes[i-11].position.y;
                end2PosZ = allNodes[i-11].position.z;
                end2Point = new THREE.Vector3(end2PosX, end2PosY, end2PosZ);
                //Grab Position for an endPoint


                //if the node is a base 10 do not check rule 2
                //aka right side of grid
                if(i % 10 === 0){
                    //Base 10 do not paint bottom left line

                    //Paint Line
                    //Initialize Connector
                    let connector4 = document.createElement('a-entity');
                    let connectorName = "connector4-" + i;
                    connector4.setAttribute('id',connectorName);
                    connector4.setAttribute('scale','5 1 5');
                    connector4.classList.add("connector");
                    connector4.setAttribute('line', {start: startPoint, end: endPoint, color: 'white'});
                    //Attach to parent entity
                    connectorParent.appendChild(connector4);

                    //Create Move Animation to Attach to Player On Board
                    let animName = "animation__node" + i + "to-node" + (i-10);
                    let animName2 = "animation__node" + (i-10) + "to-node" + i;
                    let startEvents = "node" + i + "to-node" + (i-10);
                    let startEvents2 = "node" + (i-10) + "to-node" + i;
                    let stopEventsMove = "playerMoveStop";

                    //Player Move To Down Right
                    let playerMoveFromNodeToDownRight = {
                        property: 'position',
                        to: {x: endPoint.x*5, y: endPoint.y, z: endPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents,
                        pauseEvents: stopEventsMove, 
                    };
                    //Player Move From Down Left
                    let playerMoveFromDownLeftToNode = {
                        property: 'position',
                        to: {x: startPoint.x*5, y: startPoint.y, z: startPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents2,
                        pauseEvents: stopEventsMove, 
                    };

                    //Apply Animations to Player
                    playerOnBoard.setAttribute(animName, playerMoveFromNodeToDownRight);
                    playerOnBoard.setAttribute(animName2, playerMoveFromDownLeftToNode);
                } else {
                //Even Rule 2 : -11
                    //Grab Position for an endPoint

                    //Paint Line
                    //Initialize Connector
                    let connector4 = document.createElement('a-entity');
                    let connectorName = "connector4-" + i;
                    connector4.setAttribute('id',connectorName);
                    connector4.setAttribute('scale','5 1 5');
                    connector4.classList.add("connector");
                    connector4.setAttribute('line', {start: startPoint, end: endPoint, color: 'white'});
                    //Attach to parent entity
                    connectorParent.appendChild(connector4);

                    //Paint Line
                    //Initialize Connector
                    let connector5 = document.createElement('a-entity');
                    let connector5Name = "connector5-" + i;
                    connector5.setAttribute('id',connector5Name);
                    connector5.setAttribute('scale','5 1 5');
                    connector5.classList.add("connector");
                    connector5.setAttribute('line', {start: startPoint, end: end2Point, color: 'white'});
                    //Attach to parent entity
                    connectorParent.appendChild(connector5);

                    //Create Move Animation to Attach to Player On Board
                    let animName = "animation__node" + i + "to-node" + (i-10);
                    let animName2 = "animation__node" + (i-10) + "to-node" + i;
                    let animName3 = "animation__node" + i + "to-node" + (i-11);
                    let animName4 = "animation__node" + (i-11) + "to-node" + i;
                    let startEvents = "node" + i + "to-node" + (i-10);
                    let startEvents2 = "node" + (i-10) + "to-node" + i;
                    let startEvents3 = "node" + i + "to-node" + (i-11);
                    let startEvents4 = "node" + (i-11) + "to-node" + i;
                    let stopEventsMove = "playerMoveStop";

                    //Player Move To Down Right
                    let playerMoveFromNodeToDownRight = {
                        property: 'position',
                        to: {x: endPoint.x*5, y: endPoint.y, z: endPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents,
                        pauseEvents: stopEventsMove, 
                    };
                    //Player Move From Down Left
                    let playerMoveFromDownLeftToNode = {
                        property: 'position',
                        to: {x: startPoint.x*5, y: startPoint.y, z: startPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents2,
                        pauseEvents: stopEventsMove, 
                    };

                    //Player Move To Up Left
                    let playerMoveFromNodeToUpLeft = {
                        property: 'position',
                        to: {x: end2Point.x*5, y: end2Point.y, z: end2Point.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents3,
                        pauseEvents: stopEventsMove, 
                    };
                    //Player Move From Down Left
                    let playerMoveFromDownRightToNode = {
                        property: 'position',
                        to: {x: startPoint.x*5, y: startPoint.y, z: startPoint.z*5},
                        dur: 2000,
                        delay: 0,
                        loop: 'false',
                        dir: 'normal',
                        easing:'easeInOutSine',
                        elasticity: 400,
                        autoplay: 'false',
                        enabled: 'true',
                        startEvents: startEvents4,
                        pauseEvents: stopEventsMove, 
                    };

                    //Apply Animations to Player
                    playerOnBoard.setAttribute(animName, playerMoveFromNodeToDownRight);
                    playerOnBoard.setAttribute(animName2, playerMoveFromDownLeftToNode);
                    playerOnBoard.setAttribute(animName3, playerMoveFromNodeToUpLeft);
                    playerOnBoard.setAttribute(animName4, playerMoveFromDownRightToNode);


                }
            }
        }//End Even Column



        //Odd Column
        else {
            //console.log('Odd Hit' + i);
//if Odd
//Odd Row, UpRight +11
//Odd Row, UpLeft +10
//Odd Row, DownRight -9
//Odd Row, DownLeft -10
        }//End Odd Column
    }
}//End gridLines

//A Function that creates an array filled with the xy points of a grid for which to reach into when creating the nodes
//Node Particles
//WILL IMPORT nodeOffset VARIABLE
//Ran 1st
function gridNewFill(level,newGridObject,gridSize) {
    //Grid Generator
    //Create Grid Entity
    //Initialize Grid
    var grid = document.createElement('a-entity');
    //Use imported level for grid name
    //var gridName = "grid" + level;
    var gridName = "testGrid";
    grid.setAttribute('id',gridName);
    //Temp Scale
    grid.setAttribute('scale','5 1 5');
    //Grid Offset
    //Set Position
    var posX = 0; //Starting from 0 in both directions, create 1 every 3
    var posY = 0.1; //Fixed
    var posZ = 0; //Starting from 0 in both directions, create 1 every 3
    var positionVec3 = new THREE.Vector3(posX, posY, posZ);
    grid.setAttribute('position',positionVec3);
    //Attach to parent entity
    sceneEl.appendChild(grid);

    //Will Hold an array of NodePos
    var gridArray = [];
    //Will hold the XZ Cords to use
    var nodePos = [];
    //gridSize - equal side of a square for perimeter in generating nodes
    //nodeOffset - default 6, the spacing inbetween each node
    //Temp
    var nodeOffset = 6;
    //Default for Shifting the Row
    var nodeShift = false;


    //Column Creator
    for (let i=0; i < gridSize; i++) {
    //Generate an xz position and store in gridArray as a nodePos
    //Position will be half gridSize, go through both X / Z 's  + / - directions by half gridSize with one direction 0, then that 0 direction now go half gridSize both directions. Do that for all basic orientations
    //Grid will basicly be varying XZ points |constant Y| on a consistent 3 by x grid
    //Node 1
    //x = 3 ; Z = 0 ; Right Node
    //x = 0 ; Z = 3 ; Back Node
    //x = -3 ; Z = 0 ; Left Node
    //x = 0 ; Z = -3 ; Front Node


    //Generate a row of nodePos with the row being a fixed X or Z direction
    //The row will have XYZ nodes with X or Z being a difference of 6 and starting at 0 or 3
    //Alter a second row to offset the direction of the non-fixed X/Z by +-3
    //Alter between +3 and -3 every other secondary row
    //Create gridSize amount of rows
    //Each row is a total amount of gridSize

    //Only need the Coords for 2 types of directions
    //Offset and Regular. Will use numbers in both + and - directions
    //Generate a row and choose the offset or regular set

        //Adjusted to spawn Nodes in -Z direction
        let newPosZ = (i * nodeOffset/2) * -1;
        let offshiftAmount = 0;

        //Every other Row will be shifted
        if(i === 0 || i % 2 === 0){
            nodeShift = false;
            //Test Logging
            //console.log(nodeShift);
        } else {
            nodeShift = true;
            //Test Logging
            //console.log(nodeShift);
        }//End Row Shift

        //Row Creator
        for (let j=0; j < gridSize; j++) {
            if (nodeShift) {
                let newPosX = j * nodeOffset + nodeOffset/2;
                offshiftAmount = nodeOffset/2;
                let newVec3 = new THREE.Vector3(newPosX, posY, newPosZ);

                //Create an Object to store in main arrary
                let nodeObject = {id: i, position: newVec3, offset: nodeShift, offsetAmount: offshiftAmount, connectedNodes: false};
                //Append to nodePos
                //nodePos.push(nodeObject);
                allNodes.push(nodeObject);


                //Test Logging
                //console.log(newVec3);
            } else {
                let newPosX = j * nodeOffset;
                let newVec3 = new THREE.Vector3(newPosX, posY, newPosZ);
                //Create an Object to store in main arrary
                let nodeObject = {id: i, position: newVec3, offset: nodeShift, offsetAmount: offshiftAmount, connectedNodes: false};
                //Append to nodePos
                //nodePos.push(newVec3);
                allNodes.push(nodeObject);
                //Test Logging
                //console.log(newVec3);
            }
        }//End Row
    }//End Column

    //return nodePos;
    //console.log(allNodes);
    //An imported object to be returned later for storing and spawning
    //newGridObject = {name: gridName, entity: grid, position: positionVec3};


}

//Node Particles
//Ran 2nd
function nodeGridGen(gridSize, allNodes) {
    //Nodes Generator

    //Node area to spawn
    let gridEntity = document.getElementById('testGrid');

    //Initialize new nodes
    for (let i = 0; i < allNodes.length; i++) {
        //Node Parent
        //Create node Parent Entity
        let nodeParent = document.createElement('a-entity');
        nodeParent.classList.add("nodeParent");
        //Random Delay
        let delay = (Math.random() * 4) * 100;


        //Node
        //Create node Entity
        let node = document.createElement('a-entity');
        //GLTF Model
        //node.setAttribute('gltf-model', '#purplegrass');
        node.classList.add("node");
        node.classList.add("clickable");
        let nodeName = "node"+i;
        node.setAttribute('id', nodeName);
        //Geometry
        //Temp - Create basic circles with a radius of 1
        let radiusAmount = 1;
        let segmentAmount = 10;

        //Set primitive shape
        node.setAttribute('geometry', {primitive: 'circle', radius: radiusAmount, segments: segmentAmount, thetaStart: 0, thetaLength: 360});
        //Temp Opacity
        //node.setAttribute('material', {opacity: 0.25});
        //Set Default Rotation
        node.setAttribute('rotation', {x: -90, y: 0, z: 0});
        //Grid Placement
        //Random Position anywhere withi around user

        //Set Position
        let posX = allNodes[i].position.x;
        let posY = allNodes[i].position.y;
        let posZ = allNodes[i].position.z;
        let positionVec3 = new THREE.Vector3(posX, posY, posZ);
        node.setAttribute('position', positionVec3);

        //Set Attribute if node is an odd/even colum
        node.setAttribute('offset', allNodes[i].offset);

        //Node ID
        //Add a Sub Node for Array Identification by hovering text
        //Create node Entity
        let nodeId = document.createElement('a-entity');
        let newPosY = posY + 1;
        let position2Vec3 = new THREE.Vector3(posX, newPosY, posZ);
        nodeId.setAttribute('position', position2Vec3);
        nodeId.setAttribute('text', {value:i, width: 30, align: 'center'});
        //nodeId.setAttribute('look-at','#player');
        //Set Default Rotation
        nodeId.setAttribute('rotation', {x: -60, y: 0, z: 0});
        //nodeId.setAttribute('material', {opacity: 0.25});

        //Node Pop Up
        //Scale tiny and move up high when not in use, anim in
        //Create node Entity
        let nodePopUp = document.createElement('a-entity');
        let position3Vec3 = new THREE.Vector3(0, 0, 50);
        let stopEvents = "popUpStop";
        let nodePopUpName = "node"+i+"popUp";
        nodePopUp.setAttribute('id', nodePopUpName);
        nodePopUp.setAttribute('position', position3Vec3);
        nodePopUp.setAttribute('geometry', {height: 30, width: 10});
        //nodePopUp.setAttribute('text', {value:i + " : Pop Up", width: 50, align: 'center'});
        nodePopUp.setAttribute('scale','.111 .111 .111');
        nodePopUp.setAttribute('look-at','#player');
        //nodePopUp.setAttribute('rotation', {x: 30, y: 0, z: -30});
        //Set Basic Material
        nodePopUp.setAttribute('material', {color: '#1fceac', emissive: '#1fceac', emissiveIntensity: 0, opacity: 0, side: 'both'});

        //console.log(node.id);
        //Set Event Listener for Main Node which prompts Pop Up Anims
        node.addEventListener('mouseenter', function(){
            let id = this.id;
            let nodePopUpCurrent = document.getElementById(id + "popUp");
            console.log(nodePopUpCurrent);
            nodePopUpCurrent.emit('nodeEnter',{});
        });
        node.addEventListener('mouseleave', function(){
            //console.log('mouseleave');
            let id = this.id;
            let nodePopUpCurrent = document.getElementById(id + "popUp");
            nodePopUpCurrent.emit('nodeLeave',{});
        });
        nodePopUp.addEventListener('nodeEnter', function(){
            console.log('nodeEnter');
            console.log(this.id);
        });
        nodePopUp.addEventListener('nodeLeave', function(){
            console.log('nodeLeave');
        });

/* #return 
        //These Anims need to be generated when cursor targets a different entity hence needing event-set instead 
node.setAttribute('event-set__popUpPopInPos', {'_event': 'mouseenter', '_target':nodePopUpName, 'animation.property':'position', 'animation.to':{x:0,y:10,z:0}, 'animation.dur':2000, 'animation.loop':'false', 'animation.dir':'normal', 'animation.easing':'easeInOutSine', 'animation.elasticity':400,});*/





//secretsUI.setAttribute('text', {value: '* Secrets Found *\n 0 / 4\n', color: 'white', align: 'center'});

/*
//Animation  Testing
let playerHover = document.getElementById('playerHover');
//Player Move 
let playerMove= {
    property: 'material.opacity',
    from: 0.25,
    to: 0.75,
    dur: 2000,
    delay: 0,
    loop: 'false',
    dir: 'alternate',
    easing:'easeInOutSine',
    elasticity: 400,
    autoplay: 'false',
    enabled: 'true',
    startEvents: "playerMove",
    resumeEvents: "playerMove",
    pauseEvents: "playerMoveStop", 
};
//Apply Animations to Player
playerHover.setAttribute("animation__node-to-node", playerMove);
*/

//Attach to scene with a delay, otherwise wont work properly
let spawnTimeoutAnimSet = setTimeout(function () {

    //Set Animation Set on PopUp and create an addeventlistener for mouseenter and mouseleave to emit event which fires animation sequence
    let popUpInPos = {
    property: 'position',
    to: {x:0,y:0,z:15},
    dur: 2000,
    delay: 0,
    loop: 'false',
    dir: 'normal',
    easing: 'easeInOutSine',
    elasticity: 400,
    autoplay: 'false',
    enabled: 'true',
    startEvents: 'nodeEnter',
    pauseEvents: 'popUpStop',
    }; 
    let popUpInScale = {
    property: 'scale',
    to: {x:.111,y:.111,z:.111},
    dur: 2000,
    delay: 0,
    loop: 'false',
    dir: 'normal',
    easing: 'easeInOutSine',
    elasticity: 400,
    autoplay: 'false',
    enabled: 'true',
    startEvents: 'nodeEnter',
    pauseEvents: 'popUpStop',
    }; 
    let popUpInOpacity = {
    property: 'material.opacity',
    to: 0.9,
    dur: 2000,
    delay: 0,
    loop: 'false',
    dir: 'normal',
    easing: 'easeInOutSine',
    elasticity: 400,
    autoplay: 'false',
    enabled: 'true',
    startEvents: 'nodeEnter',
    pauseEvents: 'popUpStop',
    }; 
    let popUpOutPos = {
    property: 'position',
    to: {x:0,y:0,z:50},
    dur: 500,
    delay: 0,
    loop: 'false',
    dir: 'normal',
    easing: 'easeInOutSine',
    elasticity: 400,
    autoplay: 'false',
    enabled: 'true',
    startEvents: 'nodeLeave',
    pauseEvents: 'popUpStop',
    }; 
    let popUpOutScale = {
    property: 'scale',
    to: {x:.00001,y:.00001,z:.00001},
    dur: 1000,
    delay: 0,
    loop: 'false',
    dir: 'normal',
    easing: 'easeInOutSine',
    elasticity: 400,
    autoplay: 'false',
    enabled: 'true',
    startEvents: 'nodeLeave',
    pauseEvents: 'popUpStop',
    }; 
    let popUpOutOpacity = {
    property: 'material.opacity',
    to: 0,
    dur: 1000,
    delay: 0,
    loop: 'false',
    dir: 'normal',
    easing: 'easeInOutSine',
    elasticity: 400,
    autoplay: 'false',
    enabled: 'true',
    startEvents: 'nodeLeave',
    pauseEvents: 'popUpStop',
    }; 

    //Apply Animations to Evey copy of the pop up per node
    nodePopUp.setAttribute("animation__popUpInPos", popUpInPos);
    nodePopUp.setAttribute("animation__popUpInScale", popUpInScale);
    nodePopUp.setAttribute("animation__popUpInOpacity", popUpInOpacity);
    nodePopUp.setAttribute("animation__popUpOutPos", popUpOutPos);
    nodePopUp.setAttribute("animation__popUpOutScale", popUpOutScale);
    nodePopUp.setAttribute("animation__popUpOutOpacity", popUpOutOpacity);

}, 25); //Delay






//Attach to scene with a random delay
var spawnTimeoutAppend = setTimeout(function () {
    //Attach to parent entity
    gridEntity.appendChild(nodeParent);
    //Attach to parent entity
    nodeParent.appendChild(node);
    //Attach to parent entity
    node.appendChild(nodePopUp);
    //Attach to parent entity
    nodeParent.appendChild(nodeId);
}, 0); //Delay
    }//nodes Loop
}//nodes Function

    },//End Init

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
});//node-grid-gen Component
//
//Node Travel Component
AFRAME.registerComponent('player-travel', {
//schema: {
    //bar: {type: 'number'},
    //baz: {type: 'string'}
//},

init: function () {
    //Do something when component first attached.
    //Called once when the component is initialized. Used to set up initial state and instantiate variables.
    var sceneEl = document.querySelector('a-scene'); 
    var element = this.el; 
    var allNodes = [];
    let player = document.getElementById('player');
    let playerOnBoard = document.getElementById('playerOnBoard');
    //Set Default Location to Node 1 for Player On Board
    //var currentNode;
    //let positionVec3 = node0.object3D.position;
    var allNodes; 
    var currentNode; 
    var currentNodeNum;
    var nextNodeNum;
    //Test Logging
    //console.log(positionVec3);
    //Current Grid Scale
    const gridScale = 5;

    //Set Position
    //let posX = node0.object3D.position.x;
    //let posY = node0.object3D.position.y+20;
    //let posZ = node0.object3D.position.z;
    //let newPosVec3 = new THREE.Vector3(posX, posY, posZ);
    //playerOnBoard.setAttribute('position',newPosVec3);
    //Store all Nodes on Scene

    //var allNodes = [];
    //allNodes = document.querySelectorAll('.nodes');
    //var nodesTotal = allNodes.length;
    //Test Logging
    //console.log(nodesTotal);

    //Animation  Testing
    let playerHover = document.getElementById('playerHover');
    //Player Move 
    let playerMove= {
        property: 'material.opacity',
        from: 0.25,
        to: 0.75,
        dur: 2000,
        delay: 0,
        loop: 'false',
        dir: 'alternate',
        easing:'easeInOutSine',
        elasticity: 400,
        autoplay: 'false',
        enabled: 'true',
        startEvents: "playerMove",
        resumeEvents: "playerMove",
        pauseEvents: "playerMoveStop", 
    };
    //Apply Animations to Player
    playerHover.setAttribute("animation__node-to-node", playerMove);

    //material="color: #1fceac; emissive: #1fceac; emissiveIntensity: 1; opacity: 0.25; side: both;"
    
    //Locomotion anims needed for
    //0 to 1
    //0 to 2
    //0 to 3
    //0 to 4
    //1 to 0
    //2 to 0
    //3 to 0
    //4 to 0

//Testing Timeout and Setinterval
var testTimeout = setTimeout(function () {
    allNodes = document.querySelectorAll('.node'); 
    currentNode = allNodes[0]; 
    currentNodeNum = 0;
    console.log("Total Nodes in Grid :");
    console.log(allNodes.length);
    //console.log(allNodes[10].getAttribute('position'));
}, 1500); //Delay

//Animation Begin
this.el.addEventListener('animationbegin', function(e){
    //Test Logging
    console.log('animation begin');
    //Reset Animation
    this.components[e.detail.name].animation.reset();


});
//Animation Complete
this.el.addEventListener('animationcomplete', function(){
    //this.components[e.detail.name].animation.reset();
    console.log('animation complete');

});

//In Game Movement
//player.emit('51-up-yes',{});
//In Game Movement
//player.emit('52-top-left',{});
//In Game Movement
//player.emit('53-top-right',{});
//In Game Movement
//player.emit('54-menu-special-ok',{});
//55 Button On Button - #Special #Later
//In Game Movement
//player.emit('56-bottom-left',{});
//In Game Movement
//player.emit('57-bottom-right',{});
//In Game Movement
//player.emit('58-down-no',{});

//If any correct passcode is entered, figure out what node the user is on to determine where it can move


/*
event-set__enter="_event: mouseenter;
_target: #node0Hover;
animation.property: material.opacity;
animation.from: 0;
animation.to: 0.9;
animation.dur: 1000;
animation.delay: 0;
animation.dir: normal;
animation.loop: false;
animation.easing: easeInOutSine;
animation.elasticity: 400;
animation.enabled: true;"
event-set__leave="_event: mouseleave;
_target: #node0Hover;
animation.property: material.opacity;
animation.from: 0.9;
animation.to: 0;
animation.dur: 1000;
animation.delay: 0;
animation.dir: normal;
animation.loop: false;
animation.easing: easeInOutSine;
animation.elasticity: 400;
animation.enabled: true;"
>


if(allNodes[i+10]){//Next Row Exists
    if(i % 10 === 0){
        //Base 10 do not paint top left line
    } else {
        //Even Rule 2 : +9
        //Paint Line Up Right
//Prev Row Exists
if(allNodes[i-10]){
    if(i % 10 === 0){
        //Base 10 do not paint bottom left line
    } else {
    //Even Rule 2 : -11
*/
//if Even
//Even Row, UpRight +10
//Even Row, UpLeft +9
//Even Row, DownRight -10
//Even Row, DownLeft -11
//
//except for 0 - limited to UpRight
//except for 1-9 - limited to UpRight & UpLeft
//except for 20 - limited to UpRight & DownRight
//except for 40 - limited to UpRight & DownRight
//except for 60 - limited to UpRight & DownRight
//except for 80 - limited to UpRight & DownRight
//All Else UpLeft UpRight DownLeft DownRight

//if Odd
//Odd Row, UpRight +11
//Odd Row, UpLeft +10
//Odd Row, DownRight -9
//Odd Row, DownLeft -10
//
//except for 19 - limited to UpLeft
//except for 39 - limited to UpLeft & DownLeft
//except for 59 - limited to UpLeft & DownLeft
//except for 79 - limited to UpLeft & DownLeft
//except for 99 - limited to DownLeft
//except for 90-98 - limited to DownLeft & DownRight
//All Else UpLeft UpRight DownLeft DownRight
//Controller Hits 52 Top Left
this.el.addEventListener('52-top-left', function(){
    //Do Somthing on Click
    //console.log(currentNodeNum);
    //console.log(currentNode.object3D.position);
    //Can travel up Left +9

    console.log(currentNode.getAttribute('offset'));

    //Current Node Check and Move
    //Check if we are on an even or odd row
    if (currentNode.getAttribute('offset') === 'false'){//Even Row
       //Node 0
        if (currentNode === allNodes[0]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[20]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[40]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[60]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[80]) {
            //Disabled with current Grid Layout
        } else {
            //Allowed for all 4 directional travel
            nextNodeNum = currentNodeNum + 9;
            console.log(currentNodeNum);
            console.log(nextNodeNum);
            console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
            playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
            currentNodeNum = nextNodeNum;
            currentNode = allNodes[currentNodeNum];
            playerHover.emit('playerMove', {});
        }
    } else {//Odd Row
       //Node 90
        if (currentNode === allNodes[90]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[91]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[92]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[93]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[94]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[95]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[96]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[97]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[98]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[99]) {
            //Disabled with current Grid Layout
        } else {
            //Allowed for all 4 directional travel
            nextNodeNum = currentNodeNum + 10;
            console.log(currentNodeNum);
            console.log(nextNodeNum);
            console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
            playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
            currentNodeNum = nextNodeNum;
            currentNode = allNodes[currentNodeNum];
            playerHover.emit('playerMove', {});

        }
    }
//if Even
//Even Row, UpRight +10
//Even Row, UpLeft +9 ************
//Even Row, DownRight -10
//Even Row, DownLeft -11
//if Odd
//Odd Row, UpRight +11
//Odd Row, UpLeft +10 ************
//Odd Row, DownRight -9
//Odd Row, DownLeft -10
});

//Controller Hits 53 Top Right node10to-node21
this.el.addEventListener('53-top-right', function(){
    //Do Somthing on Click
    //let startEvents = "node" + i + "to-node" + (i+10);
    //let startEvents2 = "node" + (i+10) + "to-node" + i;

    //Current Node Check and Move
    //Check if we are on an even or odd row
    if (currentNode.getAttribute('offset') === 'false'){//Even Row
        //Rare instance where every even row has an up right connection
        nextNodeNum = currentNodeNum + 10;
        console.log(currentNodeNum);
        console.log(nextNodeNum);
            console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
        playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
        currentNodeNum = nextNodeNum;
        currentNode = allNodes[currentNodeNum];
        playerHover.emit('playerMove', {});

/* Move Orbit Controls with Player Movement, need to animate instead
//Testing Timeout and Setinterval
var testTimeout = setTimeout(function () {
    //Update #player camera orbit-controls with new target vector

    let pobPOSx = currentNode.object3D.position.x*gridScale;
    let pobPOSy = currentNode.object3D.position.y*gridScale;
    let pobPOSz = currentNode.object3D.position.z*gridScale;
    let pobPOS = new THREE.Vector3(pobPOSx, pobPOSy, pobPOSz);
    player.setAttribute('orbit-controls', {target: pobPOS});
}, 0); //Delay
*/



/* #return */




    } else {//Odd Row
       //Nodes
        if (currentNode === allNodes[19]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[39]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[59]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[79]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[90]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[91]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[92]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[93]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[94]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[95]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[96]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[97]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[98]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[99]) {
            //Disabled with current Grid Layout
        } else {
            //Allowed for all 4 directional travel
            nextNodeNum = currentNodeNum + 11;
            console.log(currentNodeNum);
            console.log(nextNodeNum);
            console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
            playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
            currentNodeNum = nextNodeNum;
            currentNode = allNodes[currentNodeNum];
            playerHover.emit('playerMove', {});

        }
    }

//if Even
//Even Row, UpRight +10 ************
//Even Row, UpLeft +9 
//Even Row, DownRight -10
//Even Row, DownLeft -11
//if Odd
//Odd Row, UpRight +11 ************
//Odd Row, UpLeft +10 
//Odd Row, DownRight -9
//Odd Row, DownLeft -10
});

//Controller Hits 56 Bottom Left
this.el.addEventListener('56-bottom-left', function(){
    //Do Somthing on Click

    //Current Node Check and Move
    //Check if we are on an even or odd row
    if (currentNode.getAttribute('offset') === 'false'){//Even Row
       //Node 0
        if (currentNode === allNodes[0]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[1]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[2]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[3]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[4]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[5]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[6]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[7]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[8]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[9]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[20]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[40]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[60]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[80]) {
            //Disabled with current Grid Layout
        } else {
            //Allowed for all 4 directional travel
            nextNodeNum = currentNodeNum - 11;
            console.log(currentNodeNum);
            console.log(nextNodeNum);
            console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
            playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
            currentNodeNum = nextNodeNum;
            currentNode = allNodes[currentNodeNum];
            playerHover.emit('playerMove', {});
        }
    } else {//Odd Row
        //Allowed for all 4 directional travel
        nextNodeNum = currentNodeNum - 10;
        console.log(currentNodeNum);
        console.log(nextNodeNum);
        console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
        playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
        currentNodeNum = nextNodeNum;
        currentNode = allNodes[currentNodeNum];
        playerHover.emit('playerMove', {});
    }
//if Even
//Even Row, UpRight +10 
//Even Row, UpLeft +9 
//Even Row, DownRight -10
//Even Row, DownLeft -11 ************
//if Odd
//Odd Row, UpRight +11 
//Odd Row, UpLeft +10 
//Odd Row, DownRight -9
//Odd Row, DownLeft -10 ************
});

//Controller Hits 57 Bottom Right
this.el.addEventListener('57-bottom-right', function(){
    //Do Somthing on Click
    //Current Node Check and Move
    //Current Node Check and Move
    //Check if we are on an even or odd row
    if (currentNode.getAttribute('offset') === 'false'){//Even Row
       //Node 0
        if (currentNode === allNodes[0]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[1]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[2]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[3]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[4]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[5]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[6]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[7]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[8]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[9]) {
            //Disabled with current Grid Layout
        } else {
            //Allowed for all 4 directional travel
            nextNodeNum = currentNodeNum - 10;
            console.log(currentNodeNum);
            console.log(nextNodeNum);
            console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
            playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
            currentNodeNum = nextNodeNum;
            currentNode = allNodes[currentNodeNum];
            playerHover.emit('playerMove', {});
        }
    } else {//Odd Row
       //Node 90
        if (currentNode === allNodes[19]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[39]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[59]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[79]) {
            //Disabled with current Grid Layout
        }  else if (currentNode === allNodes[99]) {
            //Disabled with current Grid Layout
        } else {
            //Allowed for all 4 directional travel
            nextNodeNum = currentNodeNum - 9;
            console.log(currentNodeNum);
            console.log(nextNodeNum);
            console.log("node" + currentNodeNum + "to-node" + nextNodeNum);
            playerOnBoard.emit("node" + currentNodeNum + "to-node" + nextNodeNum, {});
            currentNodeNum = nextNodeNum;
            currentNode = allNodes[currentNodeNum];
            playerHover.emit('playerMove', {});

        }
    }
//if Even
//Even Row, UpRight +10 
//Even Row, UpLeft +9 
//Even Row, DownRight -10 ************
//Even Row, DownLeft -11 
//if Odd
//Odd Row, UpRight +11 
//Odd Row, UpLeft +10 
//Odd Row, DownRight -9 ************
//Odd Row, DownLeft -10 
});

//In Game Movement
//player.emit('',{});
//In Game Movement
//player.emit('57-bottom-right',{});
/* #return */


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
