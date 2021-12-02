const jwt = require('jsonwebtoken')

class AuthRepository {
    generateAccessToken(userId, rememberMe = false){
        return jwt.sign({userId}, process.env.TOKEN_SECRET, {expiresIn: rememberMe?'24h':'2h'})
    }

    // express.js middleware
    authenticateToken(req, res, next){
        req.authenticated = false;
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload)=>{
            if(err) return res.sendStatus(403)
            req.userId = payload.userId
            req.authenticated = true;
            next()
        })
    }
}

module.exports = new AuthRepository()