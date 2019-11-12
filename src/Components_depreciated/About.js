import React from 'react';
import utils from '../Utils';
import cover from '../image/cover.jpg'

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler=event=>{
        console.log('File Changed');
    }

    onClick=()=>{
        console.log('Someone clicked the button');
        this.props.redirect('Home');
    }

    render() {
        return ( 
          <div className="App"> 
            <img src={cover} className="App-logo" alt="logo" />
            <h1>
              doppleGANer ABOUT
            </h1>
            <div className ="container">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <div className="form-group files">
                    <button type="button" onClick={this.onClick}>Home</button>     
                  </div>
                </div>
              </div>
            </div>
        </div>  
        )
      }
}

export default About;