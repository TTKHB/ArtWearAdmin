import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Landing from "../pages/layout/Landing";
import MainDrawer from "../Navigator/MainDrawer";
import { useLogin } from '../Context/AuthContext';

//Tại đây sẽ chứa Screen Login và screen MainDrawer
const AuthenRouter = () => {

  const { isLoggedIn } = useLogin();

  return (
    <Router>
      <Switch>
        {/* Nếu đã login sẽ vào MainDrawer */}
        {isLoggedIn ? (
          <>
            <Route
              path='/MainDrawer'
              component={MainDrawer} />
          </>
        ) : (
        //  Nếu chưa sẽ vào Login
          <>
            <Route exact path='/' component={Landing} />
            <Route
              exact
              path='/login'
              render={props => <Auth {...props} authRoute='login' />}
            />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AuthenRouter;
