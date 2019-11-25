import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import utils from './Utils';
import About from './Components/About';
import Compare from './Components/Compare';
import Start from './Components/Start';
import Label from './Components/Label';
import { Button } from 'semantic-ui-react';

class App extends React.Component {
  
    constructor(props){
    super(props)
        this.state = {
                    currentPage: 'Home', 
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

    renderPage = () => {
        const k = this.state.currentPage;
        if (k === 'Label') return <Label redirect={this.redirect} img={this.state.link} jason={this.state.jason}/>;
        if (k === 'Compare') return <Compare redirect={this.redirect} img={this.state.link} jason={this.state.jason}/>;
        if (k === 'About') return <About redirect={this.redirect}/>;
        if (k === 'Start' || !(k in ['Label', 'Compare', 'About'])) return <Start redirect={this.redirectFS}/>;
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