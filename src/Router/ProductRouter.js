import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductPage from "./../pages/QLProduct/ProductPage";
import InsertProductPage from "./../pages/QLProduct/InsertProductPage";
import DetailsProduct from "./../pages/QLProduct/DetailsProduct";
import UpdateProduct from "./../pages/QLProduct/UpdateProduct";

const ProductRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/MainDrawer/qlsanpham/sanpham" exact component={ProductPage} />
        <Route path="/MainDrawer/qlsanpham/sanpham/:id" exact component={DetailsProduct} />
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
      </Switch>
    </Router>
  );
};

export default ProductRouter;
