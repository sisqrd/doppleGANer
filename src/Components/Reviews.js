import React from 'react';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick=()=>{
        this.props.redirect('Start');
    }

    render() {
        return ( 
          <div className="Reviews"> 
            <div>
              <div><h2 id="title2">This is a project made for Creative AI</h2></div> 
            </div>
          </div>  
        )
    }
}

export default Reviews;