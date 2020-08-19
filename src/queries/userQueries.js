const db = require('../config/dbconfig')

const getPosts = (uname) => {
	return new Promise((resolve,reject)=>{
		let sql = `SELECT * FROM posts WHERE uname=?`
		db.query(sql,[uname],(err,rows)=>{
			resolve(rows)
		})
	})	
}

const userSpecificInfo = (uname) => {
	return new Promise((resolve,reject)=>{
		let sql = `SELECT * FROM users WHERE uname=?`
		db.query(sql,[uname],(err,rows)=>{
			resolve(rows)
		})
	})
}

/*
SELECT comments.comment,
likes.likedbyuname,
posts.post,posts.likes,posts.id,
users.fname,users.lname
FROM posts
LEFT OUTER JOIN comments ON posts.id = comments.postId
INNER JOIN users ON users.uname = posts.uname
LEFT OUTER JOIN likes ON posts.id = likes.postId
WHERE posts.uname='brad' ORDER BY posts.id ASC

var myArray = ['a', 1, 'a', 2, '1'];

let unique = [...new Set(myArray)]; 
*/

const getPostsDetailAlpha = (following) => {
	return new Promise((resolve,reject)=>{
		let sql = `
		SELECT comments.comment,comments.commenter,
		likes.likedbyuname,
		posts.post,posts.likes,posts.id,
		users.fname,users.lname
		FROM posts
		LEFT OUTER JOIN comments ON posts.id = comments.postId
		INNER JOIN users ON users.uname = posts.uname
		LEFT OUTER JOIN likes ON posts.id = likes.postId
		WHERE posts.uname IN (?) ORDER BY posts.id ASC`
		db.query(sql,[following],(err,rows)=>{
			resolve(rows)
		})
	})
}

const getPostsDetail = (following) => {
	return new Promise((resolve,reject)=>{
		let sql = `
		SELECT users.fname,users.lname,posts.uname,posts.post,posts.likes,
		likes.likedbyuname,posts.id 
		FROM posts 
		LEFT OUTER JOIN likes ON posts.id=likes.postId
		INNER JOIN users ON posts.uname=users.uname 
		WHERE posts.uname IN (?) ORDER BY posts.id ASC`
		db.query(sql,[following],(err,rows)=>{
			resolve(rows)
		})
	})
}

const getIdsOfPosts = (following) => {
	return new Promise((resolve,reject)=>{
		let sql = `SELECT id from posts WHERE uname IN (?) ORDER BY id DESC`
		db.query(sql,[following],(err,rows)=>{
			resolve(rows)
		})
	})
}

const likePost = (thePersonWhoLiked,postId) => {
	return new Promise((resolve,reject)=>{
		let sql = `INSERT INTO likes(likedbyuname,postId)VALUES(?,?)`
		db.query(sql,[thePersonWhoLiked,postId],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

const updateNumberOfLikes = (likes,postId) => {
	return new Promise((resolve,reject)=>{
		let sql = `UPDATE posts SET likes=? WHERE id=?`
		db.query(sql,[likes,postId],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

const unlikePost = (thePersonWhoLiked,postId) => {
	return new Promise((resolve,reject)=>{
		let sql = `DELETE FROM likes WHERE likedbyuname = ? AND postId= ?`
		db.query(sql,[thePersonWhoLiked,postId],(err)=>{
			if(err) reject(err)
			else resolve()
		}) 
	})
}

const addPost = (uname,post) => {
	return new Promise((resolve,reject)=>{
		let sql = `INSERT INTO posts(uname,post)VALUES(?,?)`
		db.query(sql,[uname,post],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

const getPeopleFollowing = uname => {
	return new Promise((resolve,reject)=>{
		let sql = `SELECT following from followers WHERE follower=?`
		db.query(sql,[uname],(err,rows)=>{
			if(err) reject(err)
			else {
				let following = rows.map(obj=>obj.following)
				resolve(following)
			}
		})
	})
}

//Edit Table names and column names

const follow = (follower,following) => {
	return new Promise((resolve,reject)=>{
		let sql = `INSERT INTO followers(follower,following)VALUES(?,?)`
		db.query(sql,[follower,following],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

const unfollow = (unfollower,following) => {
	return new Promise((resolve,reject)=>{
		let sql = `DELETE FROM followers WHERE follower = ? AND following = ?`
		db.query(sql,[unfollower,following],(err)=>{
			if(err) reject(err)
			else resolve()
		}) 
	})
}

const checkIfFollowing = (follower,following) => {
	let ifFollowing = false
	return new Promise((resolve,reject)=>{
		let sql = `SELECT * FROM followers WHERE follower = ?`
		db.query(sql,[follower],(err,rows)=>{
			if(err) reject(err)
			else{
				rows.forEach(obj=>{
					if(following==obj.following){
						ifFollowing = true
					}
				})
				resolve(ifFollowing)
			}
		}) 
	})
}

const searchUsers = (subString) => {
	return new Promise((resolve,reject)=>{
		let sql = `SELECT * FROM users WHERE CONCAT(fname,' ',lname) LIKE ?`
		db.query(sql,[`%${subString}%`],(err,rows)=>{
			if(err) reject(err)
			else resolve(rows)
		}) 
	})	
}

// const searchUsers = (subString) => {
// 	return new Promise((resolve,reject)=>{
// 		let sql = `SELECT * FROM users`
// 		db.query(sql,[],(err,rows)=>{
// 			if(err) reject(err)
// 			else resolve(rows)
// 		}) 
// 	})	
// }

const deletePost = (postId,uname) => {
	return new Promise((resolve,reject)=>{
		let sql = `DELETE FROM posts WHERE id=? AND uname=?`
		db.query(sql,[postId,uname],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

const addComment = (postId,commenter,comment) => {
	return new Promise((resolve,reject)=>{
		let sql = `INSERT INTO comments(postId,commenter,comment)VALUES(?,?,?)`
		db.query(sql,[postId,commenter,comment],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

const signup = (fname,lname,uname,pwd,profileStatus) => {
	return new Promise((resolve,reject)=>{
		let sql = `INSERT INTO users(fname,lname,uname,pwd,profileStatus)VALUES(?,?,?,?,?)`
		db.query(sql,[fname,lname,uname,pwd,profileStatus],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

const editPost = (post,postId,uname) => {
	return new Promise((resolve,reject)=>{
		let sql = `UPDATE posts SET post=? WHERE id=? and uname=?`
		db.query(sql,[post,postId,uname],(err)=>{
			if(err) reject(err)
			else resolve()
		})
	})
}

module.exports = {
	getPosts,
	userSpecificInfo,
	getPostsDetail,
	getPostsDetailAlpha,
	likePost,
	updateNumberOfLikes,
	unlikePost,
	addPost,
	getIdsOfPosts,
	getPeopleFollowing,
	follow,
	unfollow,
	checkIfFollowing,
	searchUsers,
	deletePost,
	addComment,
	signup,
	editPost
}