var allBoxes = [];
var check = false;
var curBox;
var widthF;
var heightF;
var curValR = 0;
var curValG = 0;
var curValB = 0;

var allBoxes = document.getElementsByClassName("draggableBox");
var display = document.getElementById("display");
var categories = document.getElementsByTagName("p");




addEventListener("mousemove",movement);
addEventListener("mouseup",drop);
addEventListener("keydown", change);

for (var i=0; i<allBoxes.length; i++) {
	allBoxes[i].addEventListener("mousedown",checkif);
	allBoxes[i].addEventListener("dblclick", textEdit);
}





// DRAG & DROP

function movement(e) {
	if (check) {
		posX = (e.clientX-widthF/2).toString()+"px";
		posY = (e.clientY-heightF/2).toString()+"px";
		curBox.style.left = posX;
		curBox.style.top = posY;
	
	}
}

function drop() {
	check=false;
	curBox.style.color="#CCC"
}

function checkif(e) {
	check=true;
	curBox = e.target;
	widthF = parseInt(getComputedStyle(curBox).width);
	heightF = parseInt(getComputedStyle(curBox).height);
	zDisplay();
	sizeDisplay();
	colorDisplay();



}




// COLOR CHANGE


function change(e){
	
	var currentKey = e.keyCode;
	widthF = parseInt(getComputedStyle(curBox).width);
	heightF = parseInt(getComputedStyle(curBox).height);
	padTop = parseInt(getComputedStyle(curBox).paddingTop);
	zInd = parseInt(getComputedStyle(curBox).zIndex);


	if (currentKey == 37) {

		zInd -= 1;
		
		if (zInd > 3){
			zInd = 3;
		} else if (zInd < 1){
			zInd = 1;
		} 

		curBox.style.zIndex = zInd;
		zDisplay();

	}

	if (currentKey == 39) {
		
		zInd += 1;

		if (zInd >= 4){
			zInd = 3;
		} else if (zInd <= 0){
			zInd = 0;
		} 
		
		curBox.style.zIndex = zInd;
		zDisplay();
		
	}
	

	if (currentKey == 38) {
		currentPosX = parseInt(getComputedStyle(curBox).left);
		currentPosY = parseInt(getComputedStyle(curBox).top);
		wInc = widthF + 10;
		hInc = heightF + 5;
		pTop = padTop +5;
		posIncX = currentPosX -5;
		posIncY = currentPosY -2.5;
		curBox.style.top = posIncY.toString()+"px";
		curBox.style.left = posIncX.toString()+"px";
		curBox.style.width = wInc.toString()+"px";
		curBox.style.height = hInc.toString()+"px";
		curBox.style.paddingTop = pTop.toString()+"px";
		sizeDisplay();

	}

	if (currentKey == 40){
		currentPosX = parseInt(getComputedStyle(curBox).left);
		currentPosY = parseInt(getComputedStyle(curBox).top);
		wInc = widthF - 10;
		hInc = heightF - 5;
		pTop = padTop - 5;
		posIncX = currentPosX +5;
		posIncY = currentPosY +2.5;
		curBox.style.top = posIncY.toString()+"px";
		curBox.style.left = posIncX.toString()+"px";
		curBox.style.width = wInc.toString()+"px";
		curBox.style.height = hInc.toString()+"px";
		curBox.style.paddingTop = pTop.toString()+"px";
		sizeDisplay();
	} 

	if (currentKey == 84) {
		bColor = getComputedStyle(curBox).backgroundColor;
		stringToInt(bColor);
		curValR -= 5;
		curBox.style.backgroundColor = "rgb("+curValR+","+curValG+","+curValB+")";
		colorDisplay();
	}

	if (currentKey == 82) {
		bColor = getComputedStyle(curBox).backgroundColor;
		stringToInt(bColor);
		curValR += 5;
		curBox.style.backgroundColor = "rgb("+curValR+","+curValG+","+curValB+")"
		colorDisplay();
	}

	if (currentKey == 71) {
		bColor = getComputedStyle(curBox).backgroundColor;
		stringToInt(bColor);
		curValG -= 5;
		curBox.style.backgroundColor = "rgb("+curValR+","+curValG+","+curValB+")"
		colorDisplay();
	}

	if (currentKey == 70) {
		bColor = getComputedStyle(curBox).backgroundColor;
		stringToInt(bColor);
		curValG += 5;
		curBox.style.backgroundColor = "rgb("+curValR+","+curValG+","+curValB+")"
		colorDisplay();
	}

	if (currentKey == 66) {
		bColor = getComputedStyle(curBox).backgroundColor;
		stringToInt(bColor);
		curValB -= 5;
		curBox.style.backgroundColor = "rgb("+curValR+","+curValG+","+curValB+")"
		colorDisplay();
	}

	if (currentKey == 86) {
		bColor = getComputedStyle(curBox).backgroundColor;
		stringToInt(bColor);
		curValB += 5;
		curBox.style.backgroundColor = "rgb("+curValR+","+curValG+","+curValB+")"
		colorDisplay();
	}	

	if (currentKey == 8) {
		curBox.parentNode.removeChild(curBox);
	}


} 


// EDITABLE getComputedStyle.backgroundColor

function stringToInt(str) {
	
	var newString = str.split("");
	var numValue = [];

	for (var chara of newString) {
		
		if (!isNaN(chara)) {
			numValue.push(chara);
		}
	}


	for (var i=0; i<Math.round(numValue.length/3)+1;i++) {
		if (numValue[i] == " ") {
			curValR = parseInt(numValue.slice(0,i).join(""));
		}
	}

	for (var i=3; i<numValue.length;i++) {
		if (numValue[i] == " ") {
			curValG = parseInt(numValue.slice(3,i).join(""));
			curValB = parseInt(numValue.slice(i+1,numValue.length).join(""));

		}
	}


} 



// Text Edit 



function textEdit(box) {

	box.target.innerHTML = "";
	var input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Input your text"
	box.target.appendChild(input);
	input.focus();
	input.style.outlineStyle = "1px solid white outset"
	input.style.width = "50%";
	
	input.onblur = function() {
		
		var newText = input.value;
		box.target.removeChild(input);
		box.target.innerHTML = newText;
	
	}

}





// DISPLAYS 


function zDisplay() {

	zInd = parseInt(getComputedStyle(curBox).zIndex);
	categories[0].textContent = "z-Index = " + zInd;

}

function sizeDisplay() {

	widthF = parseInt(getComputedStyle(curBox).width);
	heightF = parseInt(getComputedStyle(curBox).height);
	categories[1].textContent = "Height : " + heightF;
	categories[2].textContent = "Width : " + widthF;

}

function colorDisplay() {

	stringToInt(getComputedStyle(curBox).backgroundColor);
	categories[3].textContent = "Red value = " + curValR;
	categories[4].textContent = "Green value = " + curValG;
	categories[5].textContent = "Blue value = " + curValB;
 
}


// ADD ELEMENTS


var carre = document.getElementById("carre");
var cercle = document.getElementById("cercle");
var body = document.getElementById("container")

cercle.addEventListener("click",addCercle);
carre.addEventListener("click", addCarre);

function addCercle() {


	var newCircle = document.createElement("div");
	newCircle.style.position = "absolute";
	newCircle.style.top="30%";
	newCircle.style.left="44%";
	newCircle.style.width = "170px";
	newCircle.style.height = "110px";
	newCircle.style.borderTopRightRadius = "50%";
	newCircle.style.borderTopLeftRadius = "50%";
	newCircle.style.borderBottomLeftRadius = "50%";
	newCircle.style.borderBottomRightRadius = "50%";
	newCircle.style.fontSize = "40px";
	newCircle.style.cursor ="move";
	// newCircle.style.border = "1px solid black";
	newCircle.style.zIndex = "1";
	newCircle.style.backgroundColor = "#111";
	newCircle.style.paddingTop = "50px";
	newCircle.className = "draggableBox";
	newCircle.style.color = "#CCC";
	newCircle.style.textAlign = "center";

	body.appendChild(newCircle);

	allBoxes = document.getElementsByClassName("draggableBox");
	
for (var i=0; i<allBoxes.length; i++) {
	allBoxes[i].addEventListener("mousedown",checkif);
	allBoxes[i].addEventListener("dblclick", textEdit);
}

	curBox = newCircle;



}


function addCarre() {

	var newSquare = document.createElement("div");
	newSquare.style.position = "absolute";
	newSquare.style.top="30%";
	newSquare.style.left="44%";
	newSquare.style.width = "170px";
	newSquare.style.height = "110px";
	newSquare.style.fontSize = "40px";
	newSquare.style.cursor ="move";
	// newSquare.style.border = "1px solid black";
	newSquare.style.zIndex = "1";
	newSquare.style.backgroundColor = "#111";
	newSquare.style.paddingTop = "50px";
	newSquare.className = "draggableBox";
	newSquare.style.color = "#CCC";
	newSquare.style.textAlign = "center";

	body.appendChild(newSquare);

	allBoxes = document.getElementsByClassName("draggableBox");
	
	for (var i=0; i<allBoxes.length; i++) {
	allBoxes[i].addEventListener("mousedown",checkif);
	allBoxes[i].addEventListener("dblclick", textEdit);
}

	curBox = newSquare;
}








