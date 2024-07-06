import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import AuthContext from './contexts/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import Battle from './components/Battle';
import Leaderboard from './components/Leaderboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    WebApp.ready();
    // Add Telegram authentication logic here
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route exact path="/" component={user ? Home : Login} />
          <Route path="/battle/:id" component={Battle} />
          <Route path="/leaderboard" component={Leaderboard} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;