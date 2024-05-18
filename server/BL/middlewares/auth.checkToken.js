const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
let publicKEY;
try{
    publicKEY = fs.readFileSync(path.join(__dirname, '../../DL/certs', 'public.pem'), 'utf8');
}
catch(error){
    console.log(error);
}


//we call this method before any other method from this middleware
const checkToken = async(req, res , next ) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1]
        jwt.verify(token, publicKEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next()
            }
        });
    } else {
        return res.status(401).json({ 'error': 'Authorization header is not supplied' });
    }
}

const roleToNumber = (role) => {
    switch (role) {
        case "teacher":
            return 4;
        case "administration":
            return 3;
        case "adviser":
            return 2;
        case "admin":
            return 1;
        default:
            return -1;
    }
}

//check if the  role

const checkIsTargetTeam = (req, res ,next) => {
    const adminId = req.headers.adminid
    const roleNumber = roleToNumber(req.decoded.role);
    const condition1 = req.decoded.id === adminId && roleNumber == 1
    const condition2 = req.decoded.id === adminId && roleNumber == 2
    const condition3 = req.decoded.id === adminId && roleNumber == 3
    if (condition1||condition2||condition3) {
        next()
        
    } else {
        return res.status(401).send({
            success: false,
            message: 'Unautinticated user'
        })
    }
    
}

const checkIsAdviser = (req, res,next) => {
    const adminId = req.headers.adminid
    const roleNumber = roleToNumber(req.decoded.role);
    if (req.decoded.id == adminId&&roleNumber == 2 ) {
        next()
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unautinticated user'
        })
    }
    
}

const checkIsAdmin = (req, res,next) => {
        const adminId = req.headers.adminid
        const roleNumber = roleToNumber(req.decoded.role);
        if ( req.decoded.id == adminId && roleNumber == 1) {
           next()
        } else {
            return res.status(401).json({
                success: false,
                message: 'Unautinticated user'
            })
        }
        
        }
        const checkIsTeacher = (req, res,next) => {
            const adminId = req.headers.adminid
            const roleNumber = roleToNumber(req.decoded.role);
            if (req.decoded.id == adminId && roleNumber == 4  ) {
               next()
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Unautinticated user'
                })
            }
            
            }
            const checkIsAdministration = (req, res,next) => {
                const adminId = req.headers.adminid
                const roleNumber = roleToNumber(req.decoded.role);
                if (req.decoded.id == adminId && roleNumber == 3) {
                   next()
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Unautinticated user'
                    })
                }
                
                }


module.exports = {
    checkToken,
    checkIsAdmin,
    checkIsTeacher,
    checkIsAdviser,
    checkIsTargetTeam,
    checkIsAdministration
    }