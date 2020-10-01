import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import LeaderboardComponent from "./components/Leaderboard/LeaderboardComponent";
import NavBarComponent from "./components/Nav/NavBarComponent";
import DashboardComponent from "./components/Dashboard/DashboardComponent";
import AddQuestionComponent from "./components/AddQuestion/AddQuestionComponent";
import LoginComponent from "./components/Login/LoginComponent";
import NotFoundComponent from "./components/NotFound/NotFoundComponent";
import AddAnswerComponent from "./components/AddAnswer/AddAnswerComponent";
import ViewResultComponent from "./components/ViewResult/ViewResultComponent";

//Utils
import AuthRoute from "./HOC/AuthRoute";

import LoadingBar from "react-redux-loading";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const { loading } = props;
  return (
    <div className="App">
      <LoadingBar />
      <NavBarComponent />
      {loading === true ? null : (
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <AuthRoute exact path="/dashboard" component={DashboardComponent} />
          <AuthRoute exact path="/answer/:question_id" component={AddAnswerComponent} />
          <AuthRoute exact path="/leaderboard" component={LeaderboardComponent} />
          <AuthRoute exact path="/create" component={AddQuestionComponent} />
          <AuthRoute
            exact
            path="/results/:question_id"
            component={ViewResultComponent}
          />
          <AuthRoute component={NotFoundComponent} />
        </Switch>
      )}
    </div>
  );
};

export default App;
