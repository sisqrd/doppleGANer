import React from 'react';


class About extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler=event=>{
        console.log('File Changed');
    }

    onClick=()=>{
        console.log('Someone clicked the button');
        this.props.redirect('Start');
    }

    render() {
        return ( 
          <div className="About"> 
          <div>
  
            
            <div><h2 id="title2">This is a project made for Creative AI</h2></div> 
            </div>
        </div>  
        )
      }
}

export default About;