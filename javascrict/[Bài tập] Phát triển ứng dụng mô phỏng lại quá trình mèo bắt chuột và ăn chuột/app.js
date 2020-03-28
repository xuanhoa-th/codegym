class Cat {
	constructor(name,weight,speed){
		this.name = name;
            this.weight = weight;
            this.speed = 10;
	}
	eat(rat){

		if(!rat.checkEmpty()){
			rat.weight--;
			this.weight++;
		} else{
			this.say("chuot chet roi");
		}
	}
	say(content){
		alert(content);
	}
}
class Rat{
	constructor(name,weight,speed,living){
		this.weight = weight
	}
	checkEmpty(){
		return (this.weight <=0)? true: false;
	}
}
let cat = new Cat("cat",10,20);
let rat = new Rat("Rat",12,50,0);
function eating(){
	cat.eat(rat);
	alert("cat" + cat.weight);
	alert("rat" + rat.weight);
}