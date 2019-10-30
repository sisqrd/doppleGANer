import React from 'react';
import axios from 'axios';
import cover from './image/cover.jpg'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
      this.state=({
        selectedFile:null
      } )
  }
  
  onChangeHandler=event=>{
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded:0,
    })
  }
  
  onClickHandler=()=>{
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    console.log("button clicked")
    axios.post("http://localhost:8000/upload", data,{
    })
    .then((response)=> {
      console.log(response);
    }, (error)=>{
      console.log(error);
    })
    }
  

  render() {
    return ( 
      <div className="App">
        
        <img src={cover} className="App-logo" alt="logo" />
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
                <button type="button" onClick={this.onClickHandler}>Upload</button>
              </div>
            </div>
          </div>

        </div>

    </div> 

    )
    }
}

    

export default App;
