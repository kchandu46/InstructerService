# InstructerService
Create a posts for students


steps: 
1. npm install
2. npm start
3.  test the end points using following steps
4.  Method: POST  http://localhost:8080/login 
  body: {
    "username":"Chandra",
    "password":"123"
} 

resonse is: jwt token

5. use above token for follwing api's
  method : post  http://localhost:8080/post
  body: {
        "post":"post data1 444",
        "author":"chandra",
}

autorization: jwt token

add the post

6.
  method : PUT  http://localhost:8080/post
  body: {
        "post":"post data1 444",
        "author":"chandra",
        "id":4
}

autorization: jwt token

updates the post with id 4


7.
  method : DELETE  http://localhost:8080/post/4

autorization: jwt token

Deletes the post with id 4


8.
  method : GET  http://localhost:8080/posts

returns all posts


TODO: 

pagination is not implemented
code cleanup is required
Unit testig should implemented
