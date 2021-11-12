
import './App.css';

import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar';
import Navbar from './component/Navbar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App =()=> {
  const pageSize=6;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0);
  

    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={progress}
            
          />
          <Switch>
            <Route exact key="general" path="/"><News apiKey={apiKey} setProgress={setProgress}  pageSize={pageSize} category="general"/></Route>
            <Route exact key="business" path="/business"><News  apiKey={apiKey}  setProgress={setProgress} pageSize={pageSize} category="business"/></Route>
            <Route exact key="entertainment" path="/entertainment"><News  apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} category="entertainment"/></Route>
            <Route exact key="general" path="/general"><News  apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} category="general"/></Route>
            <Route exact key="health" path="/health"><News  apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} category="health"/></Route>
            <Route exact key="science" path="/science"><News  apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} category="science"/></Route>
            <Route exact key="sports" path="/sports"><News  apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} category="sports"/></Route>
            <Route exact key="technology" path="/technology"><News  apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} category="technology"/></Route>
          </Switch>
        </Router>
      </div>
    )
  
}
export default App;

