let a = [1,2,3,4,5,6]
let b = [4,2]
let newArr = []

/*for(let i=0;i<a.length;i++){
	for(let j=0;j<b.length;j++){
		if(a[i]==b[j]){
			console.log(a[i],b[j])
			a.pop()
		}
	}
}*/

res = a.map(f=>f%2)

console.log(res)