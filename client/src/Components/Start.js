import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import cover from '../image/cover.jpg';
import { Button, Icon } from 'semantic-ui-react';
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
      axios.post(`/api/images`, {file : file })
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
      axios.post(`/api/images`, {file : file })
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
      axios.post(`/api/analyze`, {link : url })
      .then(json => {
        currentComponent.props.redirect('Label',url,json);
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
    
    redirectManifestoExtended = () => {
      this.props.redirect('ManifestoExtended')
  }

    render() {
    const cap = this.state.img == null ? 'Capture Photo' : 'Retake';
    return (
        <div className="App"> 
            <div id="ManifestoContent" >
                <div><h1 id="title">JIJO: Looking For Your Contribution</h1> </div>
                <div><h2 id="title2">Slow and Self-defined Dataset Collection to Mitigate Harmful Bias</h2></div> 
              
                <div id="subheading">
                <p id="startText"> 
                    <span id="bold">Aiming for a world where AI sees you without any harmful biases.</span> 
                    {/* <span id="bold" onClick={this.redirectManifestoExtended}>MANIFESTO</span> */}
                    {/* <span>1. Serving as an educational experience to help users understand how computer vision, more specifically facial recognition, systems work and make sense of the world. Our main focus is on portraying the differences between how users see themselves and how the AI sees them based on an image captured via the user’s webcam. </span>
                    <span>2. Trying to set up a fresh way of collecting crowdsourced data over time. You will have the option of letting us your photo for a brand new inclusive dataset or use a generated image instead. </span>  */}
                </p>
                </div>
                </div>
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
                <Button type='submit' onClick={this.onClickCapture}>
                <i class="camera icon"></i>
                {cap}</Button>
                <Button color='orange' type='submit' onClick={this.onClickLabel}>
                <i class="file alternate icon"></i>
                  Label</Button>
                {/* <Button type='submit' onClick={this.onClickTest}>Test</Button>           */}
              </div>
            </div>
          </div>
        </div>
      </div> 
       )
      }
}

export default Start;