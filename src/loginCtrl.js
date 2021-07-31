const jwt = require('jsonwebtoken');

TOKEN_SECRET = 'tokensecretkey';  // Todo: genareate solid key

const users=[
    {
        uname:'Chandra',
        pwd:'123'
    },
    {
        uname:'Chandra1',
        pwd:'123'
    },
]

class LoginController {

    constructor() {

    }

    async handleLogin(req) {

        const uname= req.body.username;
        const pwd = req.body.password;

        if(!uname || !pwd){
            throw new Error('username or password are not provided');
        }
        const isValid = await this.validateUser(uname, pwd);

        if(isValid){
            const token = this.generateAccessToken({ username: req.body.username });
            return token;
        }else {
             throw new Error('Unathorized');
        }

    }

    generateAccessToken(username) {
        return jwt.sign(username, TOKEN_SECRET, { expiresIn: '1800s' });
    }

    asyncauthenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
          console.log(err)
      
          if (err) return res.sendStatus(403)
      
          req.user = user
      
          next()
        })
    }
 
    async validateUser(uname, pwd){

        return new Promise((resolve, reject)=>{

            let found=false;
            for(let user of users){
                if(user.uname == uname && user.pwd ==pwd){
                    found =true;
                    break;
                }
            }
            if(found){
                resolve(true);
            }else{
                reject('Unathorized')
            }
            
        });
    }
}

module.exports.LoginController = LoginController;