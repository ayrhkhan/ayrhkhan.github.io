
for(var i = 1; i <= 100; i++){
  if(i%5===0 && i%3===0){
    document.write( '<h1>fizzbuzz</h1>');
  }else if(i%5===0){
    document.write('<h1>fizz</h1>')
  }else if(i%3===0){
    document.write('<h1>buzz</h1>')
  }else{
    document.write('<h1>'+ i +'</h1>')
  }
}