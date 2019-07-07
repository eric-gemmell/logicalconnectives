var OPTIONS_CLASS="clause_options";
var IMPLICATION_BUTTON_CLASS="implication_button";
var ADDITION_BUTTON_CLASS="and_button";
var CONTRADICTION_BUTTON_CLASS="contradiction_button";


function Clause_Show_Options(main_group){
	main_group.select("."+OPTIONS_CLASS)
		.attr("visibility","visible");
}
function Clause_Hide_Options(main_group){
	main_group.select("."+OPTIONS_CLASS)
		.attr("visibility","hidden");

}

function CreateOptionButtons(options_group,main_group){
	options_group.append("rect")
		.attr("class",IMPLICATION_BUTTON_CLASS)
		.attr("height","30")
		.attr("width","30")
		.style("fill","green")
		.on("click",function(){Implication_Click(main_group)});

	options_group.append("rect")
		.attr("class",CONTRADICTION_BUTTON_CLASS)
		.attr("x","35")
		.attr("height","30")
		.attr("width","30")
		.style("fill","red")
		.on("click",function(){Contradiction_Click(main_group)});

	options_group.append("rect")
		.attr("class",ADDITION_BUTTON_CLASS)
		.attr("x","70")
		.attr("height","30")
		.attr("width","30")
		.style("fill","blue")
		.on("click",function(){Addition_Click(main_group)});
}
function CreateOptions(main_group, id){
	let options_group = main_group.append("g")
		.attr("class",OPTIONS_CLASS)
		.attr("id",OPTIONS_CLASS+id)
		.attr("visibility","hidden");
		
	CreateOptionButtons(options_group,main_group);
}
