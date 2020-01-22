let screenHeight = screen.availHeight;
let screenWidth = screen.availWidth;
console.log(screenWidth,screenHeight);

var ROOT = d3.select("#root");

CreateClauseInput(ROOT);
let SVG = ROOT.append("div")
	.attr("id","SVG_container")
	.style("width","100%")
	.style("height","95vh")
	.append("svg")
	.style("width","100%")
	.style("height","95vh")
	.style("background-color","none");

CreateClause({pos:{x:200,y:200}});
CreateClause({pos:{x:400,y:200}});

