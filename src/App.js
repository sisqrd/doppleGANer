import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import utils from './Utils';
import About from './Components/About';
import Compare from './Components/Compare';
import Userchoice from './Components/Userchoice';
import Start from './Components/Start';
import Label from './Components/Label';
import Manifesto from './Components/Manifesto';
import ManifestoExtended from './Components/ManifestoExtended';
import Contact from './Components/Contact';
import { Button, Menu, Segment} from 'semantic-ui-react';
import Axios from 'axios';

class App extends React.Component {
  
    constructor(props){
    super(props)
        this.state = {
                    currentPage: 'ManifestoExtended', 
                    jason: null,
                    link: null,
                    labels: null
                    }
    }

    redirect = (page) => {
        this.setState(
            {
                currentPage: page,
            }
        )
    }

    redirectFS = (page,link,jason) => {
        this.setState(
            {
                currentPage: page,
                link: link,
                jason: jason
            }
        )
    }

    redirectFL = (page,label) => {
        this.setState(
            {
                currentPage: page,
                labels: label
            }
        )
    }

    redirectContact = () => {
        this.redirect('Contact')
    }
    // redirectManifesto = () => {
    //     this.redirect('Manifesto')
    // }

    redirectManifestoExtended = () => {
        this.redirect('ManifestoExtended')
    }
  
    redirectAbout = () => {
        this.redirect('About')
    }

    renderPage = () => {
        const k = this.state.currentPage;
        if (k === 'Label') return <Label redirect={this.redirectFL} img={this.state.link} jason={this.state.jason}/>;
        if (k === 'Compare') return <Compare redirect={this.redirect} img={this.state.link} jason={this.state.jason} label={this.state.labels}/>;
        if (k === 'About') return <About redirect={this.redirect}/>;
        if (k === 'Contact') return <Contact redirect={this.redirect}/>;
        if (k === 'Start') return <Start redirect={this.redirectFS}/>;
        if (k === 'Userchoice') return <Userchoice redirect={this.redirect}/>;
        // if (k === 'Manifesto' || !(k in ['Label', 'Compare', 'About', 'Start','Contact','Userchoice'])) return <Manifesto redirect={this.redirect}/>;
        if (k === 'ManifestoExtended' || !(k in ['Label', 'Compare', 'About', 'Start','Contact','Userchoice'])) return <ManifestoExtended redirect={this.redirect}/>;
    }
  
    render() {
        return ( 
            <div className="AppNav">
                <Menu inverted secondary color={'teal'} id="navbar">
                    {/* <Menu.Item page='Manifesto' active={this.state.currentPage=== 'Manifesto'} onClick={this.redirectManifesto}> Manifesto </Menu.Item> */}
                    <Menu.Item page='ManifestoExtended' active={this.state.currentPage=== 'ManifestoExtended'} onClick={this.redirectManifestoExtended}> Manifesto </Menu.Item>
                    <Menu.Item page='Contact' active={this.state.currentPage === 'Contact'} onClick={this.redirectContact}> Contact </Menu.Item> 
                    <Menu.Item page='About' active={this.state.currentPage === 'About'} onClick={this.redirectAbout}> About the Project </Menu.Item>
                </Menu>
                <this.renderPage/>
            </div> 
    )
    }
}

export default App;