function Cat(name, color){
  this.name = name;
  this.color = color;

}

Cat.prototype.sayHi = function(){
  console.log(`hello ${this.name}`);
}
  

var jerry = new Cat('Jerry', 'deep brown');

jerry.sayHi();







function test(){
  //do something interesting
}

var test = () => {
  // do something interesting
}

sayHi();