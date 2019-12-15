const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const bodyParser = require("body-parser");
const cors = require('cors');
const corsOptions = {origin: '*',optionsSuccessStatus: 200,}
const request = require('request');

const cloudinary = require("cloudinary").v2;
const cloudinaryStorage = require("multer-storage-cloudinary");

const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.post('/api/images', (req, res) => {
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

app.post('/api/analyze', (req, res) => {
console.log('Analyze');

const subscriptionKey = process.env.MICROSOFT_KEY;
const uriBase = process.env.MICROSOFT_ENDPOINT + 'face/v1.0/detect';
const imageUrl = req.body.link;
    const params = {
      'returnFaceId': 'true',
      'returnFaceLandmarks': 'false',
      'returnFaceAttributes': 'age,gender,smile,glasses,' +
          'emotion,hair,makeup,accessories'
  };
  
  const options = {
      uri: uriBase,
      qs: params,
      body: '{"url": ' + '"' + imageUrl + '"}',
      headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key' : subscriptionKey
      }
  };
  
  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      res.send(error);
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    console.log('JSON Response');
    console.log(jsonResponse);
    res.send(body);
  });

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
