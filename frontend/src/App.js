import './App.css';
import {Content} from "./Content/Content";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AdminPage} from "./SimpleForm/adminPage";
import {Dashboard} from "./Dashboard/dashboard";
import {AdminStatsPage} from "./SimpleForm/adminStatsPage";
import {DailyNews} from "./Dashboard/dailyNews";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/crm/:id">
                    <Content/>
                </Route>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/admin/stats" component={AdminStatsPage}/>
                <Route path="/admin" component={AdminPage}/>
                <Route path="/content" component={DailyNews}/>

            </Switch>
        </Router>
    );
}

export default App;
