import React, { useState } from "react";
import Sidebar from ".././components/admin/common/sidebar_components/sidebar";
import RightSidebar from ".././components/admin/common/right-sidebar";
import Footer from ".././components/admin/common/footer";
import Header from ".././components/admin/common/header_components/header";

import { Store } from "redux"

import { ApplicationState } from '.././redux/store';
import { Provider } from 'react-redux';

interface MainProps {
    store: Store<ApplicationState>;
}

const App: React.FC<MainProps> = ({ store }) => {

    const initialState = {
        ltr: true,
        divName: "RTL",
    };

    const [side, setSide] = useState(initialState);

    // const ChangeRtl = (divName) => {
    //   if (divName === "RTL") {
    //     document.body.classList.add("rtl");
    //     setSide({ divName: "LTR" });
    //   } else {
    //     document.body.classList.remove("rtl");
    //     setSide({ divName: "RTL" });
    //   }
    // };
    return (
        <Provider store={store}>
            <div>
                <div className="page-wrapper">
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar />
                        <RightSidebar />
                        {/* <div className="page-body">{props.children}</div> */}
                        <Footer />
                    </div>
                </div>
                <div
                    className="btn-light custom-theme"
                // onClick={() => ChangeRtl(side.divName)}
                >
                    {side.divName}
                </div>
            </div>
        </Provider >
    );
};
export default App;



// import React from 'react';
// import './App.css';

// import { Store } from "redux"

// import { ApplicationState } from './redux/store';
// import { Provider } from 'react-redux';

// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

// //import components

// interface MainProps {
//   store: Store<ApplicationState>;
// }

// const App: React.FC<MainProps> = ({ store }) => {
//   return (
//     <Router>

//       <Provider store={store}>
//         <Switch>
//           <Route path="/" exact render={() => (<Main />)} />
//           <Route path="/category-list" exact render={() => (<CategoryList />)} />
//           <Route path="/add-category" exact render={() => (<AddCategory />)} />
//           <Route path="/edit-category" exact render={() => (<EditCategory />)} />
//         </Switch>
//       </Provider>
//     </Router>
//   );
// }

// export default App;
