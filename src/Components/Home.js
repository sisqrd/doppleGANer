import React from 'react';
import cover from '../image/cover.jpg'
import utils from '../Utils';
import Label from './Label';
import { Button } from 'semantic-ui-react'

let reader = new FileReader();

let result = null;

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
          // Set your state here
        }
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
        (async () => {
          let res = await faceDetect(this.state.blob);
          result = await res;
        })()
    } else {
      console.log('No Blob Found');
    }
    }

    onJSONHandler=()=>{
      if (result != null) {
        this.props.redirect('Analyze', result);
      }
    }

    render() {
      let url = reader.result ? reader.result : cover;
        return ( 
          <div className="App">
            <img src={url} className="App-logo" alt="logo" />
            {/* <img src={url} className="Uploaded-image"/> */}
            <h1>
              doppleGANer
            </h1>
            <a>
              A Project for Creative AI: Contribute to a slow growing dataset by uploading your own portrait and labels. 
            </a>
            <p>Your image will not be stored in a database, but rather matched with a generated image.</p>
            <div className ="container">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <div className="form-group files">
                    <label>START BY UPLOADING A FILE OR USING THE WEBCAM TO CAPTURE YOUR SELF PORTRAIT</label>
                    <input type="file" name="file" className="form-control"  onChange={this.onChangeHandler}/>
                    <Button id='button' basic inverted type="button" onClick={this.onClick}>Create Blob</Button>
                    <Button id='button' basic inverted type="button" onClick={this.onSendClick}>Send</Button> 
                    <Button id='button' basic inverted type="button" onClick={this.onJSONHandler}>JSON</Button>      
                  </div>
                </div>
              </div>
            </div>
        </div> 
        )
        }
}

export default Home;