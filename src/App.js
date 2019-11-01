import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import utils from './Utils';
import About from './Components/About';
import Analyze from './Components/Analyze';
import Home from './Components/Home';
import Label from './Components/Label';

class App extends React.Component {
    
    state = {file: null, counter: 0}
  
    constructor(props){
      super(props)
      this.state = { currentPage: 'Home' }
    }

    redirect = (page) => {
        this.setState(
            {
                currentPage: page,
            }
        )
    }

    redirectWithJSON = (page, json) => {
        this.setState(
            {
                currentPage: page,
                json: json
            }
        )
    }

    renderPage = () => {
        if (this.state.currentPage === 'Home') return <Home redirect={this.redirect}/>;
        if (this.state.currentPage === 'Label') return <Label redirect={this.redirect}/>;
        if (this.state.currentPage === 'Analyze') return <Analyze redirect={this.redirect}/>;
        if (this.state.currentPage === 'About') return <About redirect={this.redirect}/>;
        else return <Home redirect={this.redirect}/>;
    }
  
    render() {
        return ( 
          <div className="App">
            <this.renderPage/>
        </div> 
    )
    }
}

export default App;