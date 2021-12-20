import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditUser from "../pages/QLUser/EditUser";
import Messenger from "../pages/QLUser/Messenger";
import UserPage from "../pages/QLUser/UserPage";

const UserRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/MainDrawer/UserPage" exact component={UserPage}/>
        <Route path="/MainDrawer/EditUser/:id" exact component={EditUser}/>
        <Route path="/MainDrawer/Messenger" exact component={Messenger} />
      </Switch>
    </Router>
  );
};

export default UserRouter;
