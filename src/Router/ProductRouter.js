import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductPage from "./../pages/QLProduct/ProductPage";
import InsertProductPage from "./../pages/QLProduct/InsertProductPage";
import DetailsProduct from "./../pages/QLProduct/DetailsProduct";
import UpdateProduct from "./../pages/QLProduct/UpdateProduct";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import UserPage from "../pages/QLUser/UserPage";
import ErrorErrorURLMain from "../pages/PageNotFound/ErrorURLMain";
const ProductRouter = () => {
  return (
    <Router>
      <Switch>
        {/* Sai đường dẫn sẽ vào trang NotFound này */}
        <Route
          path="/MainDrawer/qlsanpham/sanpham"
          exact
          component={ProductPage}
        />
        <Route
          path="/MainDrawer/qlsanpham/sanpham/:id"
          exact
          component={DetailsProduct}
        />
        <Route
          path="/MainDrawer/qlsanpham/addsanpham"
          exact
          component={InsertProductPage}
        />
        <Route
          path="/MainDrawer/qlsanpham/updatesanpham"
          exact
          component={UpdateProduct}
        />
        <Route path="/MainDrawer/ggg" exact component={UserPage} />
        <Route component={ErrorErrorURLMain} />
      </Switch>
    </Router>
  );
};

export default ProductRouter;
