import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movie from './Components/Movie';
import Favourite from './Components/Favourite';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact render={()=>
          <Fragment>
          <Banner/>
          <Movie/>
          </Fragment>
          } />
          <Route path='/' exact component={Movie} />

          <Route path='/favourites' exact component={Favourite} />
        </Switch>

      </Router>
    </>
  );
}

export default App;
