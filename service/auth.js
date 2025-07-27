// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

function setUser(user) {
    // Generate a JWT token for the user
    try{
        const token = jwt.sign({ id: user._id, email: user.email }, secret);
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        return null;
    }
}

// function setUser(id,user){
//     sessionIdToUserMap.set(id, user);
// }



// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

function getUser(token){
    if(!token) return null;
    const decoded = jwt.verify(token, secret);
    return decoded;
}


module.exports = {
    setUser,
    getUser
};