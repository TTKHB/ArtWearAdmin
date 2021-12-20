import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrdersPage from "../pages/QLOrders/OrdersPage";
import ErrorErrorURLMain from "../pages/PageNotFound/ErrorURLMain";
import DetailsOrder from "../pages/QLOrders/DetailsOrder";
import PageOrder from "../pages/QLOrders/PageOrder";
import EditOrder from "../pages/QLOrders/EditOrder";
const OrdersRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/MainDrawer/qlorders/orders" exact component={OrdersPage} />
        <Route path="/MainDrawer/qlorders/detailsorders" exact component={DetailsOrder} />
        {/* <Route component={ErrorErrorURLMain} /> */}

        <Route path="/MainDrawer/qlorders/PageOrder" exact component={PageOrder} />
        <Route path="/MainDrawer/EditOrder/:id" exact component={EditOrder} />
      </Switch>
    </Router>
  );
};

export default OrdersRouter;
