import React from 'react';
import { Grid, Image, Form, Button, Checkbox, Segment } from 'semantic-ui-react'


class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    
    onClick=()=>{
        console.log('Someone clicked the button');
        this.props.redirect('Analyze')
    }

    render() {
        return ( 
          <div id="Label">
              <h1>How do you see yourself? </h1>
              <Grid celled>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Image src='/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column width={8} inverted id='Form'>
                        <Form inverted >
                        <Form.Field>
                            <label>Gender</label>
                            <input placeholder='Gender' />
                            </Form.Field>
                            <Form.Field>
                            <label>Race</label>
                            <input placeholder='Race' />
                            </Form.Field>
                            <Form.Field>
                            <label>Age</label>
                            <input placeholder='Age' />
                            </Form.Field>
                            <Form.Field>
                            <label>I am feeling ... </label>
                            <input placeholder='Sentiment' />
                            </Form.Field>
                            <Form.Field>
                            <label>I identify as:</label>
                            <input placeholder='A student/ mother/ artist' />
                            </Form.Field>

                            <Form.Field id='formfield'>
                            <Checkbox label='I agree to the Terms and Conditions' />
                            </Form.Field>
                            <Form.Field>
                            <Button type='submit' onClick={this.onClick}>How does the machine see me? </Button>
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
             </Grid>
        </div> 
        )
    }
}

export default Label;