const router = require("express").Router();
const db = require("../../config/dbconfig");
const userQueries = require("../../queries/userQueries");

const authCheck = (req, res, next) => {
	if (req.session.loggedIn) {
		next();
	} else {
		res.send({ authStatus: false });
	}
};

const breakingTheArrayDown = (array, ids, uname) => {
	// console.log(ids)
	let newArray = [];
	for (let i = 0; i < ids.length; i++) {
		let objectsOfSpecificId = array.filter((obj) => obj.id == ids[i]);
		let length = objectsOfSpecificId.length;
		if (objectsOfSpecificId.length > 1) {
			let ModifiedObject = {
				...objectsOfSpecificId[0],
				likedbyuname: objectsOfSpecificId.map((obj) => obj.likedbyuname),
			};
			if (
				ModifiedObject.likedbyuname.find((thePerson) => thePerson == uname)
			) {
				ModifiedObject.likedbythePersonLoggedIn = true;
			} else {
				ModifiedObject.likedbythePersonLoggedIn = false;
			}
			newArray.push(ModifiedObject);
		} else {
			if (objectsOfSpecificId[0].likedbyuname == uname) {
				objectsOfSpecificId[0].likedbythePersonLoggedIn = true;
			} else {
				objectsOfSpecificId[0].likedbythePersonLoggedIn = false;
			}
			objectsOfSpecificId[0].likedbyuname = [
				objectsOfSpecificId[0].likedbyuname,
			];
			newArray.push(...objectsOfSpecificId);
		}
	}

	return newArray;
};

posts = [
		{
			"comment":null,
			"likedbyuname":"brad",
			"post":"Hi this is my first post",
			"likes":1,
			"id":1,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":null,
			"likedbyuname":"usman",
			"post":"Hi this is my Second Post",
			"likes":3,
			"id":2,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":null,
			"likedbyuname":"dual",
			"post":"Hi this is my Second Post",
			"likes":3,
			"id":2,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":null,
			"likedbyuname":"taylor",
			"post":"Hi this is my Second Post",
			"likes":3,
			"id":2,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":null,
			"likedbyuname":"brad",
			"post":"Hi this is my third post with no likes",
			"likes":1,
			"id":3,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":"I dont know man. Imma head out",
			"likedbyuname":"brad",
			"post":"This is my fifth posts with id dynamically coming from the database. Hope it works out :O (Here is some edited part I forgot to add previously). Editing again to see how stuff works out",
			"likes":2,
			"id":5,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":"Lol. Cringe times",
			"likedbyuname":"taylor",
			"post":"This is my fifth posts with id dynamically coming from the database. Hope it works out :O (Here is some edited part I forgot to add previously). Editing again to see how stuff works out",
			"likes":2,
			"id":5,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":"Man you one OC ",
			"likedbyuname":"taylor",
			"post":"This is my fifth posts with id dynamically coming from the database. Hope it works out :O (Here is some edited part I forgot to add previously). Editing again to see how stuff works out",
			"likes":2,
			"id":5,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":"I dont know man. Imma head out",
			"likedbyuname":"taylor",
			"post":"This is my fifth posts with id dynamically coming from the database. Hope it works out :O (Here is some edited part I forgot to add previously). Editing again to see how stuff works out",
			"likes":2,
			"id":5,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":"Lol. Cringe times",
			"likedbyuname":"brad",
			"post":"This is my fifth posts with id dynamically coming from the database. Hope it works out :O (Here is some edited part I forgot to add previously). Editing again to see how stuff works out",
			"likes":2,
			"id":5,
			"fname":"Brad",
			"lname":"Traversy"
		},
		{
			"comment":"Man you one OC ",
			"likedbyuname":"brad",
			"post":"This is my fifth posts with id dynamically coming from the database. Hope it works out :O (Here is some edited part I forgot to add previously). Editing again to see how stuff works out",
			"likes":2,
			"id":5,
			"fname":"Brad",
			"lname":"Traversy"
		}]

let doTheMagic = (posts,ids,uname) => {
	let newArray = []
	let subArray = []
	for(let i = 0;i<ids.length;i++){
		subArray = posts.filter(post=>post.id==ids[i])
		idObj = posts.find(post=>post.id==ids[i])
		commentBodies = [...new Set(subArray.map(obj=>obj.comment))]
		commenters = [...new Set(subArray.map(obj=>obj.commenter))]
		comments = []
		console.log('CommentBodies',commentBodies)
		console.log('Commenters',commenters)
		if(commentBodies[0]!=null){
			for(let j=0;j<commentBodies.length;j++){
			comments.push({
				comment:commentBodies[j],
				commenter:subArray.find(obj=>obj.comment==commentBodies[j]).commenter
			})
		}
		}
		else{
			comments = null
		}	
		likedby = [...new Set(subArray.map(obj=>obj.likedbyuname))]
		newObj = {
			...idObj,
			likedbyuname:likedby,
			comments:comments
		}
		if(likedby.find(like=>like==uname)){
			newObj.likedbythePersonLoggedIn = true
		}
		else{
			newObj.likedbythePersonLoggedIn = false
		}
		delete newObj.comment
		delete newObj.commenter
		newArray.push(newObj)
		// console.log('Id: ' + ids[i] )
		// console.log('Comments',comments)
		// console.log('Likedby',likedby)
		// console.log(subArray)
	}
	console.log(newArray)
	return newArray
}		

router.get('/lul',(req,res)=>{
	let loggedInPerson = 'brad';
	let profileUname = 'brad';
	let uname = 'brad'
	// console.log('Uname:' + uname)
	userQueries.checkIfFollowing(loggedInPerson, profileUname).then((ifFollowing) => {
		// console.log('ifFollowing:' + ifFollowing)
		return userQueries.getIdsOfPosts(profileUname).then((idsObjectArray) => {
			let ids = idsObjectArray.map((obj) => obj.id);
			console.log('ids:' + ids)
			return userQueries.getPostsDetailAlpha(profileUname).then((posts) => {
				// console.log("posts");
				console.log(posts);
				// console.log(convertedPosts)
				res.send({posts,ids});
			});
		});
	});
})

router.post("/timeline", authCheck, (req, res) => {
	let uname = req.session.uname;
	// console.log("Url Hit");
	userQueries.getPeopleFollowing(uname).then((following) => {
		// console.log(`Following:`);
		following.push(uname);
		// console.log(following);
		return userQueries.getIdsOfPosts(following).then((idsObjectArray) => {
			let ids = idsObjectArray.map((obj) => obj.id);
			// console.log("ids");
			// console.log(ids);
			console.log('Following',following)
			return userQueries.getPostsDetailAlpha(following).then((posts) => {
				// console.log("posts");
				// console.log(posts);
				let convertedPosts = doTheMagic(posts, ids, uname);
				// console.log(convertedPosts)
				res.send({ posts: convertedPosts, authStatus: true });
			});
		});
	});
});

router.post("/profile", authCheck, (req, res) => {
	let loggedInPerson = req.session.uname;
	let profileUname = req.body.uname;
	let uname = req.session.uname
	// console.log('Uname:' + uname)
	userQueries.checkIfFollowing(loggedInPerson, profileUname).then((ifFollowing) => {
		// console.log('ifFollowing:' + ifFollowing)
		return userQueries.getIdsOfPosts(profileUname).then((idsObjectArray) => {
			let ids = idsObjectArray.map((obj) => obj.id);
			// console.log('ids:' + ids)
			return userQueries.getPostsDetailAlpha(profileUname).then((posts) => {
				// console.log("posts");
				// console.log(posts);
				let convertedPosts = doTheMagic(posts, ids, uname);
				// console.log(convertedPosts)
				res.send({ posts: convertedPosts, ifFollowing, authStatus: true });
			});
		});
	});
});

router.post("/likePost", (req, res) => {
	let thePersonWhoLiked = req.session.uname;
	let postId = req.body.postId;
	let likes = req.body.likes;
	console.log(req.body);
	userQueries.likePost(thePersonWhoLiked, postId).then(() => {
		return userQueries.updateNumberOfLikes(likes + 1, postId).then(() => {
			res.send({ liked: true });
		});
	});
});

router.post("/unlikePost", (req, res) => {
	let thePersonWhoLiked = req.session.uname;
	let postId = req.body.postId;
	let likes = req.body.likes;
	console.log(req.body);
	userQueries.unlikePost(thePersonWhoLiked, postId).then(() => {
		return userQueries.updateNumberOfLikes(likes - 1, postId).then(() => {
			res.send({ unliked: true });
		});
	});
});

router.post("/addPost", (req, res) => {
	let uname = req.session.uname;
	let post = req.body.post;

	userQueries.addPost(uname, post).then(() => {
		res.send({ postAdded: true });
	});
});

router.post("/follow", (req, res) => {
	let uname = req.session.uname;
	if (req.body.following != undefined) {
		console.log("In the follow block");
		userQueries.follow(uname, req.body.following).then(() => {
			res.send({ followed: true });
		});
	} else {
		console.log("In the unfollow block");
		userQueries.unfollow(uname, req.body.unfollowing).then(() => {
			res.send({ followed: false });
		});
	}
});

router.get("/test", (req, res) => {
	res.send(["Usman", "Ali", "Akmal"]);
});

router.post("/fetchNames", (req, res) => {
	let substring = req.body.name;
	// console.log(req.body);
	userQueries.searchUsers(substring).then((names) => {
		// console.log(names);
		res.send(names);
	});
});

router.post("/deletePost", (req, res) => {
	let postId = req.body.postId;
	let uname = req.body.uname;
	if(req.session.uname==uname){
		userQueries.deletePost(postId, uname).then(() => {
			console.log('What')
			return res.send("Deleted");
		});
	}
	else{
		return res.send('Not Deleted')
	}
});

router.post('/addComment',(req,res)=>{
	let postId = req.body.postId
	let commenter = req.session.uname
	let comment = req.body.comment
	console.log(req.body)
	userQueries.addComment(postId,commenter,comment)
	.then(()=>{
		console.log('Comment Added')
		res.send('Comment Added')
	})
})

router.post('/editPost',(req,res)=>{
	let uname = req.session.uname
	let postId = req.body.postId
	let post = req.body.post
	userQueries.editPost(post,postId,uname)
	.then(()=>{
		res.send('Post Added')
	})
})

module.exports = router;
