import React from 'react';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { Grid, Menu, Segment } from 'semantic-ui-react';

import Auth from './auth/Auth';
import ActionTodo from './components/ActionTodo';
import LogIn from './components/LogIn';
import NotFound from './components/NotFound';
import Todos from './components/Todos';

interface IApp {
  auth: Auth;
  history: any;
}

const App = ({ auth, history }: IApp) => {
  const handleLogin = () => {
    auth.login();
  };

  const handleLogout = () => {
    auth.logout();
  };

  const generateMenu = () => (
    <Menu>
      <Menu.Item name="home">
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
    </Menu>
  );

  const logInLogOutButton = () => {
    if (auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={handleLogout}>
          Log Out
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item name="login" onClick={handleLogin}>
          Log In
        </Menu.Item>
      );
    }
  };

  const generateCurrentPage = () => {
    if (!auth.isAuthenticated()) {
      return <LogIn auth={auth} />;
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Todos {...props} auth={auth} />}
        />

        <Route
          path="/todos/:todoId"
          exact
          render={(props) => <ActionTodo {...props} auth={auth} />}
        />

        <Route component={NotFound} />
      </Switch>
    );
  };

  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={history}>
                {generateMenu()}
                {generateCurrentPage()}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default App;
