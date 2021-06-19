import React, { Component } from "react";
import "./App.css";
import TaskForm from "./component/TaskForm";
import Control from "./component/Control";
import TaksList from "./component/TaksList";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  openEditTask = () => {
    this.props.openForm();
  };

  handleAddClick() {
    this.props.toggleForm();
  }

  render() {
    var { isDisplayForm } = this.props;

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <TaskForm />
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <Control handleOnClick={this.handleAddClick} />
            <div className="row mt-15">
              <TaksList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    toggleForm: () => {
      dispatch(actions.togglesForm());
    },
    openForm: () => {
      dispatch(actions.openForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
