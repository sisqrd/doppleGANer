import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import utils from '../Utils';
import cover from '../image/cover.jpg';
import { Button } from 'semantic-ui-react';

let reader = new FileReader();

const convertURL2Blob = (imageSrc) => {
    let dataURL =  imageSrc;
    var BASE64_MARKER = ';base64,';
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
    return new Blob([uInt8Array], { type: contentType });
}

const testLink = 'https://res.cloudinary.com/dkbmlcs4a/image/upload/v1574626077/face/pdqk99sydv7eht2ajmnk.jpg'
const testLink2 = 'https://res.cloudinary'

class Start extends React.Component {
    
  constructor(props) {
        super(props);
        this.state = {
        img: null,
        link: null,
        jason: null
        }
    }

    setRef=(webcam)=>{
      this.webcam = webcam;
    }

    uploadFile = (file) => {
      let currentComponent = this;
      axios.post(`http://localhost:3001/api/images`, {file : file })
      .then(function (response) {
          currentComponent.setState(
          {
          link: response.data.url
          }
          )
        }
      );
    }

    faceDetect = async (url) => {
      let currentComponent = this;
      fetch(
        process.env.REACT_APP_URI_BASE,
        { method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'link': url}),
        }
      )
      .then(response => response.json())
      .then(json => {
        currentComponent.setState(
        {
        jason: json
        }
        )
      }
    );
    }
    
    onClickCapture=()=>{
        console.log('Capture');
        if(this.state.img == null) {
        const imageSrc = this.webcam.getScreenshot(); 
        this.setState({
            img: imageSrc
        })
        } else {
        this.setState({
            img: null
        })    
        }
    }

    onClickRetake=()=>{
        console.log('Retake');
        this.setState({
            img: null,
            link: null,
            jason: null
        })
    }

    onClickSave=()=>{
      console.log('Save');
      if (this.state.img != null) {
        this.uploadFile(this.state.img);
      } else {
      console.log('No Image Found');   
      }
    }

    onClickSend=()=>{
      console.log('Send');
        if (this.state.link != null || true) {
            //this.faceDetect(this.state.link);
            this.faceDetect(testLink);
        } else {
        console.log('No Link Found');   
        }
    }

    jasonUnwrap=(jason)=>{
      return jason.result[0];
    }

    getAge=(jason)=>{
      return jason.faceAttributes.age;
    }

    getEmotion=(jason)=>{
      const key = Object.keys(jason.faceAttributes.emotion).reduce((a, b) => jason.faceAttributes.emotion[a] > jason.faceAttributes.emotion[b] ? a : b);
      return {[key] :jason.faceAttributes.emotion[key]};
    }

    getGender=(jason)=>{
      return jason.faceAttributes.gender;
    }

    getSmile=(jason)=>{
      return jason.faceAttributes.smile;
    }

    getMakeup=(jason)=>{
      return jason.faceAttributes.makeup;
      //{eyeMakeup: true, lipMakeup: false}
    }
    
    onClick=()=>{
      console.log(this.props);
      this.props.redirect('Label',this.state.link,this.state.jason);
    }

    onClickTest=()=>{
      console.log(this.state.jason);
      if(this.state.jason != null) {
      const uwp = this.jasonUnwrap(this.state.jason);
      console.log('Age',this.getAge(uwp));
      console.log('Emotion', this.getEmotion(uwp));
      console.log('Gender', this.getGender(uwp));
      console.log('Smile', this.getSmile(uwp));
      console.log('Makeup', this.getMakeup(uwp));
      } else
      {
      console.log('Jason is Null');
      }
    }

    render() {
    return (
          <div className="App"> 
            <h1>
            doppleGANer
            </h1>
            <div className ="container">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <div className="form-group files">   
                    { (this.state.img != null) ? (<img src={this.state.img} className="App-logo" alt="logo" />) :
                    (<Webcam
                      audio={false}
                      height={360}
                      width={500}
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      className='webcam'
                    />)}
                    {/* <input type="file" name="file" className="form-control"  onChange={this.onChangeHandler}/> */}
                    <Button type='submit' onClick={this.onClickCapture}>Capture Photo</Button>
                    <Button type='submit' onClick={this.onClickRetake}>Retake</Button>
                    <Button type='submit' onClick={this.onClickSave}>Save Image</Button>
                    <Button type='submit' onClick={this.onClickSend}>Send Image</Button>
                    <Button type='submit' onClick={this.onClick}>Next</Button>
                    <Button type='submit' onClick={this.onClickTest}>Test</Button>      
                  </div>
                </div>
              </div>
            </div>
        </div>
        )
      }
}

export default Start;