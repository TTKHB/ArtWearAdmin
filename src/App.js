// import logo from "./logo.svg";
// import "./App.css";
// import React, { useState } from "react";
// import MainDrawer from "./Navigator/MainDrawer";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import ProductRouter from "./Router/ProductRouter";

// function App() {
//   return (
//     <div>
//       <Router>
//         {/* xử lý login vs main trong đây */}

//         <MainDrawer />
//       </Router>
//     </div>
//   );
// }

// export default App;


import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthNavigator from "./Navigator/AuthNavigator";
import AuthContextProvider from "./Context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
      <Router>
        {/* Đầu tiên app sẽ chạy vào AuthNavigator */}
        <AuthNavigator/>
      </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;