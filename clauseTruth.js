function Set_False_Click(main_group){
	console.log("Setting clause false!");
	console.log(LINKS);
	console.log(CLAUSES);
	let clause = GetClauseById(main_group.attr("id"));
//	if(clause.links.length > 1){
//		console.log("Clauses that are not axiums cannot be set, only axiums can be set to true or false!");
//	}
//	else{
	Set_Clause_False(main_group,clause);
//	}
}
function Set_True_Click(main_group){
	console.log("Setting Clause true!");
	let clause = GetClauseById(main_group.attr("id"));
//	if(clause.links.length > 1){
//		console.log("Clauses that are not axiums cannot be set, only axiums can be set to true or false!");
//	}
//	else{
	Set_Clause_True(main_group,clause);
//	}
}

function Set_Clause_False(main_group,clause){
	SetClauseAppearance(main_group,false);
	console.log(clause.links);
	clause.links.forEach(function(linkId){
	let link = GetLinkById(linkId);
	if(link.type === IMPLICATION_LINK_TYPE){
		console.log("implication");
		console.log(link);
        	if(main_group.attr("id") === link.clauses[0].id){
			console.log("has children!");
			let childClause = GetClauseById(link.clauses[1].id);
			let childMainGroup = d3.select("#"+childClause.id);
			Set_Clause_False(childMainGroup,childClause);
		}        
        }
        else if(link.type === CONTRADICTION_LINK_TYPE){
		console.log("contradiction");
		console.log(link);
        	if(main_group.attr("id") === link.clauses[0].id){
			console.log("has children!");
			let childClause = GetClauseById(link.clauses[1].id);
			let childMainGroup = d3.select("#"+childClause.id);
			Set_Clause_True(childMainGroup,childClause);
		}        
        }
        else{
        }
	});
}
function Set_Clause_True(main_group,clause){
	SetClauseAppearance(main_group,true);
}

function SetClauseAppearance(main_group,value){
	if(value){
		main_group.select("."+DRAGGABLE_GROUP_CLASS)
			.select("."+TEXT_AREA_CLASS)
			.style("fill","green");
	}
	else{
		main_group.select("."+DRAGGABLE_GROUP_CLASS)
			.select("."+TEXT_AREA_CLASS)
			.style("fill","red");
	}
}
