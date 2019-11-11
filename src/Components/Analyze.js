import React from 'react';
import utils from '../Utils';
import { Grid, Segment, Button } from 'semantic-ui-react'



class Analyze extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            // Set your state here
        }
    }

    onJSONHandler=()=>{
        //console.log(this.props.jason);
        //console.log(this.props.jason[0].faceAttributes);
        console.log(this.getAge(this.props.jason[0]));
        console.log(this.getEmotion(this.props.jason[0]));
        console.log(this.getGender(this.props.jason[0]));
        console.log(this.getSmile(this.props.jason[0]));
    }

    getAge=(jason)=>{
        return jason.faceAttributes.age;
    }

    getEmotion=(jason)=>{
        return Object.keys(jason.faceAttributes.emotion).reduce((a, b) => jason.faceAttributes.emotion[a] > jason.faceAttributes.emotion[b] ? a : b);
    }

    getGender=(jason)=>{
        return jason.faceAttributes.gender;
    }

    getSmile=(jason)=>{
        return jason.faceAttributes.smile;
    }



//     {smile: 0.092, gender: "female", age: 23, facialHair: {…}, glasses: "NoGlasses", …}
// accessories: []
// age: 23
// emotion: {anger: 0.002, contempt: 0.004, disgust: 0.001, fear: 0, happiness: 0.092, …}
// facialHair: {moustache: 0, beard: 0, sideburns: 0}
// gender: "female"
// glasses: "NoGlasses"
// hair: {bald: 0.05, invisible: false, hairColor: Array(6)}
// makeup: {eyeMakeup: true, lipMakeup: true}
// smile: 0.092

    render() {
        let url = (this.props.blb ? this.props.blb : '');
        let age = (this.getAge(this.props.jason[0]));
        let emotion = (this.getEmotion(this.props.jason[0]));
        let gender = (this.getGender(this.props.jason[0]));
        let smile = (this.getSmile(this.props.jason[0]));
        return ( 
          <div id="Analyze">
            <h1>This is how the machine sees you</h1>
            <Grid columns={3} divided>
            <img src={url} className="App-logo" alt="logo" />
            <Button id='button' basic inverted type="button" onClick={this.onJSONHandler}>JSON</Button>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment>Age</Segment>
                        <Segment>Emotion</Segment>
                        <Segment>Gender</Segment>
                        <Segment>Smile</Segment>
                    </Grid.Column>
                 <Grid.Column>
                        <Segment>{age}</Segment>
                        <Segment>{emotion}</Segment>
                        <Segment>{gender}</Segment>
                        <Segment>{smile}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment></Segment>
           
                </Grid.Column>
                </Grid.Row>
            </Grid>
        </div> 
        )
    }
}

export default Analyze;