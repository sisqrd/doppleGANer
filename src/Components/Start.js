import React from 'react';
import Webcam from 'react-webcam';
import utils from '../Utils';
import cover from '../image/cover.jpg'
import { Button } from 'semantic-ui-react'

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

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        img: null,
        jason: null
        }
    }

    onChangeHandler=event=>{
        event.preventDefault();
        console.log('File Changed');
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = this.handleFileRead;
    }

    handleFileRead = (e) => {
        this.setState(
            {
            img: reader.result
            }
        )
    }

    onClick=()=>{
        console.log('Someone clicked the button');
        this.props.redirect('Label');
    }

    onClickCapture=()=>{
        if(this.state.img == null) {
        const imageSrc = this.webcam.getScreenshot(); 
        //const imageBlob = convertURL2Blob(imageSrc); 
        //console.log(imageBlob);
        console.log(imageSrc);
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
            img: null
        })
    }

    onClickSend=()=>{
        console.log('Send');
        if (this.state.img != null) {
            const imageBlob = convertURL2Blob(this.state.img); 
            console.log(imageBlob);
        } else {
        console.log('No Image Found');   
        }
    }

    setRef=(webcam)=>{
        this.webcam = webcam;
    }
  
    render() {
        return ( 
          <div className="App"> 
            <img src={cover} className="App-logo" alt="logo" />
            <h1>
            doppleGANer START
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
                    <input type="file" name="file" className="form-control"  onChange={this.onChangeHandler}/>
                    <Button type='submit' onClick={this.onClickCapture}>Capture Photo</Button>
                    <Button type='submit' onClick={this.onClickRetake}>Retake</Button>
                    <Button type='submit' onClick={this.onClickSend}>SendImage</Button>
                    <Button type='submit' onClick={this.onClick}>Home</Button>     
                  </div>
                </div>
              </div>
            </div>
        </div>  
        )
      }
}

export default Start;