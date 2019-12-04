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
      return JSON.stringify({[key] :jason.faceAttributes.emotion[key]});
    }

    getGender=(jason)=>{
      return jason.faceAttributes.gender;
    }

    getSmile=(jason)=>{
      return jason.faceAttributes.smile;
    }

    getMakeup=(jason)=>{
      return JSON.stringify(jason.faceAttributes.makeup);
      //{eyeMakeup: true, lipMakeup: false}
    }

    getBald=(jason)=>{
      return jason.faceAttributes.hair.bald;
      //{eyeMakeup: true, lipMakeup: false}
    }

    getHairColor=(jason)=>{
      const key = Object.keys(jason.faceAttributes.hair.hairColor).reduce((a, b) => jason.faceAttributes.hair.hairColor[a].confidence > jason.faceAttributes.hair.hairColor[b].confidence ? a : b);
      return JSON.stringify({[jason.faceAttributes.hair.hairColor[key].color] : jason.faceAttributes.hair.hairColor[key].confidence});
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
                                  How does the machine see you? Category names are predetermined by the API
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