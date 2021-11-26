import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InsertNotificationPage from "../pages/QLNotification/InsertNotificationPage";
import NotificationPage from "../pages/QLNotification/NotificationPage";
import ErrorErrorURLMain from "./../pages/PageNotFound/ErrorURLMain";

const NotificationRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/MainDrawer/qlnotification/notification" exact component={NotificationPage} />
        <Route path="/MainDrawer/qlnotification/addnotification" exact component={InsertNotificationPage} />
        {/* <Route component={ErrorErrorURLMain} /> */}
      </Switch>
    </Router>
  );
};

export default NotificationRouter;
