import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductPage from "./../pages/QLProduct/ProductPage";
import InsertProductPage from "./../pages/QLProduct/InsertProductPage";

const ProductRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/qlsanpham/sanpham" exact component={ProductPage} />
        <Route path="/abc" exact component={InsertProductPage} />
      </Switch>
    </Router>
  );
};

export default ProductRouter;
