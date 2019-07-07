var IMPLICATION_LINK_TYPE="implication link";
var CONTRADICTION_LINK_TYPE="contradiction link";
var ADDITION_LINK_TYPE="contradiction link";

var LINK_CLASS = "link";
var LINKS = [];
var LINK_ID = 0;

function GetLinkById(linkId){
	return LINKS.filter(link => link.id === linkId)[0];
}

var linkType;
var creatingLink = false;
var clickedClauses;
var requiredClauses;
function Implication_Click(main_group){
	creatingLink = true;
	linkType = IMPLICATION_LINK_TYPE;
	clickedClauses = [main_group.attr("id")];
	requiredClauses = 1;
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
			CreateLink(linkType,clickedClauses);
		}	
	}
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
	link.object = SVG.append("path")
		.attr("id",link.id)
                .style("fill","none")
                .style("stroke","black")
                .style("stroke-width","3");
	LINKS.push(link);
	SetLinkPath(link);
}

function UpdateLinkPath(linkId){
	console.log("updating links for, "+linkId);
	let link = GetLinkById(linkId);
	SetLinkPath(link); 
}
function SetLinkPath(link){
	if(link.type === IMPLICATION_LINK_TYPE){
		var sp = link.clauses[0].pos;
		var dp = link.clauses[1].pos;
		var new_d = [{"x": sp.x+205,"y": sp.y+20},
		    {"x":dp.x+100,"y":sp.y+20},
		    {"x":dp.x+100,"y":dp.y}
		];
		var line_function = d3.line()
			.x(function(d) { return d.x; })
			.y(function(d) { return d.y; });
		link.object.attr("d",line_function(new_d));
	}
}

/*function Link_Path(type,sources,destinations){
  if(type === IMPLICATION_TYPE_LINK){
  var sp = CLAUSES[sources[0]].pos;
  var dp = CLAUSES[destinations[0]].pos;
  var new_d = [{"x": sp.x+205,"y": sp.y+20},
  {"x":dp.x+100,"y":sp.y+20},
  {"x":dp.x+100,"y":dp.y}
  ];
  var line_function = d3.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; });
  return line_function(new_d);
  }*/

