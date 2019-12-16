import React from 'react';
import { Grid, Image, Form, Button, Checkbox, Segment, Menu } from 'semantic-ui-react'
import axios from "axios";

class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            gender:'',
            ethnicity:'', 
            age:'', 
            sentiment:'', 
            identity:'',
            context:'', 
        }
    }
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    onChangeHandler=event=>{
        console.log('File Changed');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { gender, ethnicity, age, sentiment, identity, context} = this.state;
        const labels = { Gender : gender, Ethnicity : ethnicity, Age : age, Sentiment : sentiment, Identity : identity, Context : context };
        this.props.redirect('Compare', labels);
    }

    onClickTest=()=>{
      console.log('Results:', this.props.img, this.props.jason);
    }

    render() {
      let img = this.props.img;
      const { gender, ethnicity, age, sentiment, identity, context} = this.state;
      return (
      <div id="Label">
          <div id="ManifestoContent" >
                <div><h1 id="title">Looking For Your Contribution</h1> </div>
                <div><h2 id="title2">Slow and Self-defined Dataset Collection</h2></div> 
              
                <div id="subheading">
                <p id="startText"> 
                    <span id="bold">To make a better world where AI sees you without any harmful biases.</span> 
                    <span id="bold" onClick={this.redirectManifestoExtended}>MANIFESTO</span>
                    {/* <span>1. Serving as an educational experience to help users understand how computer vision, more specifically facial recognition, systems work and make sense of the world. Our main focus is on portraying the differences between how users see themselves and how the AI sees them based on an image captured via the user’s webcam. </span>
                    <span>2. Trying to set up a fresh way of collecting crowdsourced data over time. You will have the option of letting us your photo for a brand new inclusive dataset or use a generated image instead. </span>  */}
                </p>
                </div>
                </div>
      <div className ="container"  id="Container"> 
        <Grid celled id="containerLabel">
        <div>
        <h1>How do you see yourself? </h1>
        </div>
          <Grid.Row>
              <Grid.Column width={8}>
                  <Image src={img} />
              </Grid.Column>
              <Grid.Column width={8} inverted id='Form'>
                  <Form inverted onSubmit={this.handleSubmit}>
                  <Form.Input
                     label='My gender identity is'
                     placeholder='Gender'
                     name='gender'
                     value={gender}
                     onChange={this.handleChange}
                  >
                  </Form.Input>
                  <Form.Input
                     label='My ethnicity is'
                     placeholder='Ethnicity'
                     name='ethnicity'
                     value={ethnicity}
                     onChange={this.handleChange}
                  >
                  </Form.Input>
                  <Form.Input
                     label='My age is'
                     placeholder='Age'
                     name='age'
                     value={age}
                     onChange={this.handleChange}
                  >
                  </Form.Input>
                  <Form.Input
                     label='I am feeling ...'
                     placeholder='Sentiment'
                     name='sentiment'
                     value={sentiment}
                     onChange={this.handleChange}
                  >
                  </Form.Input>
                  <Form.Input
                     label='I am also a'
                     placeholder='Student/Engineer/Dreamer...'
                     name='identity'
                     value={identity}
                     onChange={this.handleChange}
                  >
                  </Form.Input>
                  <Form.Input
                     label='Where is this image taken?'
                     placeholder='Room/Garden/Park'
                     name='context'
                     value={context}
                     onChange={this.handleChange}
                  >
                  </Form.Input>  
                  <div id="buttonForm">
                  <Form.Button type='submit' content='Submit'/>
                  <Form.Button type='submit' content='How AI Sees Me'/>
                  <Form.Button type='submit' content='Changed My Mind'/>
                  </div>
                  </Form>
              </Grid.Column>
          </Grid.Row>
       </Grid>
  </div>
  </div>
        ) 
      }
}

export default Label;