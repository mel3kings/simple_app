import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Dashboard} from "./Dashboard/dashboard";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Dashboard}/>
            </Switch>
        </Router>
    );
}

export default App;
