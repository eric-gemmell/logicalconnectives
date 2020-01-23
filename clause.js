var CLAUSE_CLASS="clause_group";
var CLAUSE_ID=0;

var DRAGGABLE_GROUP_CLASS="draggable_group";
var TEXT_AREA_CLASS="text_area";

var OPTIONS_CLASS="clause_options";

var TEXTAREA_WIDTH="150px";
var TEXTAREA_HEIGHT="100px";

var CLAUSES = [];

function GetClauseById(clauseId){
	return CLAUSES.filter(clause => clause.id === clauseId)[0];
}
function TextAreaChange(main_group){
	let clause = GetClauseById(main_group.attr("id"));
	clause.text = main_group.select("textarea").property("value");
}

function Draggable_Click(main_group){
	if(MODE == SET_CLAUSE_FALSE_MODE){
		Set_False_Click(main_group);
	}
	else if(MODE == SET_CLAUSE_TRUE_MODE){
		Set_True_Click(main_group);
	}
	//LinkClauseClick(main_group);
}
function Clause_Drag_Start(main_group){
	let currentPos = GetGroupLocation(main_group);
	let offsetPos = {
		x: currentPos.x - window.event.clientX,
        	y: currentPos.y - window.event.clientY,
	};
	main_group.attr("drag_offset",GroupLocation(offsetPos.x,offsetPos.y));
}
function Clause_Drag_Update(main_group){
	let offsetPos = ParseGroupLocation(main_group.attr("drag_offset"));
	let newPos = {
		x: offsetPos.x + window.event.clientX,
		y: offsetPos.y + window.event.clientY,
	};
	main_group.attr("transform",GroupLocation(newPos.x,newPos.y));
	let clause = GetClauseById(main_group.attr("id"));
	clause.pos = newPos;
	clause.links.forEach(linkId => UpdateLinkPath(linkId));	
}
function CreateDraggable(main_group,clause){
	let drag_handler = d3.drag()
		.on("start", function () {
				Clause_Drag_Start(main_group);
			})
		.on("drag", function () {
				Clause_Drag_Update(main_group);
			}
		);
	let draggable =  main_group.append("g")
	return draggable.attr("class",DRAGGABLE_GROUP_CLASS)
		.attr("id",DRAGGABLE_GROUP_CLASS+(clause.id))
//		.attr("transform",GroupLocation(0,30))
		.on("mouseover",function(){})
		.on("mouseout",function(){})
		.on("click",function(){Draggable_Click(main_group)})
		.call(drag_handler);
}
function CreateTextArea(main_group,draggable,clause){
	
	draggable.append("rect")
		.attr("class",TEXT_AREA_CLASS)
		.attr("height","102px")
		.attr("width","10px")
		.attr("x","-10px")
		.attr("y","1px")
		.style("fill","black");

	draggable.append("foreignObject")
		.attr("width",205)
		.attr("height",106)
		.append("xhtml:div")
		.attr("xmlns","http://www.w3.org/1999/xhtml")
		.append("xhtml:textarea")
		.text(clause.text)
		.style("height", "100px")//also fix this boy pls
		.style("width", "200px")//this one too
		.style("resize", "none")//maybe as well
		.style("background-color","none")
		.on("change",function(){TextAreaChange(main_group)});

	//return text;
}
function CheckClauseValues(clause){
	clause.id = CLAUSE_CLASS+(CLAUSE_ID++);
	clause.pos = clause.pos || {x:200,y:200};
	clause.text = clause.text || "Default Clause Text";
	clause.links = clause.links || [];
	clause.truth = clause.truth || true;
	CLAUSES.push(clause);
}
function CreateClause(clause){
	CheckClauseValues(clause);
	let main = SVG
		.append("g")
		.attr("class",CLAUSE_CLASS)
		.attr("clicked","false")
		.attr("id",clause.id)
		.attr("truth","true")
		.attr("transform",GroupLocation(clause.pos.x,clause.pos.y));
	let draggable = CreateDraggable(main,clause);
	//let textArea = CreateTextArea(draggable);
	CreateTextArea(main,draggable,clause);
	//let options = CreateOptions(main,clause.id);
	Set_Clause_True(main);
}
