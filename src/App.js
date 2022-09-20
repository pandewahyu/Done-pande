import "./App.css";
import LayoutDashboard from "./layout/layout";
import "@fontsource/roboto";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Login from "./halamanAwal/Login";
import LForm from "./halamanAwal/FormLogin"
import SignUp from "./halamanAwal/SignUp"
import Filtering from "./UserManagement/UM";
import Mstaff from "./Mstaff/Mstaff";
import Mproduk from "./Mproduk/index";
import Categori from "./mCategori/Categoriproduk";
import ListProduct from "./components/Mproduk/ListUnit";
import Units from "./components/Produkunit/mUnit";


function App() {
  return (
    <Router>
      <div className="App wrapper">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/LForm" >
            <LForm />
          </Route>
          <Route exact path="/SignUp" component={SignUp} />
            <LayoutDashboard>
            <Route exact path="/mproduk" component={Mproduk} />
            <Route exact path="/categori" component={Categori}/>
            <Route exact path="/units" component={Units}/>
            <Route exact path="/Listunit" component={ListProduct} />
            </LayoutDashboard>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
