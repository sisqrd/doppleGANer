import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import utils from './Utils';
import About from './Components/About';
import Compare from './Components/Compare';
import Start from './Components/Start';
import Label from './Components/Label';
import Manifesto from './Components/Manifesto';
import Reviews from './Components/Reviews';
import { Button, Menu, Segment} from 'semantic-ui-react';
import Axios from 'axios';

class App extends React.Component {
  
    constructor(props){
    super(props)
        this.state = {
                    currentPage: 'Manifesto', 
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

    redirectReviews = () => {
        this.redirect('Reviews')
    }
    redirectManifesto = () => {
        this.redirect('Manifesto')
    }
  
    redirectAbout = () => {
        this.redirect('About')
    }

    renderPage = () => {
        const k = this.state.currentPage;
        if (k === 'Label') return <Label redirect={this.redirectFL} img={this.state.link} jason={this.state.jason}/>;
        if (k === 'Compare') return <Compare redirect={this.redirect} img={this.state.link} jason={this.state.jason} label={this.state.labels}/>;
        if (k === 'About') return <About redirect={this.redirect}/>;
        if (k === 'Reviews') return <Reviews redirect={this.redirect}/>;
        if (k === 'Start') return <Start redirect={this.redirectFS}/>;
        if (k === 'Manifesto' || !(k in ['Label', 'Compare', 'About', 'Start','Reviews'])) return <Manifesto redirect={this.redirect}/>;
    }
  
    render() {
        return ( 
            <div className="App">
                <Menu inverted secondary color={'teal'} id="navbar">
                    <Menu.Item page='Manifesto' active={this.state.currentPage=== 'Manifesto'} onClick={this.redirectManifesto}> Manifesto </Menu.Item>
                    <Menu.Item page='Reviews' active={this.state.currentPage === 'Reviews'} onClick={this.redirectReviews}> Reviews </Menu.Item> 
                    <Menu.Item page='About' active={this.state.currentPage === 'About'} onClick={this.redirectAbout}> About the Project </Menu.Item>
                </Menu>
                <this.renderPage/>
            </div> 
    )
    }
}

export default App;