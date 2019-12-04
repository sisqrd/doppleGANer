import React from 'react';
import { Image, Card, Grid, Segment, Button } from 'semantic-ui-react'

class Userchoice extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick=()=>{
        this.props.redirect('Start');
    }

    render() {
        return ( 
          <div className="Userchoice"> 
            <div>
              <div><h2 id="title2">Help us form a new dataset</h2></div> 
              <Grid columns={3} divided>
                    <Grid.Row stretched id="Grid">
                        <Grid.Column>
                            <Segment>I give permission to my image and label data</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>I wish to use a generated image but with my own labels</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>I do not want my data to be used</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
          </div>  
        )
    }
}

export default Userchoice;