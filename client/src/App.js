import React, { Component } from "react";
import Nav from "./components/header/nav";
import "./Nav.css";
import { BrowserRouter, Route } from "react-router-dom";
import Help from "./components/help";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/templates/board";
import Body from "./components/header/body";
import { Provider } from "react-redux";
import store from "./components/flux/store";
import { loadUser } from "./components/flux/action/authAction";
import FilterImage from "./components/filter/filter_image";
import ReactUploadImage from "./components/canva/UploadImage";
import ImageContainer from "./components/canva/SavedImage";
import admin from "./components/controller/admin";
import deleteImg from "./components/controller/deletephoto";
import delete1 from "./components/controller/delete";
import RouterGuard from "./reactGuard";
import Access from "./components/access";

class App extends Component {
  state = {
    auth: false,
  };
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
          <Route path="/gallery" component={ImageContainer} />
          <Route path="/help" component={Help} />
          <Route path="/filter/:id" component={FilterImage} />
          <Route path="/filter" exact component={FilterImage} />

          <Route path="/board" component={Board} />
          <Route path="/design" component={Body} />
          {/* <Route path='/banner' component={BannerCanva} /> */}
          <Route path="/" exact component={Home} />
          <Route path="/uploadImg" component={ReactUploadImage} />
          <Route path="/savedImg" component={ImageContainer} />
          <Route path="/admin" component={admin} />
          <Route path="/delete/:id" component={delete1} />
          <Route path="/deleteImg/:id" component={deleteImg} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
