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
                     label='Gender'
                     placeholder='Gender'
                     name='gender'
                     value={gender}
                     onChange={this.handleChange}
                  >
                  </Form.Input>
                  <Form.Input
                     label='Ethnicity'
                     placeholder='Ethnicity'
                     name='ethnicity'
                     value={ethnicity}
                     onChange={this.handleChange}
                  >
                  </Form.Input>
                  <Form.Input
                     label='Age'
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
                     label='I identify as:'
                     placeholder='Identity'
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
                  <Form.Button type='submit' content='How does the machine see me?'/>
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