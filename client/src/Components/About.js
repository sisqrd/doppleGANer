import React from 'react';
import { Grid, Image, Form, Button, Checkbox, Segment, TextArea, Input } from 'semantic-ui-react'

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick=()=>{
        this.props.redirect('Start');
    }

    render() {
        return ( 
          <div className="Manifesto"> 
             <div><h1 id="title">Have a say in how AI sees you</h1> </div>
                <div><h2 id="title2">DoppleGANer</h2></div> 
                
                <div id="subheading">
                <p> 
                    <span id="bold">The goal of the project is to present an interactive web application that seeks to achieve two goals. </span> 
                    <span>1. Serving as an educational experience to help users understand how computer vision, more specifically facial recognition, systems work and make sense of the world. Our main focus is on portraying the differences between how users see themselves and how the AI sees them based on an image captured via the user’s webcam. </span>
                    <span>2. Trying to set up a fresh way of collecting crowdsourced data over time. You will have the option of letting us your photo for a brand new inclusive dataset or use a generated image instead. </span> 
                </p>
            </div>
            <div id="EnterDiv">
                  <Button basic inverted type="button" id="EnterButton" onClick={this.onClick}>START</Button> 
              </div>
              <Form>
                <Form.Field
                  id='form-input-control-error-email'
                  control={Input}
                  label='Email'
                  placeholder='joe@schmoe.com'
                />
                <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='Please leave your thoughts here'
                  placeholder='Opinion'
                />
              </Form>
              <div id="EnterDiv">
                  <Button basic inverted type="button" id="EnterButton" onClick={this.onClick}>START</Button> 
              </div>

          </div>  
        )
    }
}

export default About;