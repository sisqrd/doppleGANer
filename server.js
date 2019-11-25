const express = require('express');
const server = express();

var bodyParser = require("body-parser");

const port = process.env.PORT || 3001;
const cors = require('cors');
const corsOptions = {origin: '*',optionsSuccessStatus: 200,}
server.use(cors(corsOptions))

const cloudinary = require("cloudinary").v2;
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'dkbmlcs4a/',//process.env.CLOUDINARY_NAME,
    api_key: '526961457181978',//process.env.CLOUDINARY_API_KEY,
    api_secret: 'nDPx4ErOSdFzVGl8dsm6SHLf1ag'//process.env.CLOUDINARY_API_SECRET
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.listen(port, () => {
    console.log('App running on port', port)
})

server.post('/api/images', (req, res) => {
    //console.log('REQ:', req.body) // to see what is returned to you
    const options = {
        folder : 'face',
        allowedFormats: ["jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    };
    cloudinary.uploader.upload(req.body.file, options,  
    function(error, result) {        
        console.log(result, error); 
        const responce = {
            url: result.url
        }     
        res.send(responce);
    });
});

