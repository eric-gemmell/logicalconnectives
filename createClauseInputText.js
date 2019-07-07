function AddEventListener(){
	$("#add_clause_text").keyup(function(event) {
		if (event.keyCode === 13) {
			var text = $("#input_text").val();
			$("#input_text").val("");
			var clause = {"id" : 0,"text": text,"pos":{"x":20,"y":30},"links":[]};
			CreateClause(clause);
		}
	})
}
function CreateClauseInput(root){
	root.append("div")
		.attr("id","top_bar")
		.style("width","100%")
		.style("height","5vh")
		.append("input")
		.attr("id","add_clause_text")
		.style("width","100%")
		.style("height","5vh");
	
	AddEventListener();
}
