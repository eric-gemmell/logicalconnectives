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
	let topBar = root.append("div")
		.attr("id","top_bar")
		.style("width","100vw")
		.style("height","100px");

	topBar.append("input")
		.attr("id","add_clause_text")
		.style("width","100%")
		.style("height","30px");
	
	AddEventListener();
	
	topBar.append("button")
		.attr("id","equivalence_link")
		.text("⇔")
		.style("width","50px")
		.style("height","40px")
		.style("font-size","30px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.on("click",function(){});
		
	topBar.append("button")
		.attr("id","equivalence_link")
		.text("!⇔")
		.style("width","50px")
		.style("height","40px")
		.style("font-size","30px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.on("click",function(){});

	topBar.append("button")
		.attr("id","equivalence_link")
		.text("and")
		.style("width","70px")
		.style("height","40px")
		.style("font-size","30px")
		.style("padding", "0px 0px")
		.style("border", "0px")
		.on("click",function(){});
}
