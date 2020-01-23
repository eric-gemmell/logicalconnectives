let buttonIDs = {
	"equiv": "equivalence_link_button",
	"oppos": "opposite_link_button",
	"and": "and_link_button",
	"setFalse": "false_button",
	"setTrue": "true_button"
};
let buttons = {};

function AddEventListener(){
	$("#add_clause_text").keyup(function(event) {
		if (event.keyCode === 13) {
			var text = $("#add_clause_text").val();
			$("#add_clause_text").val("");
			var clause = {"id" : 0,"text": text,"pos":{"x":20,"y":30},"links":[]};
			CreateClause(clause);
		}
	})
}
function CreateClauseInput(root){
	let topBar = root.append("div")
		.attr("id","top_bar")
		.style("width","100vw")
		.style("height","100px");

	topBar.append("input")
		.attr("id","add_clause_text")
		.style("width","100%")
		.style("height","30px");
	
	AddEventListener();
	
	buttons.equiv = topBar.append("button")
		.attr("id",buttonIDs.equiv)
		.text("⇔")
		.style("width","50px")
		.style("height","40px")
		.style("font-size","30px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.on("click",function(){EquivButtonClicked()});
		
	buttons.oppos = topBar.append("button")
		.attr("id",buttonIDs.oppos)
		.text("!⇔")
		.style("width","50px")
		.style("height","40px")
		.style("font-size","30px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.on("click",function(){OpposButtonClicked()});

	buttons.and = topBar.append("button")
		.attr("id",buttonIDs.and)
		.text("and")
		.style("width","70px")
		.style("height","40px")
		.style("font-size","30px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.on("click",function(){AndButtonClicked()});
	
	buttons.setFalse = topBar.append("button")
		.attr("id",buttonIDs.setFalse)
		.text("false")
		.style("width","70px")
		.style("height","40px")
		.style("font-size","25px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.style("float","right")
		.on("click",function(){FalseButtonClicked()});

	buttons.setTrue = topBar.append("button")
		.attr("id",buttonIDs.setTrue)
		.text("true")
		.style("width","70px")
		.style("height","40px")
		.style("font-size","25px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.style("float","right")
		.on("click",function(){TrueButtonClicked()});
}

function EquivButtonClicked(){
	if(MODE == CREATE_EQUIVALENCE_RELATIONS_MODE){
		setMode(DRAGGABLE_MODE);
	}
	else{
		setMode(CREATE_EQUIVALENCE_RELATIONS_MODE);
	}
}

function OpposButtonClicked(){	
	if(MODE == CREATE_OPPOSITE_RELATIONS_MODE){
		setMode(DRAGGABLE_MODE);
	}
	else{
		setMode(CREATE_OPPOSITE_RELATIONS_MODE);
	}
}

function AndButtonClicked(){
	if(MODE == CREATE_AND_RELATIONS_MODE){
		setMode(DRAGGABLE_MODE);
	}
	else{
		setMode(CREATE_AND_RELATIONS_MODE);
	}
}

function FalseButtonClicked(){
	if(MODE == SET_CLAUSE_FALSE_MODE){
		setMode(DRAGGABLE_MODE);
	}
	else{
		setMode(SET_CLAUSE_FALSE_MODE);
	}
}

function TrueButtonClicked(){
	if(MODE == SET_CLAUSE_TRUE_MODE){
		setMode(DRAGGABLE_MODE);
	}
	else{
		setMode(SET_CLAUSE_TRUE_MODE);
	}
}

function ColourSelectedButton(){
	Object.keys(buttons).forEach(button => {
		buttons[button].style("background-color","white");
	});
	if(MODE == SET_CLAUSE_FALSE_MODE){
		buttons.setFalse.style("background-color","steelblue");
	}
	else if(MODE == SET_CLAUSE_TRUE_MODE){
		buttons.setTrue.style("background-color","steelblue");
	}
	else if(MODE == CREATE_EQUIVALENCE_RELATIONS_MODE){
		buttons.equiv.style("background-color","steelblue");
	}
	else if(MODE == CREATE_OPPOSITE_RELATIONS_MODE){
		buttons.oppos.style("background-color","steelblue");
	}
	else if(MODE == CREATE_AND_RELATIONS_MODE){
		buttons.and.style("background-color","steelblue");
	}
}

