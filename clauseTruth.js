function Set_False_Click(main_group){
	let clause = GetClauseById(main_group.attr("id"));
	Set_Clause_False(main_group,clause);
}
function Set_True_Click(main_group){
	let clause = GetClauseById(main_group.attr("id"));
	Set_Clause_True(main_group,clause);
}
var nIter = 0;
function CheckTruth(clause){
	nIter = 0;
	console.log("Starting CheckTruth Process");
	let checkedClauses = {};
	checkedClauses[clause.id] = {"clause": clause, "truth":clause.truth};
	return CheckTruthIterative(clause,checkedClauses);
}
function CheckTruthIterative(clause,checkedClauses){
	console.log("Iterating through clause",clause);
	nIter ++;
	if(nIter > 10){
		console.log("Iterated More than 10 times! Breaking");
		return {"status":"error"};
	}
	let nextClauses = [];
	clause.links.forEach((link) => {
		console.log("Iterating through link", link);
		if(link.type == IMPLICATION_LINK_TYPE){
			if(link.clauses[0] === clause){
				if(link.clauses[1].id in checkedClauses){
					if(checkedClauses[link.clauses[1].id].truth != checkedClauses[clause.id].truth){
						return {"status":"error"};
					}
				}
				else{
					checkedClauses[link.clauses[1].id] = {"clause":link.clauses[1], "truth": checkedClauses[clause.id].truth};
					if(checkedClauses[clause.id].truth != link.clauses[1].truth){
						nextClauses.push(link.clauses[1]);
					}
				}
			}	
			else{
				if(link.clauses[0].id in checkedClauses){
					if(checkedClauses[link.clauses[0].id].truth != checkedClauses[clause.id].truth){
						return {"status":"error"};
					}
				}
				else{
					checkedClauses[link.clauses[0].id] = {"clause": link.clauses[0], "truth": checkedClauses[clause.id].truth};
					if(checkedClauses[clause.id].truth != link.clauses[0].truth){
						nextClauses.push(link.clauses[0]);
					}	
				}
			}
		}
	});
	console.log("Next Clauses", nextClauses);
	console.log("Checked Clauses",checkedClauses);
	let numIters = 0;
	for(let i = 0; i < nextClauses.length; i++){
		console.log(i, nextClauses.length);
		console.log("Iteration num: ",numIters);
		numIters ++;
		let result = CheckTruthIterative(nextClauses[i],checkedClauses);
		if(result["status"] == "error"){
			return result;
		}
	}
	console.log("Iterated through all next clauses");
	return {"status":"success","checkedClauses":checkedClauses};
}
function SetTruth(checkedClauses){
	for (let id in checkedClauses) {
		if (checkedClauses.hasOwnProperty(id)) {
			let clause = checkedClauses[id].clause;
			let main_group = d3.select("#"+ id);
			if(checkedClauses[id].truth){
				Set_Clause_True(main_group,clause);
			}
			else{
				Set_Clause_False(main_group,clause);
			}
		}
	}
}
function Set_Clause_False(main_group,clause){
	clause.truth = false;
	main_group.attr("truth","false");
	SetClauseAppearance(main_group,false);
}
function Set_Clause_True(main_group,clause){
	clause.truth = true;
	main_group.attr("truth","true");
	SetClauseAppearance(main_group,true);
}

function SetClauseAppearance(main_group,value){
	if(value){
		main_group.select("."+DRAGGABLE_GROUP_CLASS)
			.select("."+TEXT_AREA_CLASS)
			.style("fill","LightGreen");
	}
	else{
		main_group.select("."+DRAGGABLE_GROUP_CLASS)
			.select("."+TEXT_AREA_CLASS)
			.style("fill","FireBrick");
	}
}
