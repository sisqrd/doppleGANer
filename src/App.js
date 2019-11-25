import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import About from './Components/About';
import Compare from './Components/Compare';
import Start from './Components/Start';
import Manifesto from './Components/Manifesto';
import Label from './Components/Label';
import { Button, Menu, Segment} from 'semantic-ui-react'
import Axios from 'axios';

let img = null;
let jason = null;

class App extends React.Component {
  
    constructor(props){
      super(props)
      this.state = {
        userLabel: [],
        currentPage: 'Manifesto', 
                    labels: null
                    }
    }

    //Handle data from child component Label
  
    redirect = (currentPage) => {
        this.setState(
            {
                currentPage: currentPage,
            }
        )
    }

    redirectFromStart = (page, json, img) => {
        this.setState(
            {
                currentPage: page,
                jason: json,
                img: img
            } 
        )
    }

    onClick=()=>{
      console.log('Someone clicked the button');
      this.redirect('Home')
  }
  redirectManifesto=()=>{
    console.log('Someone clicked the button');
    this.redirect('Manifesto')
}

redirectAbout=()=>{
  console.log('Someone clicked the button');
  this.redirect('About')
}

  //  handleItemClick = (e, { name }) => this.redirect({ activeItem: name })

    renderPage = () => {
        if (this.state.currentPage === 'Start') return <Start redirect={this.redirectFromStart}/>;
        if (this.state.currentPage === 'Label') return <Label redirect={this.redirect} img={this.state.img}/>;
        if (this.state.currentPage === 'Compare') return <Compare redirect={this.redirect} jason={this.state.jason} img={this.state.img}/>;
        if (this.state.currentPage === 'About') return <About redirect={this.redirect}/>;
        if (this.state.currentPage === 'Manifesto') return <Manifesto redirect={this.redirect}/>;
        else return <Start redirect={this.redirect}/>;
    }
  
    render() {
      const { currentPage} = this.state
      console.log('IS IMG NULL?', this.state.img);
        return ( 
          <div className="App">

        <div>
          
        <Menu inverted secondary color={'teal'} id="navbar">
        <Menu.Item
          page='Manifesto'
          active={currentPage=== 'Manifesto'}
          onClick={this.redirectManifesto}
        >
          Manifesto
        </Menu.Item>
          
        <Menu.Item
          page='reviews'
          active={currentPage === 'reviews'}
          onClick={this.redirect}
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          page='About'
          active={currentPage === 'About'}
          onClick={this.redirectAbout}
        >
          About the Project
        </Menu.Item>
        </Menu>
        </div>
            <this.renderPage/>
        </div> 
    )
    }
}

export default App;