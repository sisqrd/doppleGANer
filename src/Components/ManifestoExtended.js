import React from 'react';
import { Grid, Image, Form, Button, Checkbox, Segment } from 'semantic-ui-react'
import congress from '../image/congress.png'
import google from '../image/google.png'


class ManifestoExtended extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onClick=()=>{
        this.props.redirect('Start')
    }

    render() {
        return ( 
              <div id="ManifestoContent" >


                <section id='contentWrapper'>
                    <div><h2 id="bold">Amazon’s Face Recognition Falsely Matched 28 Members of Congress With Mugshots</h2></div>

                    <img id='center' src={congress} alt="Congress" height="400" width="580"></img>
                    <p id='dark'>
                <dark id="bold">Amazon’s face surveillance technology is the target of growing opposition nationwide</dark> 
                <dark>  In a study conducted in 2019, Amazon’s Rekognition facial analysis service demonstrated gender and racial biases. Amazon's  Rekognition fails to “see”dark skinned women while being most proficient at detecting light-skinned people.</dark>
                </p>


                </section>

            
                <section id='contentWrapper2'>
                <div><h2 id="bold">Google Photos identified two black people as 'gorillas'</h2></div>
                <img id='center' src={google} alt="Congress" height="317" width="402"></img>
                <p id='dark'>
                <dark id="bold">This isn't the first time software has inadvertently maligned dark-skinned people</dark> 
                <dark> Computer Vision models can have harmful biases embedded. Google's algorithms are far from neutral, with its Google photo's image classification system in classifying African Americans as “gorillas” demonstrate the potentially detrimental effect of hidden biases of ML systems.</dark>
                </p>


                </section>
                
                <section id='mainWrapper'> 
                
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
            </section>

        

              </div>
            
        )
    }
}

export default ManifestoExtended;