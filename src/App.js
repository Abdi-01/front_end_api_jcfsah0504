import React from 'react';
import { Route, Switch } from 'react-router-dom'
import FormPage from './pages/form'
import Navbar from './components/navbar'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/' component={FormPage} exact />
        </Switch>
      </div>
    );
  }
}

export default App;