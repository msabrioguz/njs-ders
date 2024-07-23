const multer = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+'_'+Date.now()+'_'+file.originalname);
    }
})

const fileFilterConfig = (req, file, cb) => {
    // Dosya tipi kontrolü
    if(file.mimetype.includes("image")) {
        cb(null, true);
    } else {
        cb(new multer.MulterError(300, file.originalname + ' Dosya tipi desteklenmiyor.'), false);
    }
};

const upload = multer({ storage: storageConfig, fileFilter: fileFilterConfig });

module.exports = upload;
