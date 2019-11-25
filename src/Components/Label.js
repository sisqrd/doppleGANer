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

    onClick=()=>{
        console.log('Data submitted');
        this.props.redirect('Compare');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('helllooo');
        const { gender, ethnicity, age, sentiment, identity, context} = this.state
        this.setState({ gender: gender, ethnicity: ethnicity, age:age, sentiment:sentiment, identity:identity, context:context })
    
        axios.post('http://localhost:3001/labelData', { gender, ethnicity,age, sentiment, identity, context })
            .then(function (response) {
            //handle success
                console.log(response);
            })
            .catch(function (response) {
            //handle error
                console.log("error");
            });
            this.props.redirect('Compare');
      }

    
    // handleSubmit=(event)=>{
    //     const createForm ={
    //         gender:this.state.gender,
    //         ethnicity:this.state.ethnicity, 
    //         age:this.state.age, 
    //         sentiment:this.state.sentiment, 
    //         identity:this.state.identity,
    //         context:this.state.context, 
    //     }
    //     event.preventDefault();
    //     var data = new FormData(event.target);
    //     data.append('info', createForm);
    //     console.log('helllooo');

    //     axios({
    //         method: 'post',
    //         url: 'localhost:3001/labelData',
    //         data: data,
    //         headers: {'Content-Type': 'multipart/form-data' }
    //         })
    //         .then(function (response) {
    //             //handle success
    //             console.log(response);
    //         })
    //         .catch(function (response) {
    //             //handle error
    //             console.log(response);
    //         });
    
    //   }
    

    onClickHome=()=>{
        this.props.redirect('Home')
    }

      
    render() {

        let img = this.props.img;
        const { gender, ethnicity, age, sentiment, identity, context } = this.state;

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