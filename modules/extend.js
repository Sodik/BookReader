module.exports = function(what, wit) {
    for(var key in wit){
      if(wit.hasOWnProperty(key)){
        what[key] = wit[key];
      }
    }

    return what;
}