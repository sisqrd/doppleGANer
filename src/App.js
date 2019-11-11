import React from 'react';
import axios from 'axios';
import cover from './image/cover.jpg'
import './App.css';
import Home from './Home';
import Label from './Label';
import Analyze from './Analyze';

class App extends React.Component {
  constructor(props){
    super(props)
      this.state=({
        selectedFile:null,
        currentPage:'Home',
      } )
  }
  
  redirect(page){
    this.setState({
      currentPage: page,
    })
}

    redirect =(page)=>{
        this.setState(
            {
                currentPage:page,
            }
        )
    }
    
    renderPage = () => {
        if (this.state.currentPage === 'Home') return <Home redirect={this.redirect}/>;
        if (this.state.currentPage === 'Label') return <Label redirect={this.redirect}/>;
        if (this.state.currentPage === 'Analyze') return <Analyze redirect={this.redirect}/>;
      
        
        else return //<App onComplete={this.onComplete}/>
    }
  
    render() {
        return ( 
          <div className='App'>
            <this.renderPage/>
        </div> 
    )
    }
}

export default App;
