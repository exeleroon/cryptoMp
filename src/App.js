import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import OrderList from "./pages/OrderList";
import './App.scss';


export default class App extends Component {


    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exect path={'/'} component={OrderList}/>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }


}

