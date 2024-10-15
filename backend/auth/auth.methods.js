const jwt = require('jsonwebtoken');

const generateToken = (payload, secretSignature, tokenLife) => {
    try {
        return jwt.sign(
            {
                payload,
            },
            secretSignature,
            {
                expiresIn: tokenLife,
            },
        );
    } catch (err) {
        //console.log(`Generate token failed:  + ${err}`);
        return null;
    }
};

const verifyToken = (token, secretSignature) => {
    try {
        return jwt.verify(token, secretSignature);
    }
    catch (err) {
        //console.log(`Verify token failed:  + ${err}`);
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
}
