function isEmptyObject(obj){
    //Loop through and check if a property
    //exists
    for(var property in obj){
        if(obj.hasOwnProperty(property)){
            //Property exists, object is not empty,
            //so return FALSE.
            return false;
        }
    }
    //No properties were found, so return TRUE
    return true;
}
