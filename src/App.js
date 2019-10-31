import React from 'react';
import cover from './image/cover.jpg'
import './App.css';
import Home from './Home';

class App extends React.Component {
    
    state = {file: null, counter: 0}
  
    constructor(props){
      super(props)
      this.state = { currentPage: 'Home' }
    }

    redirect(page) {
        this.setState(
            {
                currentPage:page,
            }
        )
    }

    renderPage = () => {
        if (this.state.currentPage === 'Home') return <Home/>;
        else return //<App onComplete={this.onComplete}/>
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