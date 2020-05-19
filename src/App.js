import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';


import Home from './components/Home';
import Worldmap from './components/Worldmap'


import AP from './components/AP';
import TS from './components/TS';




import Indiamap from './components/Indiamap';

import Worldcharts from './components/Worldcharts';
import APcharts from './components/APcharts';
import TScharts from './components/TScharts';
import Indiacharts from './components/Indiacharts';


class App extends Component {
  render() {
    return (
      <Router>
        <Home>
         
        
          <Route exact path='/' component={Worldcharts} />
        
          
          <Route path='/Indiamap' component={Indiamap} />
          <Route path='/Worldmap' component={Worldmap} />
         
          <Route path='/AP' component={AP} />
        

          
          <Route path='/TS' component={TS} />
        

          
          <Route path='/APcharts' component={APcharts}/>
          <Route path='/TScharts' component={TScharts}/>
          <Route path='/Indiacharts' component={Indiacharts} />
          <Route path='/Worldcharts' component={Worldcharts} />
      
         
        </Home>
       
      </Router>
    );
  }
}

export default App;
