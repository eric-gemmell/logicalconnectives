var IMPLICATION_LINK_TYPE="implication link";
var CONTRADICTION_LINK_TYPE="contradiction link";
var ADDITION_LINK_TYPE="addition link";

var LINK_CLASS = "link";
var LINKS = [];
var LINK_ID = 0;

function GetLinkById(linkId){
	return LINKS.filter(link => link.id === linkId)[0];
}

var creatingLink = false;
var linkType = "";
var clickedClauses;
var requiredClauses;
function Implication_Click(main_group){
	let id = main_group.attr("id");	
	let index = clickedClauses.indexOf(id);
	if (index > -1) {
		clickedClauses.splice(index, 1);
	}
	else{
		clickedClauses.push(main_group.attr("id"));
	}
	console.log("clicked Clauses: ",clickedClauses);
	if(clickedClauses.length == 1){
		//DrawInitialEquivalenceLink(clickedClauses);
	}
	else if(clickedClauses.length == 2){
		CreateLink(IMPLICATION_LINK_TYPE, clickedClauses);
		clickedClauses = [];
	}
}
function Contradiction_Click(main_group){
	creatingLink = true;
	linkType = CONTRADICTION_LINK_TYPE;
	clickedClauses = [main_group.attr("id")];
	requiredClauses = 1;
}
function Addition_Click(main_group){
	creatingLink = true;
	linkType = ADDITION_LINK_TYPE;
	clickedClauses = [main_group.attr("id")];
	requiredClauses = 2;
}
function LinkClauseClick(main_group){
	if(creatingLink){
		clickedClauses.push(main_group.attr("id"));
		requiredClauses += -1;
		if(requiredClauses < 1){
			creatingLink = false;
			if(CheckLinkValid(linkType,clickedClauses)){
				CreateLink(linkType,clickedClauses);
			}
		}	
	}
}
function CheckLinkValid(linkType,clickedClauses){
	return true;
}
function CreateLink(type,clickedClauses){
	
	console.log("creating link" + type +", "+clickedClauses);
	let clauses = clickedClauses.map(function(clauseId){
		return GetClauseById(clauseId);
	});
	let link = {
		id: LINK_CLASS+(LINK_ID++),
		type:type,
		clauses:clauses,
	};
	clauses.map(function(clause){
		clause.links.push(link.id);
	});
	CreateLinkObject(link);
	LINKS.push(link);
	SetLinkPath(link);
}
function CreateLinkObject(link){
	link.object = SVG.append("path")
		.attr("id",link.id)
                .style("fill","none")
                .style("stroke-width","3");
	if(link.type === IMPLICATION_LINK_TYPE){
		link.object.style("stroke","steelblue");
	}
	else if(link.type === CONTRADICTION_LINK_TYPE){
		link.object.style("stroke","red");
	}
	else{
		link.object.style("stroke","blue");
	}
	
}
function UpdateLinkPath(linkId){
	console.log("updating links for, "+linkId);
	let link = GetLinkById(linkId);
	SetLinkPath(link); 
}
function SetLinkPath(link){
	if(link.type === IMPLICATION_LINK_TYPE){
		SetImplicationLinkPath(link);
	}
	else if(link.type === CONTRADICTION_LINK_TYPE){
		SetContradictionLinkPath(link);
	}
	else{
		SetAdditionLinkPath(link);
	}
}
function SetImplicationLinkPath(link){	
	let sp = link.clauses[0].pos;
	let ep = link.clauses[1].pos;
	let path = [];
	if(sp.y < ep.y - 110){ 
		path = [{"x": sp.x+100,"y": sp.y+106},
		    {"x":sp.x+100,"y":Math.max(sp.y+110,(ep.y+sp.y)/2)},
		    {"x":ep.x+100,"y":Math.max(sp.y+110,(ep.y+sp.y)/2)},
		    {"x":ep.x+100,"y":ep.y},
		    {"x":ep.x+110,"y":ep.y},
		    {"x":ep.x+90,"y":ep.y}
		];
	}
	else{
	
	}
	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(path));
}
function SetContradictionLinkPath(link){	
	var sp = link.clauses[0].pos;
	var dp = link.clauses[1].pos;
	var new_d = [{"x": sp.x+205,"y": sp.y+20},
	    {"x":dp.x+100,"y":sp.y+20},
	    {"x":dp.x+100,"y":dp.y},
	    {"x":dp.x+110,"y":dp.y},
	    {"x":dp.x+90,"y":dp.y}
	];
	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(new_d));
}
function SetAdditionLinkPath(link){	
	var sp = link.clauses[0].pos;
	var dp = link.clauses[2].pos;
	var dp2 = link.clauses[1].pos;
	var new_d = [{"x": sp.x+205,"y": sp.y+20},
	    {"x":dp.x+100,"y":sp.y+20},
	    {"x":dp.x+100,"y":dp.y},
	    {"x":dp.x+100,"y":dp2.y+20},
	    {"x":dp2.x+205,"y":dp2.y+20},
	];
	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(new_d));
}
