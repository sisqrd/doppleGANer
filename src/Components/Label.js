import React from 'react';
import utils from '../Utils';
import cover from '../image/cover.jpg'

class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler=event=>{
        console.log('File Changed');
    }

    onClick=()=>{
        console.log('Someone clicked the button');
        this.props.redirect('Compare');
    }

    onClickPrint=()=>{
      console.log(this.props.img);
      console.log(this.props.jason);
  }

    render() {
       let image = (this.props.img != null) ? this.props.img: null;
        return ( 
          <div className="App"> 
            <img src={cover} className="App-logo" alt="logo" />
            <img src={image} className="App-logo" alt="logo" />
            <h1>
              doppleGANer LABEL
            </h1>
            <div className ="container">
              <div className="row">
                <div className="offset-md-3 col-md-6">
                  <div className="form-group files">
                    <button type="button" onClick={this.onClick}>Home</button>
                    <button type="button" onClick={this.onClickPrint}>Print</button>          
                  </div>
                </div>
              </div>
            </div>
        </div>  
        )
      }
}

export default Label;