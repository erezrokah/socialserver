/*
var array = [1,2,3,4,5,6]

var sth = {
	lol:9,
	xD:function(){
		this.lol--
	},
	xD2:array.forEach(()=>{
		this.lol--
	})
}

var sth1 = {
	lol:9,
	xD:()=>{
		this.lol--
	},
	xD2:array.forEach(()=>{
		this.lol--
	})
}

sth.xD()
sth1.xD()
sth.xD2
sth1.xD2
console.log(sth.lol)
console.log(sth1.lol)


var obj = {
	a:1,
	b:2,
	c:3,
	d:5
}

const {A,B,c} = obj

console.log(`a is ${A},b is ${B},c is ${c}`)


var someObj = {
	name:'Usman',
	email:'lmao'
}

console.log({...someObj,name:'Liaqat'})
console.log({
	name:'Usman',
	email:'lmao',
	name:'Liaqat'
})

var someArray = [1,2,3,4]
console.log([...someArray,{key:'1'}])

console.dir(a)
*/

//Immediately Invoked Functional Expressions

/*(function IIFE(){
	var a = 1;
	console.log(a)
})();
*/

// News ES6 was of Immediately Invoked Functional Expressions

/*let a = 3

{
	let a = 2
}

console.log(a)*/
//var follow function scoping

/*let a

function lmao(){
	a = 5
}

lmao()

console.log(a)*/

//let follow block scoping

/*for(let i = 0;i<5;i++){

}

for(var i = 0;i<10;i++){

}


console.log(i)*/

//Accessing a let-declared variable earlier than its let .. declaration/initialization
//causes an error, whereas with var declarations the ordering doesn’t matter

/*console.log(a)
let a = 5;

console.log(b)
var b = 6*/

