import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import utils from '../Utils';
import cover from '../image/cover.jpg';
import { Button } from 'semantic-ui-react';
const _ = require('lodash');
//import { throttle } from lodash;

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

class Start extends React.Component {
    
  constructor(props) {
        super(props);
        this.state = {
        img: null,
        link: null,
        linkSent: null,
        jason: null
        }
      this.onClickLabelThrottled = _.throttle(this.onClickLabel, 2000);
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

    uploadNdetect = (file) => {
      let currentComponent = this;
      let url = null;
      let jas = null;
      axios.post(`http://localhost:3001/api/images`, {file : file })
      .then(function (response) {
        url = response.data.url;
      })
      .then(function () {
        currentComponent.faceDetect(url);
    })
  }

    faceDetect = (url) => {
      let currentComponent = this;
      let jas = null;
      fetch(
        process.env.REACT_APP_URI_BASE,
        { method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'link': url}),
        }
      )
      .then(response => response.json())
      .then(json => {
        jas = json;
        currentComponent.setState(
        {
        jason: json,
        linkSent: url,
        link: url
        }
      )})
      .then(function () {
        currentComponent.props.redirect('Label',url,jas);
      });
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
            img: null,
            link: null,
            jason: null
        })    
        }
    }

    onSave=()=>{
      console.log('Saving to Cloud');
      if (this.state.img != null) {
        this.uploadFile(this.state.img);
      } else {
      console.log('No Image Found');   
      }
    }

    onSend=()=>{
      console.log('Sending Image for Analysis');
        if (this.state.link != null) {
            this.faceDetect(this.state.link);
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
    
    onClickLabel=()=>{
      console.log('Label');
        this.uploadNdetect(this.state.img);   
    }
      // if(this.state.link != null && this.state.jason != null) {
      //   this.props.redirect('Label',this.state.link,this.state.jason);
      // }

    onClickTest=()=>{
      console.log('Results:', this.state.link, this.state.jason);
    }

    render() {
    const cap = this.state.img == null ? 'Capture Photo' : 'Retake';
    return (
        <div className="App"> 
        <div className ="container" id="Container">
        <h1>
                Start by taking a selfie
        </h1>
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
                <Button type='submit' onClick={this.onClickCapture}>{cap}</Button>
                <Button type='submit' onClick={this.onClickLabel}>Label</Button>
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