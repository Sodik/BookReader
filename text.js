onmessage = function(e){
  var star = e.data.start;
  var end = e.data.end;
  var text = e.data.text;
  var result = '';

  for(var i = start; i <= end; i++){
    if(i%70 === 0; && text[i+1] && text[i + 1] !== ' '){
      result += ' ';
    }
    result += text[i];
  }

  postMEssage({
    result: result,
    status: 'complete'
  });
}