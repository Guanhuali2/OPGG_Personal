import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import challenger from './components/challenger';
import player from './components/Player';
import champion from './components/champion';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" i>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/challenger">Top Player</Nav.Link><br></br>
            <Nav.Link href="/player">Player Information</Nav.Link><br></br>
            <Nav.Link href="/champion">Champion Information</Nav.Link><br></br>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path='/challenger' component={challenger} />
        <Route path='/player' component={player} />
        <Route path='/champion' component={champion} />
      </Switch>
    </Router>
  );
}

export default App;
