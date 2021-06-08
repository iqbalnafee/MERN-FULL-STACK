const jwt = require('jsonwebtoken');
const config = require('config');

//Middleware is used for sending the json webtoken back to access protected routes

const middleware = function(req,res,next){ //next is a callback after we are done


    //Get token from header (when we send a request to a protected route we need to send the token within a header)

    const token  = req.header('x-auth-token'); //x-auth-token is the header we want to get

    //check if no token
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'}); //the token is absent and 401 means not authorized
    }

    //verify the token

    try{

        const decoded = jwt.verify(token,config.get('jwtSecret'));

        /*
        
        HEADER:ALGORITHM & TOKEN TYPE

        decoded sample:

        {
            "alg": "HS256",
            "typ": "JWT"
        }

        PAYLOAD:DATA

        {
            "user": {
                "id": "60bf7d300b70483b08ddd20f"
            },
            "iat": 1623162160,
            "exp": 1626762160
        }
        */
       req.user = decoded.user;
       //now we can use req.user in any of our protected routes
       next();

    }
    catch(err){

        res.status(401).json({msg:'Token is not valid'});

    }

}

module.exports = middleware;