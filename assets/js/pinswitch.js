//Pin Switch
//by Minty Crisp @ MintyCrisp.com

let pinSwitch = document.getElementById('pinSwitch');
let mainStick = document.getElementById('mainStick');

let toggle = true;

pinSwitch.addEventListener('click', function(){

if(toggle){
mainStick.classList.toggle('sticky');
pinSwitch.style.setProperty('color', '#3EB489');
//Toggle
toggle = false;
} else {

mainStick.classList.toggle('sticky');
pinSwitch.style.setProperty('color', '#C14B76');
//Toggle
toggle = true;
}

});