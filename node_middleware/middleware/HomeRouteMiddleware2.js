module.exports = (req, res, next) => {
    if(req.query.name === "Mustafa"){
        next();
    }else{
        res.send("Adı Mustafa olmalıdır.");
    }
};