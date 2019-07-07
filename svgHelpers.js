function GroupLocation(x,y){
	return "translate("+x+","+y+")";
}
function GetGroupLocation(group){
	return ParseGroupLocation(group.attr("transform"));
}
function ParseGroupLocation(transform){
	if(!transform) return [0,0];
	let start = transform.indexOf("translate");
	let end = transform.substring(start).indexOf(")");
	transform = transform.substring(start,end+1);
	let x = transform.substring(transform.indexOf("(")+1,transform.indexOf(","));
	let y = transform.substring(transform.indexOf(",")+1,transform.indexOf(")"));
	return {x:parseInt(x), y:parseInt(y)};
}
