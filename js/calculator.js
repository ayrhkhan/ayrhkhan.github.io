
var sum = 0;
var response;
var textarea;
var textarea2;

function decimal (){
  response = prompt("Choose a number between 0 and 255");
  textarea = document.getElementById("outputBinary");

  var result = [];
  if(response < 0 || response > 255){
    alert("Try a different number");
  }else{
    for(var i = response; i > 0 ; i=parseInt(i/2)){
      result.push(i%2);
  }
    textarea.value = result.reverse().join('');
    return textarea;
}
}

 function binary(){
  response = prompt("Choose a binary number");
  textarea2 = document.getElementById("outputDecimal");
    for(var i = response.length-1; i >= 0 ; i--){
      sum += parseInt(response[i]) * Math.pow(2,response.length-1-i)
    }
      textarea2.value = sum;
      return textarea2;
}
