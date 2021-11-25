import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Landing from "../pages/layout/Landing";
import MainDrawer from "../Navigator/MainDrawer";
import { useLogin } from '../Context/AuthContext';
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import NotFound from "../pages/PageNotFound/NotFound";
import AdminRouter from "./AdminRouter";
import ResetPassUser from "../pages/QLUser/ResetPassUser";

//Tại đây sẽ chứa Screen Login và screen MainDrawer
const AuthenRouter = () => {
  const { isLoggedIn } = useLogin();
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route
          exact
          path='/login'
          render={props => <Auth {...props} authRoute='login' />}
        />
        {/* Lớp bảo vệ dc khai báo tại đây (ProtectedRoute) */}
        <ProtectedRoute
          path='/MainDrawer'
          component={MainDrawer} />
        <ProtectedRoute
          path='/Admin'
          component={AdminRouter} />
        {/* Sai đường dẫn sẽ vào trang NotFound này */}

        <Route exact path='/api/v1/users/resetPassword/:token' component={ResetPassUser} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AuthenRouter;
