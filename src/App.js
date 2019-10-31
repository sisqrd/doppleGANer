import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import Home from './Home';
import About from './About';

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

    renderPage = () => {
        if (this.state.currentPage === 'Home') return <Home redirect={this.redirect}/>;
        if (this.state.currentPage === 'Classify') return <Home redirect={this.redirect}/>;
        if (this.state.currentPage === 'Results') return <Home redirect={this.redirect}/>;
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