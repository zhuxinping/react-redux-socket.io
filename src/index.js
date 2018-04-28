import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Switch,Redirect,BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './container/App';
import {Provider} from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import Login from './container/login/Login';
import Register from './container/register/Register';
import AuthRoute from "./component/authroute/AuthRoute";
import BossInfo from "./container/bossinfo/BossInfo";
import GeniusInfo from "./container/geniusinfo/GeniusInfo";
import DashBoard from "./component/dashboard/DashBoard";
import Chat from "./component/chat/Chat";
//boss genius me msg 4个页面
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                  <AuthRoute></AuthRoute>
                 <Switch>
                     <Route path="/bossinfo" exact={true} component={BossInfo}></Route>
                     <Route path="/geniusinfo" exact={true} component={GeniusInfo}></Route>
                     <Route path="/login" exact={true} component={Login}></Route>
                     <Route path="/register" exact={true} component={Register}></Route>
                     <Route path="/chat/:user" exact={true} component={Chat}></Route>
                     <Route component={DashBoard}></Route>
                 </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
