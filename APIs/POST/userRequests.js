const router = require('express').Router()
const db = require('../../config/dbconfig')
const userQueries = require('../../queries/userQueries')

const authCheck = (req,res,next) => {
	if(req.session.loggedIn){
		next()
	}
	else{
		res.send({authStatus:false})
	}
}

const breakingTheArrayDown = (array,ids,uname) => {
	// console.log(ids)
	let newArray = []
	for(let i=0;i<ids.length;i++)
	{
		let objectsOfSpecificId = array.filter(obj=>obj.id==ids[i])
		let length = objectsOfSpecificId.length
		if(objectsOfSpecificId.length>1){
			let ModifiedObject = {
				...objectsOfSpecificId[0],
				likedbyuname:objectsOfSpecificId.map(obj=>obj.likedbyuname)
			}
			if(ModifiedObject.likedbyuname.find(thePerson=>thePerson==uname)){
				ModifiedObject.likedbythePersonLoggedIn = true
			}
			else{
				ModifiedObject.likedbythePersonLoggedIn = false
			}
			newArray.push(ModifiedObject)
		}
		else{
			if(objectsOfSpecificId[0].likedbyuname==uname){
				objectsOfSpecificId[0].likedbythePersonLoggedIn = true
			}
			else{
				objectsOfSpecificId[0].likedbythePersonLoggedIn = false	
			}
			objectsOfSpecificId[0].likedbyuname = [objectsOfSpecificId[0].likedbyuname]
			newArray.push(...objectsOfSpecificId)
		}
	}

	return(newArray)
}

router.post('/timeline',authCheck,(req,res)=>{
	let uname = req.session.uname
	console.log('Url Hit')
	userQueries.getPeopleFollowing(uname)
	.then(following=>{
		console.log(`Following:`)
		following.push(uname)
		console.log(following)
		return userQueries.getIdsOfPosts(following)
		.then(idsObjectArray=>{
			let ids = idsObjectArray.map(obj=>obj.id)
			console.log('ids')
			console.log(ids)
			return userQueries.getPostsDetail(following)
			.then(posts=>{
				console.log('posts')
				console.log(posts)
				let convertedPosts = breakingTheArrayDown(posts,ids,uname)
				// console.log(convertedPosts)
				res.send({posts:convertedPosts,authStatus:true})
			})
		})
	})	
})

router.post('/profile',authCheck,(req,res)=>{
	let loggedInPerson = req.session.uname
	let uname = req.body.uname
	userQueries.checkIfFollowing(loggedInPerson,uname)
	.then(ifFollowing=>{
		return userQueries.getIdsOfPosts(uname)
		.then(idsObjectArray=>{
			let ids = idsObjectArray.map(obj=>obj.id)
			return userQueries.getPostsDetail(uname)
			.then(posts=>{
				console.log('posts')
				console.log(posts)
				let convertedPosts = breakingTheArrayDown(posts,ids,uname)
				// console.log(convertedPosts)
				res.send({posts:convertedPosts,ifFollowing,authStatus:true})
			})
		})
	})
})

router.post('/likePost',(req,res)=>{
	let thePersonWhoLiked = req.session.uname
	let postId = req.body.postId
	let likes = req.body.likes
	console.log(req.body)
	userQueries.likePost(thePersonWhoLiked,postId)
	.then(()=>{
		return userQueries.updateNumberOfLikes(likes+1,postId)
		.then(()=>{
			res.send({liked:true})
		})
	})
})

router.post('/unlikePost',(req,res)=>{
	let thePersonWhoLiked = req.session.uname
	let postId = req.body.postId
	let likes = req.body.likes
	console.log(req.body)
	userQueries.unlikePost(thePersonWhoLiked,postId)
	.then(()=>{
		return userQueries.updateNumberOfLikes(likes-1,postId)
		.then(()=>{
			res.send({unliked:true})
		})
	})
})

router.post('/addPost',(req,res)=>{
	let uname = req.session.uname
	let post = req.body.post

	userQueries.addPost(uname,post)
	.then(()=>{
		res.send({postAdded:true})
	})
})

router.post('/follow',(req,res)=>{
	let uname = req.session.uname
	if(req.body.following!=undefined){
		console.log('In the follow block')
		userQueries.follow(uname,req.body.following)
		.then(()=>{
			res.send({followed:true})
		})
	}
	else{
		console.log('In the unfollow block')
		userQueries.unfollow(uname,req.body.unfollowing)
		.then(()=>{
			res.send({followed:false})	
		})	
	}
})

router.get('/test',(req,res)=>{
	res.send(['Usman','Ali','Akmal'])
})

router.post('/fetchNames',(req,res)=>{
	let substring = req.body.name
	console.log(req.body) 
	userQueries.searchUsers(substring)
	.then(names=>{
		console.log(names)
		res.send(names)
	})
})

module.exports = router