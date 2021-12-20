import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import statisticOrder from "./../pages/Statistic/statisticOrder";
import statisticUser from "./../pages/Statistic/statisticUser";

const StatisticRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/MainDrawer/statistic/statistic_order"
          exact
          component={statisticOrder}
        />
        <Route
          path="/MainDrawer/statistic/statistic_user"
          exact
          component={statisticUser}
        />
        {/* <Route component={ErrorErrorURLMain} /> */}
      </Switch>
    </Router>
  );
};

export default StatisticRouter;
