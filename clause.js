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
function Draggable_Click(main_group){
	LinkClauseClick(main_group);
	//if(main_group.attr("clicked") === "true"){
	//	main_group.attr("clicked","false");
	//	Clause_Hide_Options(main_group);		
	//}
	//else{
	//	main_group.attr("clicked","true");
	//	Clause_Show_Options(main_group);
	//}
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
function CreateDraggable(main_group){
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
		.attr("id",DRAGGABLE_GROUP_CLASS+(CLAUSE_ID-1))
		.attr("transform",GroupLocation(0,30))
		.on("mouseover",function(){})
		.on("mouseout",function(){})
		.on("click",function(){Draggable_Click(main_group)})
		.call(drag_handler);
}
function CreateTextArea(draggable){
	
	let text = draggable.append("rect")
		.attr("class",TEXT_AREA_CLASS)
		.attr("height",TEXTAREA_HEIGHT)
		.attr("width",TEXTAREA_WIDTH)
		.style("fill","black");

	draggable.append("foreignObject")
		.attr("width",205)
		.attr("height",100)
		.append("xhtml:div")
		.attr("xmlns","http://www.w3.org/1999/xhtml")
		.append("xhtml:textarea")
		.text("Yeah Clause time")
		.style("height", "100")//also fix this boy pls
		.style("width", "200px")//this one too
		.style("resize", "none")//maybe as well
		.style("background-color","white");

	return text;
}
function CheckClauseValues(clause){
	clause.id = CLAUSE_CLASS+(CLAUSE_ID++);
	clause.pos = clause.pos || {x:200,y:200};
	clause.text = clause.text || "Default Clause Text";
	clause.links = clause.links || [];
	CLAUSES.push(clause);
}
function CreateClause(clause){
	CheckClauseValues(clause);
	let main = SVG
		.append("g")
		.attr("class",CLAUSE_CLASS)
		.attr("clicked","false")
		.attr("id",clause.id)
		.attr("transform",GroupLocation(clause.pos.x,clause.pos.y));
	let draggable = CreateDraggable(main);
	let textArea = CreateTextArea(draggable);
	//let options = CreateOptions(main,clause.id);
	Set_Clause_True(main,clause);
}
