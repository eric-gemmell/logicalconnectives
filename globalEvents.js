function MouseMoveOnSVG(){
	if(MODE == CREATE_EQUIVALENCE_RELATIONS_MODE || MODE == CREATE_IMPLICATION_RELATIONS_MODE || MODE == CREATE_OPPOSITE_RELATIONS_MODE){
		if(!isEmptyObject(tempLink)){
			UpdateLinkPath(tempLink);
		}
	}
}
