import React from 'react';
import cover from './image/cover.jpg'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler=event=>{
        console.log('File Changed');
    }

    onClick=()=>{
        console.log('Someone clicked the button');
    }

    render() {
        return ( 
          <div className="App">
            
            <img src={cover} className="App-logo" alt="logo" />
            {/* <img src={url} className="Uploaded-image"/> */}
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
                    <input type="file" name="file" className="form-control"  onChange={this.onChangeHandler}/>
                    <button type="button" onClick={this.onClick}>Analyse</button>     
                  </div>
    
                </div>
              </div>
    
            </div>
    
        </div> 
    
        )
        }
}

export default Home;