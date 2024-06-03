console.log("This is the first file in front end application!!!")
import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; //sets store as top level component of react application

import ApplicationComponent from "./app/appComponent";
import store from "./state/store";
import 'bootstrap-icons/font/bootstrap-icons.css';

//creating root of the react application where we can load the react app
const root = ReactDOM.createRoot(document.getElementById("root"));

//bootstrapping react application in root element of index.html
root.render( 
    <Provider store={store}>
        <ApplicationComponent/>
    </Provider>
)