import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuPage from "./../pages/QLMenu/MenuPage";
import ErrorErrorURLMain from "./../pages/PageNotFound/ErrorURLMain";

const MenuRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/MainDrawer/qlmenu/menu" exact component={MenuPage} />
        {/* <Route component={ErrorErrorURLMain} /> */}
      </Switch>
    </Router>
  );
};

export default MenuRouter;
