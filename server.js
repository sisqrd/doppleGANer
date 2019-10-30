var express = require('express');
var server = express();
var multer = require('multer');
var cors = require('cors');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

var storage = multer.diskStorage({
    destination: function (req,file,cb){
    cb(null, 'public')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' +file.originalname)
    }
})

var upload = multer({ storage: storage}).single('file')


server.post('/upload', function(req,res){
    upload(req, res, function(err){
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    return res.status(200).send(req.file)
    })
})

server.listen(8000, () => {
    console.log('App running on port 8000')
})
