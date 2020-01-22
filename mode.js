let DRAGGABLE_MODE = "drag mode";
let SET_CLAUSE_FALSE_MODE = "set clause false";
let SET_CLAUSE_TRUE_MODE = "set clause true";

var MODE = DRAGGABLE_MODE;

function setMode(newMode){
	MODE = newMode;
	console.log("NEW MODE", MODE);
	ColourSelectedButton();
}
