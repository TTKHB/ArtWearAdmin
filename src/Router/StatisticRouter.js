import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StatisticOrder from "./../pages/QLStatistic/StatisticOrder";
import StatisticUser from "./../pages/QLStatistic/StatisticUser";

const StatisticRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/MainDrawer/statistic/statistic_order"
          exact
          component={StatisticOrder}
        />
        <Route
          path="/MainDrawer/statistic/statistic_user"
          exact
          component={StatisticUser}
        />
        {/* <Route component={ErrorErrorURLMain} /> */}
      </Switch>
    </Router>
  );
};

export default StatisticRouter;
