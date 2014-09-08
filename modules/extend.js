module.exports = function(what, wit) {
    for(var key in wit){
      if(wit.hasOwnProperty(key)){
        what[key] = wit[key];
      }
    }

    return what;
}