var EQUIVALENCE_LINK_TYPE="equivalence link";
var INITIAL_EQUIVALENCE_LINK_TYPE="initial equivalence link";
var IMPLICATION_LINK_TYPE="implication link";
var INITIAL_IMPLICATION_LINK_TYPE="initial implication link";
var OPPOSITE_LINK_TYPE="opposite link";
var INITIAL_OPPOSITE_LINK_TYPE="initial opposite link";
var AND_LINK_TYPE="and link";
var INITIAL_AND_LINK_TYPE="initial and link";

var LINK_CLASS = "link";
var LINKS = [];
var LINK_ID = 0;

function GetLinkById(linkId){
	return LINKS.filter(link => link.id === linkId)[0];
}

var creatingLink = false;
var clickedClauses;
var tempLink = {};

function EquivalenceClick(main_group){
	tempLink = DeleteLink(tempLink)
	let id = main_group.attr("id");	
	let index = clickedClauses.indexOf(id);
	if (index > -1) {
		clickedClauses.splice(index, 1);
	}
	else{
		clickedClauses.push(id);
	}
	if(clickedClauses.length == 1){
		CreateInitialLink(INITIAL_EQUIVALENCE_LINK_TYPE,clickedClauses);
	}
	else if(clickedClauses.length == 2){
		CreateLink(EQUIVALENCE_LINK_TYPE, clickedClauses);
		clickedClauses = [];
	}
}
function OppositeClick(main_group){
	tempLink = DeleteLink(tempLink)
	let id = main_group.attr("id");	
	let index = clickedClauses.indexOf(id);
	if (index > -1) {
		clickedClauses.splice(index, 1);
	}
	else{
		clickedClauses.push(id);
	}
	if(clickedClauses.length == 1){
		CreateInitialLink(INITIAL_OPPOSITE_LINK_TYPE,clickedClauses);
	}
	else if(clickedClauses.length == 2){
		CreateLink(OPPOSITE_LINK_TYPE, clickedClauses);
		clickedClauses = [];
	}
}
function ImplicationClick(main_group){	
	tempLink = DeleteLink(tempLink)
	let id = main_group.attr("id");	
	let index = clickedClauses.indexOf(id);
	if (index > -1) {
		clickedClauses.splice(index, 1);
	}
	else{
		clickedClauses.push(id);
	}
	if(clickedClauses.length == 1){
		CreateInitialLink(INITIAL_IMPLICATION_LINK_TYPE,clickedClauses);
	}
	else if(clickedClauses.length == 2){
		CreateLink(IMPLICATION_LINK_TYPE, clickedClauses);
		clickedClauses = [];
	}
}
function AndClick(main_group){
	console.log("And click");
	tempLink = DeleteLink(tempLink)
	let id = main_group.attr("id");	
	let index = clickedClauses.indexOf(id);
	if (index > -1) {
		clickedClauses.splice(index, 1);
	}
	else{
		clickedClauses.push(id);
	}
	if(clickedClauses.length == 1){
		CreateInitialLink(INITIAL_AND_LINK_TYPE,clickedClauses);
	}
	else if(clickedClauses.length == 2){
		CreateInitialLink(INITIAL_AND_LINK_TYPE,clickedClauses);
	}
	else if(clickedClauses.length == 3){
		CreateLink(AND_LINK_TYPE, clickedClauses);
		clickedClauses = [];
	}
}
function CreateInitialLink(type,clickedClauses){
	let clauses = clickedClauses.map(clickedClause => GetClauseById(clickedClause));
	let link = {
		id: LINK_CLASS+(LINK_ID++),
		type:type,
		clauses:clauses,
	};
	clauses.forEach(clause => clause.links.push(link));
	CreateLinkObject(link);
	LINKS.push(link);
	SetLinkPath(link);
	tempLink = DeleteLink(tempLink);
	tempLink = link;
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
		clause.links.push(link);
	});
	CreateLinkObject(link);
	LINKS.push(link);
	SetLinkPath(link);
	let truth = CheckTruth(clauses[0]);
	console.log("Checking finished",truth);
	if(truth["status"] == "error"){
		DeleteLink(link);
	}
	else{
		SetTruth(truth.checkedClauses);
	}
}
function CreateLinkObject(link){
	link.object = SVG.append("path")
		.attr("id",link.id)
                .style("fill","none")
                .style("stroke-width","3")
		.on("mouseover",function(){LinkMouseOver(link)})
                .on("mouseout",function(){LinkMouseOut(link)})
		.on("click",function(){LinkClick(link)});
	ColorLink(link);
}
function LinkMouseOver(link){
	link.object.style("stroke","#f0f048");
}
function LinkMouseOut(link){
	ColorLink(link);
}
function ColorLink(link){
	if(link.type === EQUIVALENCE_LINK_TYPE || link.type === INITIAL_EQUIVALENCE_LINK_TYPE){
		link.object.style("stroke","steelblue");
	}
	else if(link.type === OPPOSITE_LINK_TYPE || link.type === INITIAL_OPPOSITE_LINK_TYPE){
		link.object.style("stroke","red");
	}
	else if(link.type === IMPLICATION_LINK_TYPE || link.type === INITIAL_IMPLICATION_LINK_TYPE){
		link.object.style("stroke","green");
	}
	else{
		link.object.style("stroke","blue");
	}
}
function UpdateLinkPath(link){
	SetLinkPath(link); 
}
function SetLinkPath(link){
	if(link.type === EQUIVALENCE_LINK_TYPE){
		SetEquivalenceLinkPath(link);
	}
	else if(link.type === INITIAL_EQUIVALENCE_LINK_TYPE){
		SetInitialEquivalenceLinkPath(link);
	}	
	else if(link.type === IMPLICATION_LINK_TYPE){
		SetImplicationLinkPath(link);
	}
	else if(link.type === INITIAL_IMPLICATION_LINK_TYPE){
		SetInitialImplicationLinkPath(link);
	}	
	else if(link.type === OPPOSITE_LINK_TYPE){
		SetOppositionLinkPath(link);
	}
	else if(link.type === INITIAL_OPPOSITE_LINK_TYPE){
		SetInitialOppositionLinkPath(link);
	}	
	else if(link.type === AND_LINK_TYPE){
		SetAndLinkPath(link);
	}
	else if(link.type === INITIAL_AND_LINK_TYPE){
		SetInitialAndLinkPath(link);
	}	
}
function ClosestClauseSide(sp,ep){
	let startSides = [{x:sp.x+100,y:sp.y+106},{x:sp.x+100,y:sp.y},{x:sp.x+204,y:sp.y+50},{x:sp.x-14,y:sp.y+50}];
	let endSides = [{x:ep.x+100,y:ep.y},{x:ep.x+100,y:ep.y+106},{x:ep.x-14,y:ep.y+50},{x:ep.x+204,y:ep.y+50}];
	let direction = ["Down","Up","Right","Left"];
	let startDistances = startSides.map((pos) => {
		return Math.pow(pos.x - ep.x-100,2) + Math.pow(pos.y - ep.y-50,2);
	});
	let endDistances = endSides.map((pos) => {
		return Math.pow(pos.x - sp.x-100,2) + Math.pow(pos.y - sp.y-50,2);
	});
	sp = startSides[startDistances.indexOf(Math.min(...startDistances))];
	spDirection = direction[startDistances.indexOf(Math.min(...startDistances))];
	ep = endSides[endDistances.indexOf(Math.min(...endDistances))];
	epDirection = direction[endDistances.indexOf(Math.min(...endDistances))];
	console.log({sp:sp,spDirection:spDirection,ep:ep,epDirection:epDirection});
	return {sp:sp,spDirection:spDirection,ep:ep,epDirection:epDirection};
}
function BasicLinkPath(startPos,endPos,overrideStartPosChange = false, overrideEndPosChange = false){	
	let path = [];
	let {sp,spDirection,ep,epDirection} = ClosestClauseSide(startPos,endPos);
	if(overrideStartPosChange){
		sp = startPos;
	}
	if(overrideEndPosChange){
		ep = endPos;
	}
	path.push(sp);
	spVertical = spDirection == "Up" || spDirection == "Down";
	epVertical = epDirection == "Up" || epDirection == "Down";
	if((epVertical && spVertical)  || (!spVertical && !epVertical)){
		path.push({x:sp.x,y:sp.y/2+ep.y/2});
		path.push({x:ep.x,y:sp.y/2+ep.y/2});
		path.push(ep);
	}
	else if((epVertical && spVertical)  || (!spVertical && !epVertical)){
		path.push({x:sp.x/2 + ep.x/2,y:sp.y});
		path.push({x:ep.x/2 + ep.x/2,y:ep.y});
		path.push(ep);
	}
	else{
		if(spVertical){
			path.push({x:sp.x,y:ep.y});
			path.push(ep);
		}
		else{
			path.push({x:ep.x,y:sp.y});
			path.push(ep);
		}
	}
	return {path,direction:epDirection};
}
function BasicInitialLinkPath(sp,ep){
	return [
		{"x": sp.x-10,"y":sp.y-1},
		{"x": sp.x+206,"y":sp.y-1},
		{"x": sp.x+206,"y":sp.y+105},
		{"x": sp.x-10,"y":sp.y+105},
	];
}
function SetEquivalenceLinkPath(link){	
	let sp = link.clauses[0].pos;
	let ep = link.clauses[1].pos;
	let basicPath = BasicLinkPath(sp,ep);
	if(basicPath.direction == "Down"){ 
		basicPath.path.push(
			{"x":ep.x+110,"y":ep.y},
			{"x":ep.x+90,"y":ep.y}
		);
	}
	else if (basicPath.direction == "Up"){
		basicPath.path.push(
			{"x":ep.x+110,"y":ep.y+106},
			{"x":ep.x+90,"y":ep.y+106}
		);	
	}
	else if (basicPath.direction == "Right"){
		basicPath.path.push(
			{"x":ep.x-14,"y":ep.y+40},
			{"x":ep.x-14,"y":ep.y+60}
		);		
	}
	else {
		basicPath.path.push(
			{"x":ep.x+204,"y":ep.y+40},
			{"x":ep.x+204,"y":ep.y+60}
		);		
	}

	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(basicPath.path));
}
function SetInitialEquivalenceLinkPath(link){
	let sp = link.clauses[0].pos;
	let ep = {"x": window.event.clientX-100, "y": window.event.clientY-145};
	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(BasicLinkPath(sp,ep).path));
}
function SetImplicationLinkPath(link){	
	let sp = link.clauses[0].pos;
	let ep = link.clauses[1].pos;
	let basicPath = BasicLinkPath(sp,ep);
	if(basicPath.direction == "Down"){ 
		basicPath.path.push(
			{"x":ep.x+110,"y":ep.y},
			{"x":ep.x+90,"y":ep.y}
		);
	}
	else if (basicPath.direction == "Up"){
		basicPath.path.push(
			{"x":ep.x+110,"y":ep.y+106},
			{"x":ep.x+90,"y":ep.y+106}
		);	
	}
	else if (basicPath.direction == "Right"){
		basicPath.path.push(
			{"x":ep.x-14,"y":ep.y+40},
			{"x":ep.x-14,"y":ep.y+60}
		);		
	}
	else {
		basicPath.path.push(
			{"x":ep.x+204,"y":ep.y+40},
			{"x":ep.x+204,"y":ep.y+60}
		);		
	}

	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(basicPath.path));
}
function SetInitialImplicationLinkPath(link){
	let sp = link.clauses[0].pos;
	let ep = {"x": window.event.clientX-100, "y": window.event.clientY-145};
	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(BasicInitialLinkPath(sp,ep))+"Z"+line_function(BasicLinkPath(sp,ep).path));
}
function SetOppositionLinkPath(link){	
	let sp = link.clauses[0].pos;
	let ep = link.clauses[1].pos;
	let basicPath = BasicLinkPath(sp,ep);
	if(basicPath.direction == "Down"){ 
		basicPath.path.push(
			{"x":ep.x+120,"y":ep.y},
			{"x":ep.x+80,"y":ep.y}
		);
	}
	else if (basicPath.direction == "Up"){
		basicPath.path.push(
			{"x":ep.x+120,"y":ep.y+106},
			{"x":ep.x+80,"y":ep.y+106}
		);	
	}
	else if (basicPath.direction == "Right"){
		basicPath.path.push(
			{"x":ep.x-14,"y":ep.y+30},
			{"x":ep.x-14,"y":ep.y+70}
		);		
	}
	else {
		basicPath.path.push(
			{"x":ep.x+204,"y":ep.y+30},
			{"x":ep.x+204,"y":ep.y+70}
		);		
	}

	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(basicPath.path));
}
function SetInitialOppositionLinkPath(link){
	let sp = link.clauses[0].pos;
	let ep = {"x": window.event.clientX-100, "y": window.event.clientY-145};
	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	link.object.attr("d",line_function(BasicInitialLinkPath(sp,ep))+"Z"+line_function(BasicLinkPath(sp,ep).path));
}
function SetAndLinkPath(link){	
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
function SetInitialAndLinkPath(link){
	let firstClause = link.clauses[0].pos;
	let secondClause = {x:0,y:0};
	var line_function = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });
	if(link.clauses.length == 1){
		secondClause = {"x": window.event.clientX-100, "y": window.event.clientY-145};
		link.object.attr("d",line_function(BasicLinkPath(firstClause,secondClause).path));
	}
	else if(link.clauses.length == 2){
		secondClause = link.clauses[1].pos;
		let path = BasicLinkPath(firstClause,secondClause).path;
		let meanX = path[1].x/2 + path[2].x/2;
		let meanY = path[1].y/2 + path[2].y/2;
		console.log(meanX);
		let secondPath = [{"x":meanX,"y":meanY},{"x":window.event.clientX, "y": window.event.clientY}];
		link.object.attr("d",line_function(path)+line_function(secondPath));
	}
}
function LinkClick(link){
	if(MODE == DELETE_RELATION_MODE){
		DeleteLink(link);
	}
}

function DeleteLink(link){
	if(!isEmptyObject(link)){
		link.clauses.forEach(clause => {
			let index = clause.links.indexOf(link);
			if (index != -1){
				clause.links.splice(index,1);
			}
		});	
		let index = LINKS.indexOf(link);
		if( index != -1){
			LINKS.splice(index,1);
		}
		link.object.remove();
		return {};
	}
}
