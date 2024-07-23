module.exports = (req, res, next) => {
    if(Number(req.query.id) === 3){
        next();
    }else{
        res.send("Id 3 olmalıdır.");
    }
};