import React from "react";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignPage from "./pages/sign/sign.component";

import Header from "./components/header/header.component";

import "./App.css";
import { Switch, Route } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentUser:null
    }
  }
  unsubscribeFromAuth=null
  componentDidMount(){
    this.unsubscribeFromAuth=auth.onAuthStateChanged(user=>{
      this.setState({currentUser:user});
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/shop">
            <ShopPage />
          </Route>
          <Route exact path="/signin">
            <SignPage />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
