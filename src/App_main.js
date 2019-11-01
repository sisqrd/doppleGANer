import React from 'react';
import axios from 'axios';
import cover from './image/cover.jpg'
import './App.css';

let urls = new WeakMap();
let results = '';

let blobUrl = blob => {
  if (urls.has(blob)) {
    return urls.get(blob)
  } else {
    let url = URL.createObjectURL(blob)
    urls.set(blob, url)
    return url
  }
}

const handleFileRead = (e) => {
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
  faceDetect(blb);
  //console.log(blb);
  }

async function faceDetect(url) {

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
  results = newResult;
  //console.log(newResult);
}

class App extends React.Component {

  state = {file: null, counter: 0}
  
  constructor(props){
    super(props)
      this.state=({
        selectedFile:null
      } )
      this.handleLoad = this.handleLoad.bind(this);
  }

  onChangeHandler=event=>{
    //console.log(event.target.files[0])
    // this.setState({
    //   selectedFile: event.target.files[0],
    //   loaded:0,
    // })
    event.preventDefault();
    let file = event.target.files[0];
    // let image_url = URL.createObjectURL(event.target.files[0])
    // console.log(image_url)
    this.setState({file: file});
    // iurl : image_url})
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = handleFileRead;
  }
  
  onClickHandler=()=>{
    // console.log(this.state.file);
    // this.reader.onloadend = handleFileRead;
    // reader.readAsDataURL(this.state.file);
    console.log(results);
   //console.log(reader.result);

    //console.log(this.state.file);
    // const data = new FormData()
    // data.append('file', this.state.selectedFile)
    // console.log("button clicked")
    // axios.post("http://localhost:8000/upload", data,{
    // })
    // .then((response)=> {
    //   console.log(response);
    // }, (error)=>{
    //   console.log(error);
    // })

    //this.faceDetect();
    }

  componentDidMount() {
      window.addEventListener('load', this.handleLoad);
   }

  handleLoad() {
  console.log('On Mount Succesfull'); //  $ is available here
  }
    
  render() {
    let { file } = this.state;
    let url = file && blobUrl(file);
    //<img src='https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg' className="App-logo" alt="logo" />
    return ( 
      <div className="App">
        
        <img src={cover} className="App-logo" alt="logo" />
        <img src={url} className="Uploaded-image"/>
        <h1>
          doppleGANer
        </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Project for Creative AI: Contribute to a slow growing dataset by uploading your own portrait and labels. 
        </a>
        <p>Your image will not be stored in a database, but rather matched with a generated image.</p>
        <div className ="container">
          <div className="row">

            <div className="offset-md-3 col-md-6">
              <div className="form-group files">
                <label>Upload File</label>
                <input type="file" name="file" className="form-control" onChange={this.onChangeHandler}/>
                <button type="button" onClick={this.onClickHandler}>Analyse</button>     
              </div>

            </div>
          </div>

        </div>

    </div> 

    )
    }
}

    

export default App;


