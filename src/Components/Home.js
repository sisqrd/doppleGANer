import React from 'react';
import cover from '../image/cover.jpg'
import utils from '../Utils';
import Label from './Label';
import Webcam from 'react-webcam';
import { Button, Grid } from 'semantic-ui-react'

let reader = new FileReader();
let faceDetect = async (url) => {
  if(url){
  const uriBase = process.env.REACT_APP_URI_BASE;
  const subscriptionKey = process.env.REACT_APP_SUBS_KEY;
  const type = 'blob';
  const faceID = 'true';
  const faceLandmarks = 'true';
  const faceAttributes = 'age,gender,smile,facialHair,glasses,emotion,hair,makeup,accessories';
  const response = await fetch(
    `${uriBase}?returnFaceId=${faceID}&returnFaceLandmarks=${faceLandmarks}&returnFaceAttributes=${faceAttributes}`,
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      }),
      body: url,
    }
  );
  let newResult = await response.json();
  return newResult;
} else console.log('Defected Blob');
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
          file:'' 
        }
    }

    setRef(webcam) {
      this.webcam = webcam;
    }

    capture() {
      const imageSrc = this.webcam.getScreenshot();
      //this.setState({file: imageSrc})
      var BASE64_MARKER = ';base64,';
      let dataURL =  imageSrc;
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
          var parts = dataURL.split(',');
          var contentType = parts[0].split(':')[1];
          var raw = decodeURIComponent(parts[1]);
          return new Blob([raw], { type: contentType });
      }
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
    
      for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
      }
      const blb = new Blob([uInt8Array], { type: contentType });
      this.setState({blob: blb, file: imageSrc});
      console.log(blb);

    }

    sendImage=()=>{
      (async () => {
        console.log(await faceDetect(this.state.blob));
      })()
    }


    takeAnotherPhoto() {
      this.setState({file: ''})
    }

    onChangeHandler= event =>{
        event.preventDefault();
        console.log('File Changed');
        let file = event.target.files[0];
        this.setState({file: file});
        console.log(file);
    }


    handleFileRead = (e) => {
      var BASE64_MARKER = ';base64,';
      let dataURL =  reader.result;
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
          var parts = dataURL.split(',');
          var contentType = parts[0].split(':')[1];
          var raw = decodeURIComponent(parts[1]);
          return new Blob([raw], { type: contentType });
      }
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
    
      for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
      }
      const blb = new Blob([uInt8Array], { type: contentType });
      this.setState({blob: blb});
      console.log(blb);
    }

    onClick=()=>{
      console.log('Someone clicked the button');
      //this.props.redirect('Analyze');
      if(this.state.file != null) {
        console.log(this.state.file);
        reader.readAsDataURL(this.state.file);
        reader.onloadend = this.handleFileRead;
      } else {
        console.log('No File Found')
      }
    }

    onSendClick=()=>{
      if(this.state.blob != null) {
      console.log(utils.detectFace(this.state.blob));
    } else {
      console.log('No Blob Found');
    }
    }

    onClassifyClick=()=>{
      console.log('Someone clicked the button');
      this.props.redirect('Label')
    }

    

    render() {
      let url = reader.result ? reader.result : cover;
        return ( 
          <div id="Home">
            {/* <img src={url} className="App-logo" alt="logo" /> */}
            {/* <img src={url} className="Uploaded-image"/> */}
            
            {/* <p>Your image will not be stored in a database, but rather matched with a generated image.</p> */}
            <div className ="container" id="Container">
              <div className="row" >
                <div className="offset-md-3 col-md-6">
                  <div className="form-group files">
                    <div>
                    <h1>
                      doppleGANer
                    </h1>
                    </div> 
                    <div>   
                      <p>
                      A Project for Creative AI: Contribute to a slow growing dataset by uploading your own portrait and labels. 
                    </p>
                    </div>
                 
                    <label>START BY UPLOADING A FILE OR USING THE WEBCAM TO CAPTURE YOUR SELF PORTRAIT</label>
                    <div className='photopage'>
                    <Webcam
                      audio={false}
                      height={360}
                      width={720}
                      ref={this.setRef.bind(this)}
                      screenshotFormat="image/jpeg"
                      className='webcam'
                    />
                   </div>
                   <div>
                      <Button type='submit' onClick={this.capture.bind(this)}>Capture Photo</Button>
                      <Button type='submit' onClick={this.takeAnotherPhoto.bind(this)}>Retake</Button>
                      <Button type='submit' onClick={this.sendImage.bind(this)}>SendImage</Button>
                   </div>
                    {/* <input type="file" name="file" className="form-control"  onChange={this.onChangeHandler}/> */}
                    <Grid columns={3} divided>
                    <Grid.Row stretched>
                    <Grid.Column>
                    <Button id='button' basic inverted type="button" onClick={this.onClick}>Create Blob</Button>
                    </Grid.Column>
                    <Grid.Column>
                    <Button id='button' basic inverted type="button" onClick={this.onSendClick}>Send</Button> 
                    </Grid.Column>
                    <Grid.Column>
                    <Button id='button' basic inverted type="button" onClick={this.onClassifyClick}>Classify Here</Button> 
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
        </div> 
        )
        }
}

export default Home;