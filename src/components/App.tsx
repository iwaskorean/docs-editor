import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Main';
import Create from './Create';
import Editor from './Editor';

import '../scss/main.scss';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/create" exact component={Create} />
          <Route path="/document" component={Editor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
