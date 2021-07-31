// tood: keep it DataBase
const POSTS=[
    {
        id:0,
        post:'Default',
        author:'chandra'
    }
];

class PostsController{

    constructor(){

    }

    async createPost(post){

        return new Promise((resolve, reject)=>{
            
            if(this.validatePost(post)){

                post.id=POSTS.length;
                POSTS.push(post)
                resolve('Sucessfully added')
            }else{
                reject('Invalid post')
            }

        })

    }

    async updatePost(post){

        this.validatePost(post)

        return new Promise((resolve, reject)=>{
            console.log(post);
            const index= this.findIndex(post.id);

            console.log(index)
            if(index!=null){

                POSTS[index]=post;
                resolve('Sucessfully updated')
            }else{
                reject('Unable to find the post id')
            }

        })

    }

    async deletePost(postId){

        return new Promise((resolve, reject)=>{
            console.log(postId);
            const index= this.findIndex(parseInt(postId));
            if(index!=null){
                POSTS.splice(index,1,0)
                resolve('Sucessfully Deleted')
            }else{
                reject('Unable to find the post id')
            }

        })

    }

    async getPosts(query){

        return new Promise((resolve, reject)=>{

            if(POSTS){
                resolve(POSTS)
            }else{
                reject('No data')
            }

        })
    }

    // helper functions

    validatePost(p){

        if(p.post==undefined ){
            throw new Error('Invalid data')
        }
        return true;
    }

    findIndex(id){

        for(let i in POSTS){
            console.log(POSTS[i].id);

                if(POSTS[i].id == id){

                    return i;
                }
            
        }
        return null;

    }

}

module.exports.PostsController = PostsController;