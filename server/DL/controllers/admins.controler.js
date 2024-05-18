const adminsModel = require('../models/admins.model');
const utils = require('../lib/utils.lib');

// get all admins
exports.getAll = async(req, res) => {
    try {
        const data = await adminsModel.find({}).populate("actions").lean().exec();
        if(!data) {
            return res.status(404).send({success:false , msg :"there is no admins"})}
        else{
        return res.status(200).json({ success: true, msg: `all admins`, data: data })
        }
        
    } catch (error) {
        res.status(500).send({success:false , msg :"somethig went wrong"+error})
    }
}
exports.getAllTeacher = async(req, res) => {
    try {
        const data = await adminsModel.find({role:"teacher"})
        if(!data) {
            return res.status(404).send({success:false , msg :"there is no teachers"})}
        else{
        return res.status(200).json({ success: true, msg: `all teachers`, data: data })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false , msg :"somethig went wrong:  "+error})
    }
}
// get one admin
exports.getOne = async(req, res) => {
    try {
        const data = await adminsModel.findById(req.params.id).populate("actions").lean().exec();
        if(!data) {
            return res.status(404).send({success:false , msg :"admin not found"})}
        else{
            return res.status(200).json({ success: true, msg: `admin ${req.body.name} found`, data: data })

        }

        
    } catch (error) {
        res.status(500).send({success:false , msg :"somethig went wrong"+error})
    }
}
// delete by id
exports.deleteAdmin = async(req, res) => {
    try {
        const data = await adminsModel.findByIdAndUpdate(req.params.id,{adminStatus:false},{new:true})
        if(!data){

         return res.status(404).send({success:false , msg :"admin not found"})}
        else{
            return res.status(200).json({ success: true, msg: `admin ${req.body.name} delete`, data: data })
        }

    } catch (error) {
        res.status(500).send({success:false , msg :"somethig went wrong"+error})
    }
}
exports.deleteAdminAvi = async(req, res) => {
    try {
        const data = await adminsModel.findByIdAndDelete(req.params.id)
        if(!data){
         return res.status(404).send({success:false , msg :"admin not found"})}
        else{
            return res.status(200).json({ success: true, msg: `admin ${req.body.name} delete`, data: data })
        }

    } catch (error) {
        res.status(500).send({success:false , msg :"somethig went wrong"+error})
    }
}

// undelete by id
exports.unDeleteAdmin = async(req, res) => {
    try {
        const data = await adminsModel.findByIdAndUpdate(req.params.id,{adminStatus:true},{new:true})
        if(!data){

         return res.status(404).send({success:false , msg :"admin not found"})}
        else{
            return res.status(200).json({ success: true, msg: `admin ${req.body.name} active to login`, data: data })
        }

    } catch (error) {
        res.status(500).send({success:false , msg :"somethig went wrong"+error})
    }
}
// PUT
exports.updateAdmin = async(req, res) => {
    try {
        
        const newData = req.body
        const filterByEmail=req.params.email
    
        const data = await adminsModel.findOneAndUpdate({email:filterByEmail},newData,{new:true})
       if(!data) {
        return res.status(404).send({success:false , msg :"admin not found"})}
       else{
        return res.status(200).json({ success: true, msg: `admin ${req.body.name} update`, data: data })

       }
    } catch (error) {
        res.status(500).send({success:false , msg :"somethig went wrong"+error})
    }
}
//POST
exports.createAdmin = (req, res) => {
        try{
            const saltHash = utils.genPassword(req.body.password)
            const salt = saltHash.salt;
            const hash = saltHash.hash;
            req.body.adminSalt = salt;
            req.body.adminHash = hash;
        
        
        }
        catch(err){
            return res.status(500).json({ success: false, msg: `an error occured while trying to update the admin details, the program exits with error msg: ${err}`, data: null })
        }

            const admin = new adminsModel(req.body);
            admin
            .save(admin)
            .then(data => {
             return res.status(201).json({ success: true, msg: `admin ${req.body.name} created`, data: data })

            })
            .catch(err => {
                req.success = false;
                req.status = 500;
                req.msg = `Error creating admin ${req.body.name}`;
                req.data = err;
            });
    }

    exports.getPassword = (req, res) => {
    adminsModel.findOne({ email: req.params.email })
        .then(async (data) => {

            if (!data) {
                res.status(404).json({ success: false, msg: "thare is no admin", data: null });
            } else {
                
                //create hash and salt from password
                try{
                    const saltHash = utils.genPassword(req.body.password)
                    const salt = saltHash.salt;
                    const hash = saltHash.hash;
    
                    const update = {
                        adminSalt: salt,
                        adminHash: hash
                    };
                    adminsModel.findOneAndUpdate({ email: data.email }, update, { new: true })
                        .then(doc => {
                            if (!doc) {
                                
                                res.status(404).json({ success: false, msg: "no matching Admin", data: null });
                            } else {
                                
                                res.status(201).json({ success: true, msg: "password has been reset", data: doc })
                            }
                        })
                        .catch(err => {
                        
                            res.status(500).json({ success: false, msg: `an error occured while trying to update the admin details, the program exits with error msg: ${err}`, data: null })
                        })
                }
                catch(err){
                    return res.status(500).send({ success: false, msg: `Something went wrong with genPassword function in auth server ${err.msg}`})
                }
            }
        })
        .catch(err => {
            
            res.status(500).json({ success: false, msg: `an error occured while trying to find the admin by link token, the program exits with error msg: ${err}`, data: null })
        })
}
//login
exports.login = (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.status(404).send({success: false, msg: "Email and/or password missing"});
    }

    adminsModel.findOne({ email: req.body.email })
    .then(async (admin) => {
            if (!admin) {
                return res.status(404).send({
                    success: false,
                    msg: `email ${req.body.email} not found`
                });
            }
            if(admin.adminStatus === false){
                return res.status(404).send({
                    success: false,
                    msg: `email ${req.body.email} is inactive`
                });
            }
            try{
            //calling auth server to authenticate admin email and password
                const isValid = utils.validPassword(req.body.password , admin.adminHash, admin.adminSalt) 
                
                if (isValid) {
                    //create the payload for the JWT
                    const payload = {
                        sub: admin._id,
                        iat: Date.now(),
                        id: admin._id,
                        role: admin.role,
                        email: admin.email
                    };
                    //expiration time - can be adjusted as needed
                    const expiresIn = '1d';
                    try{
                        const tokenObject = await utils.issueJWT(payload);
                        // console.log(tokenObject.token , "line 120");
                        if(!tokenObject){
                            return res.status(500).send({success: false, msg: `something went wrong in issueJWT function ${tokenObject}`})
                        }else{
                            const updateAdmin = await adminsModel.findOneAndUpdate({ _id: admin._id }, { adminLastActive: Date.now() }, { new: true });
                            return res.status(201).json({
                                success: true,
                                data: {
                                    id: admin._id,
                                    email: admin.email,
                                    name: admin.name,
                                    role: admin.role,
                                    adminLastActive: updateAdmin.adminLastActive
                                },
                                msg: `welcome ${admin.name} You logged in successfuly`,
                                token: tokenObject.token,
                                expiresIn: tokenObject.expires
                                
                            });
                        }
                       
                      
                    }
                    
                    catch(err){
                        console.log(err , "line 142");
                        return res.status(500).send({ 
                            success: false, 
                            msg: `something went wrong in issueJWT function `
                        });
                    }
                    
                } else {
                   return res.status(401).json({ success: false, msg: "Wrong password" });
                }
            }
            catch(err){
                //if there is a response from the auth server but its not status 200 return the response to upstream server
                if(err.response){
                    return res.status(err.response.status).send({success: false, msg: err.response.data.msg})
                }
                return res.status(500).send({ 
                    success: false, 
                    msg: `something went wrong in validPassword function in auth server`
                })
            }
                
        })
        .catch((err) => {
            res.status(500).send({ success: false, msg: `Error thrown in login function ${err}` })
        })
}

