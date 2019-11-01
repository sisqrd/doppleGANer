import React from 'react';
import { Grid, Segment } from 'semantic-ui-react'


class Analyze extends React.Component {
    constructor(props) {
        super(props);
    }

 
    render() {
        return ( 
          <div id="Analyze">
            <h1>This is how the machine sees you</h1>
            <Grid columns={3} divided>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment>1</Segment>
                    </Grid.Column>
                 <Grid.Column>
                    <Segment>1</Segment>

                </Grid.Column>
                <Grid.Column>
                    <Segment>1</Segment>
           
                </Grid.Column>
                </Grid.Row>
            </Grid>
        </div> 
        )
    }
}

export default Analyze;