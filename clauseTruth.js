function Set_False_Click(main_group){
	let clause = GetClauseById(main_group.attr("id"));
	Set_Clause_False(main_group,clause);
	let truth = CheckTruth(clause);
	if(truth["status"] == "error"){
		Set_Clause_True(main_group,clause);
	}
	else{
		SetTruth(truth.checkedClauses);
	}
}
function Set_True_Click(main_group){
	let clause = GetClauseById(main_group.attr("id"));
	Set_Clause_True(main_group,clause);
	let truth = CheckTruth(clause);
	if(truth["status"] == "error"){
		Set_Clause_False(main_group,clause);
	}
	else{
		SetTruth(truth.checkedClauses);
	}
}
function CheckTruth(clause){
	let checkedClauses = {};
	checkedClauses[clause.id] = {"clause": clause, "truth":clause.truth};
	return CheckTruthIterative(clause,checkedClauses);
}
function CheckTruthIterative(clause,checkedClauses){
	let nextClauses = [];
	console.log("Iterating trough clause: ",clause);
	for(let i = 0; i < clause.links.length; i++){
		let link = clause.links[i];
		if(link.type == EQUIVALENCE_LINK_TYPE){
			console.log("checking equivalence link", link);
			if(link.clauses[0] === clause){
				console.log("link stems from this clause");
				if(link.clauses[1].id in checkedClauses){
					console.log("The second link should be " + checkedClauses[clause.id].truth + ", and is: " + checkedClauses[link.clauses[1].id].truth);
					if(checkedClauses[link.clauses[1].id].truth != checkedClauses[clause.id].truth){
						console.log("Should be breaking");
						return {"status":"error"};
					}
				}
				else{
					console.log("Since the starting clause is: "+ checkedClauses[clause.id].truth + ", Setting that child should be: " + checkedClauses[clause.id].truth);  
					checkedClauses[link.clauses[1].id] = {"clause":link.clauses[1], "truth": checkedClauses[clause.id].truth};
					if(checkedClauses[clause.id].truth != link.clauses[1].truth){
						nextClauses.push(link.clauses[1]);
					}
				}
			}	
			else{
				console.log("link leads to this clause");
				if(link.clauses[0].id in checkedClauses){
					console.log("The first link should be " + checkedClauses[clause.id].truth + ", and is: " + checkedClauses[link.clauses[0].id].truth);
					if(checkedClauses[link.clauses[0].id].truth != checkedClauses[clause.id].truth){
						console.log("Should be breaking");
						return {"status":"error"};
					}
				}
				else{
					console.log("Since the ending clause is: "+ checkedClauses[clause.id].truth + ", Setting that parent should be: " + checkedClauses[clause.id].truth);  
					checkedClauses[link.clauses[0].id] = {"clause": link.clauses[0], "truth": checkedClauses[clause.id].truth};
					if(checkedClauses[clause.id].truth != link.clauses[0].truth){
						nextClauses.push(link.clauses[0]);
					}	
				}
			}
		}
		else if(link.type == IMPLICATION_LINK_TYPE){
			console.log("checking implication link", link);
			if(link.clauses[0] === clause){
				console.log("link stems from this clause");
				if(checkedClauses[clause.id].truth === true){
					console.log("since the parent clause is true so must the child clause");
					if(link.clauses[1].id in checkedClauses){
						console.log("the child clause is: " + checkedClauses[link.clauses[1].id].truth); 
						if(checkedClauses[link.clauses[1].id].truth === false){
							console.log("Should be breaking");
							return {"status":"error"};
						}
					}
					else{
						checkedClauses[link.clauses[1].id] = {"clause":link.clauses[1],"truth":true};
						if(link.clauses[1].truth != true){
							nextClauses.push(link.clauses[1]);
						}
					}
				}
				else{
					console.log("Since the parent clause is false, nothing can be infered for the child");
				}
			}
			else{
				console.log("link leads to this clause");
				if(checkedClauses[clause.id].truth === false){
					console.log("since the child clause is false so must the parent clause");
					if(link.clauses[0].id in checkedClauses){
						console.log("the parent clause is: " + checkedClauses[link.clauses[0].id].truth);
						if(checkedClauses[link.clauses[0].id].truth === true){
							console.log("Should be breaking");
							return {"status":"error"};
						}
					}
					else{
						checkedClauses[link.clauses[0].id] = {"clause":link.clauses[0],"truth":false};
						if(link.clauses[0].truth != false){
							nextClauses.push(link.clauses[0]);
						}
					}
				}
				else{
					console.log("Since the child clause is true, nothing can be infered for the parent");
				}
			}
		}
		else if(link.type == OPPOSITE_LINK_TYPE){
			console.log("checking opposite link", link);
			if(link.clauses[0] === clause){
				console.log("link stems from this clause");
				if(link.clauses[1].id in checkedClauses){
					console.log("The second link should be " + !checkedClauses[clause.id].truth + ", and is: " + checkedClauses[link.clauses[1].id].truth);
					if(checkedClauses[link.clauses[1].id].truth != !checkedClauses[clause.id].truth){
						console.log("Should be breaking");
						return {"status":"error"};
					}
				}
				else{
					console.log("Since the starting clause is: "+ checkedClauses[clause.id].truth + ", Setting that child should be: " + !checkedClauses[clause.id].truth);  
					checkedClauses[link.clauses[1].id] = {"clause":link.clauses[1], "truth": !checkedClauses[clause.id].truth};
					if(checkedClauses[link.clauses[1].id].truth != link.clauses[1].truth){
						nextClauses.push(link.clauses[1]);
					}
				}
			}	
			else{
				console.log("link leads to this clause");
				if(link.clauses[0].id in checkedClauses){
					console.log("The first link should be " + !checkedClauses[clause.id].truth + ", and is: " + checkedClauses[link.clauses[0].id].truth);
					if(checkedClauses[link.clauses[0].id].truth != !checkedClauses[clause.id].truth){
						console.log("Should be breaking");
						return {"status":"error"};
					}
				}
				else{
					console.log("Since the ending clause is: "+ checkedClauses[clause.id].truth + ", Setting that parent should be: " + !checkedClauses[clause.id].truth);  
					checkedClauses[link.clauses[0].id] = {"clause": link.clauses[0], "truth": !checkedClauses[clause.id].truth};
					if(checkedClauses[link.clauses[0].id].truth != link.clauses[0].truth){
						nextClauses.push(link.clauses[0]);
					}
				}
			}
		}
	}
	console.log("Next clauses: ", nextClauses); 
	for(let i = 0; i < nextClauses.length; i++){
		let result = CheckTruthIterative(nextClauses[i],checkedClauses);
		console.log(result);
		if(result["status"] == "error"){
			console.log("Got an Error!");
			return result;
		}
	}
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
