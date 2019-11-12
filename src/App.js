import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import utils from './Utils';
import About from './Components/About';
import Compare from './Components/Compare';
import Start from './Components/Start';
import Label from './Components/Label';

class App extends React.Component {
    
    state = {file: null, counter: 0}
  
    constructor(props){
      super(props)
      this.state = {currentPage: 'Home', 
                    img: null,
                    jason: null,
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

    redirectFromStart = (page, json, img) => {
        console.log(json);
        this.setState(
            {
                currentPage: page,
                jason: json,
                img: img
            }
        )
    }

    renderPage = () => {
        if (this.state.currentPage === 'Start') return <Start redirect={this.redirectWithJSON}/>;
        if (this.state.currentPage === 'Label') return <Label redirect={this.redirect}/>;
        if (this.state.currentPage === 'Compare') return <Compare redirect={this.redirect} jason={this.state.jason} blb={this.state.blob}/>;
        if (this.state.currentPage === 'About') return <About redirect={this.redirect}/>;
        else return <Start redirect={this.redirect}/>;
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