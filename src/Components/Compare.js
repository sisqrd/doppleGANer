import React from 'react';
import { Image, Card, Grid, Segment, Button } from 'semantic-ui-react'

class Compare extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler=event=>{
        console.log('File Changed');
    }

    onClick=()=>{
        console.log('Someone clicked the button');
        this.props.redirect('Userchoice');
    }

    onClickTest=()=>{
      console.log('Results:', this.props.img, this.props.jason, this.props.label);
      this.props.redirect('Userchoice');
    }

    jasonUnwrap=(jason)=>{
      return jason.result[0];
    }

    getAge=(jason)=>{
      return jason.faceAttributes.age;
    }

    getEmotion=(jason)=>{
      const key = Object.keys(jason.faceAttributes.emotion).reduce((a, b) => jason.faceAttributes.emotion[a] > jason.faceAttributes.emotion[b] ? a : b);
      const em = key.charAt(0).toUpperCase() + key.slice(1);
      return (jason.faceAttributes.emotion[key] * 100).toFixed(2) + "% " + em; 
    }

    getGender=(jason)=>{
      let gen = jason.faceAttributes.gender;
      return gen.charAt(0).toUpperCase() + gen.slice(1); 
    }

    getSmile=(jason)=>{
      return (jason.faceAttributes.smile * 100).toFixed(2) + "%";
    }

    getMakeup=(jason)=>{
      let str = "";
      Object.entries(jason.faceAttributes.makeup).forEach(([key, value]) => {
        str += key.charAt(0).toUpperCase() + key.slice(1) + ": " + value + " ";
     });
      return str;
    }

    getBald=(jason)=>{
      return  (jason.faceAttributes.hair.bald * 100).toFixed(2) + "%";
    }

    getHairColor=(jason)=>{
      const key = Object.keys(jason.faceAttributes.hair.hairColor).reduce((a, b) => jason.faceAttributes.hair.hairColor[a].confidence > jason.faceAttributes.hair.hairColor[b].confidence ? a : b);
      const em = jason.faceAttributes.hair.hairColor[key].color.charAt(0).toUpperCase() + jason.faceAttributes.hair.hairColor[key].color.slice(1);
      return (jason.faceAttributes.hair.hairColor[key].confidence * 100).toFixed(2) + "% " + em; 
      //{color: "other", confidence: 0.06}
    }

    render() {
      let img=this.props.img
      let jsn=this.jasonUnwrap(this.props.jason);
        return ( 
          <div id="Compare">
              <div  id="ContainerCompare"> 
                <h1>How the machine sees you</h1>
                <Grid columns={2} divided>
                    <Grid.Row stretched id="Grid">
                        <Grid.Column>
                              <Card className='card'>
                              <Image src={img} wrapped ui={false} />
                              <Card.Content>
                                <Card.Header>How you labeled yourself</Card.Header>
                                <Card.Description>
                                  How you see yourself
                                </Card.Description>  
                              </Card.Content>
                              <Card.Content extra>
                                <p className='pblack'>
                                  I identify as: {this.props.label.Gender}
                                </p>
                                <p className='pblack'>
                                  Ethnicity: {this.props.label.Ethnicity}
                                </p>
                                <p className='pblack'>
                                  Gender: {this.props.label.Gender}
                                </p>
                                <p className='pblack'>
                                  Age: {this.props.label.Age}
                                </p>
                                <p className='pblack'>
                                  Sentiment: {this.props.label.Sentiment}
                                </p>
                                <p className='pblack'>
                                  I am also a: {this.props.label.Identity}
                                </p>
                                <p className='pblack'>
                                  Context: {this.props.label.Context}
                                </p>
                              </Card.Content>
                            </Card>
                        
                        </Grid.Column>
                        <Grid.Column>
                        <Card className='card'>
                              <Image src={img} wrapped ui={false} />
                              <Card.Content>
                                <Card.Header>Microsoft API</Card.Header>
                                <Card.Description>
                                  How does the machine see you? 
                                  The category names are predetermined by the API
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                <p className='pblack'>
                                  Gender: {this.getGender(jsn)}
                                </p>
                                <p className='pblack'>
                                  Baldness: {this.getBald(jsn)}
                                </p>
                                <p className='pblack'>
                                  Hair Color: {this.getHairColor(jsn)}
                                </p>
                                <p className='pblack'>
                                  Age: {this.getAge(jsn)}
                                </p>
                                <p className='pblack'>
                                  Sentiment: {this.getEmotion(jsn)}
                                </p>
                                <p className='pblack'>
                                  Makeup : {this.getMakeup(jsn)}
                                </p>
                                <p className='pblack'>
                                  Smile: {this.getSmile(jsn)}
                                </p>
                              </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
              </div>
              <Button className='NextButton' type='button' onClick={this.onClickTest}>Next</Button>  
            </div> 
            )
      }
}

export default Compare;