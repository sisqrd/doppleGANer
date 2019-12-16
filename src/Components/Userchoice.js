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
                            <Segment>
                            <p id='dark'>
                                <dark id="bold">I give full permission over my photo and labled information</dark> 
                                <dark>
                                You data will only be used for the purpose of the new slow dataset project and will not be shared otherwise
                                </dark>
                            </p></Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                            <p id='dark'>
                                <dark id="bold">
                                I wish to use a generated image but with my own labels
                                </dark>
                                We will use you text labels but will use a Generative Model to generate a face that is the closest to you
                                *Please hover to get further explanations 
                                <dark>

                                </dark>
                            </p>   
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                            <p id='dark'>
                                <dark id="bold">
                                I do not give consent to my data 
                                </dark>
                                <dark>
                                We will destroy your image and labeled data and it will not be stored
                            {/* more explanation */}
                                </dark>
                            </p> 
                            </Segment>
                            {/* We will destroy your image afterwards */}
                            {/* more explanation */}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
          </div>  
        )
    }
}

export default Userchoice;