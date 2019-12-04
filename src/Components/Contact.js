import React from 'react';

class Contact extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick=()=>{
        this.props.redirect('Start');
    }

    render() {
        return ( 
          <div className="Contact"> 
            <div>
              <div><h2 id="title2">This is a project made for Creative AI</h2></div> 
            </div>
          </div>  
        )
    }
}

export default Contact;