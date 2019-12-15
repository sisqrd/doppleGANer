import React, { Component } from 'react';
import cover from './image/cover.jpg'
import './App.css';
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

class App extends Component {

  constructor(props){
    super(props)
        this.state = {
                    currentPage: 'Start', 
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

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    return(
    <div className="AppNav">
                <Menu inverted secondary color={'teal'} id="navbar">
                    {/* <Menu.Item page='Manifesto' active={this.state.currentPage=== 'Manifesto'} onClick={this.redirectManifesto}> Manifesto </Menu.Item> */}
                    <Menu.Item page='ManifestoExtended' active={this.state.currentPage=== 'ManifestoExtended'} onClick={this.redirectManifestoExtended}> Manifesto </Menu.Item>
                    <Menu.Item page='Contact' active={this.state.currentPage === 'Contact'} onClick={this.redirectContact}> Contact </Menu.Item> 
                    <Menu.Item page='About' active={this.state.currentPage === 'About'} onClick={this.redirectAbout}> About the Project </Menu.Item>
                </Menu>
                <this.renderPage/>
            </div> 
  )}          
  //   const { passwords } = this.state;

  //   return (
  //     <div className="App">
  //       {/* Render the passwords if we have them */}
  //       {passwords.length ? (
  //         <div>
  //           <h1>5 Passwords.</h1>
  //           <ul className="passwords">
  //             {/*
  //               Generally it's bad to use "index" as a key.
  //               It's ok for this example because there will always
  //               be the same number of passwords, and they never
  //               change positions in the array.
  //             */}
  //             {passwords.map((password, index) =>
  //               <li key={index}>
  //                 {password}
  //               </li>
  //             )}
  //           </ul>
  //           <button
  //             className="more"
  //             onClick={this.getPasswords}>
  //             Get More
  //           </button>
  //         </div>
  //       ) : (
  //         // Render a helpful message otherwise
  //         <div>
  //           <h1>No passwords :(</h1>
  //           <button
  //             className="more"
  //             onClick={this.getPasswords}>
  //             Try Again?
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }
}

export default App;
