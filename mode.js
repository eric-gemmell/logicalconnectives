let DRAGGABLE_MODE = "drag mode";
let CREATE_EQUIVALENCE_RELATIONS_MODE = "create equivalence relations";
let CREATE_OPPOSITE_RELATIONS_MODE = "create opposite relations";
let CREATE_AND_RELATIONS_MODE = "create and relations";
let SET_CLAUSE_FALSE_MODE = "set clause false";
let SET_CLAUSE_TRUE_MODE = "set clause true";
let DELETE_RELATION_MODE = "delete relation mode"; 
var MODE = DRAGGABLE_MODE;

function ErasePreviousMode(){
	clickedClauses = [];
}
function setMode(newMode){
	ErasePreviousMode();
	MODE = newMode;
	console.log("NEW MODE", MODE);
	ColourSelectedButton();
}
