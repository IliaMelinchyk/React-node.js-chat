import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import JoinPage from "./containers/JoinPage/JoinPage";
import ChatPage from "./containers/ChatPage/ChatPage";

const App = () => (
  <Router>
    <Route path="/" exact component={JoinPage} />
    <Route path="/chat" exact component={ChatPage} />
  </Router>
);

export default App;
