import AdminProfile from "../pages/Admin/AdminProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const AdminRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact component={AdminProfile} />
      </Switch>
    </Router>
  );
};

export default AdminRouter;