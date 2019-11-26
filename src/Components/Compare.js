import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react'

class Compare extends React.Component {
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

    onClickTest=()=>{
      console.log('Results:', this.props.img, this.props.jason, this.props.label);
    }

    render() {
        return ( 
          <div id="Compare">
              <div className ="container"  id="Container"> 
                <h1>This is how the machine sees you</h1>
                <Grid columns={2} divided>
                    <Grid.Row stretched id="Grid">
                        <Grid.Column>
                            <Segment>
                              <h2>Your Label</h2>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                              <h2>Microsoft API</h2>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div>
                  <Button type='submit' onClick={this.onClick}>Label</Button>    
                </div>
              </div>
            </div> 
            )
      }
}

export default Compare;