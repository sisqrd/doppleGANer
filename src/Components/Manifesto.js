import React from 'react';
import { Grid, Image, Form, Button, Checkbox, Segment } from 'semantic-ui-react'

class Manifesto extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onClick=()=>{
        console.log('Someone clicked the button');
        this.props.redirect('Home')
    }

    render() {
        return ( 
          <div id="Manifesto">
              <div id="ManifestoContent" >
                <div><h1 id="title">Have a say in how AI sees you</h1> </div>
                <div><h2 id="title2">DoppleGANer - A Creative AI Project for slow data curation</h2></div> 
                
                <div id="subheading">
                <p> 
                    <span id="bold">The goal of the project is to present an interactive web application that seeks to achieve two goals. </span> 
                    <span>1. Serving as an educational experience to help users understand how computer vision, more specifically facial recognition, systems work and make sense of the world. Our main focus is on portraying the differences between how users see themselves and how the AI sees them based on an image captured via the user’s webcam. </span>
                    <span>2. Trying to set up a fresh way of collecting crowdsourced data over time. You will have the option of letting us your photo for a brand new inclusive dataset or use a generated image instead. </span> 
                </p>
                </div>
             
              <div>
                  <Button basic inverted type="button" id="EnterButton" onClick={this.onClick}>START</Button> 
              </div>
              </div>
            
        </div> 
        )
    }
}

export default Manifesto;