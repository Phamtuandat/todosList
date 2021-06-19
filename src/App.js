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
    this.state = {
      filter: {
        name: "",
        status: -1,
        keyword: "",
      },
      sort: {
        sortby: "name",
        status: -1,
      },
    };
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  openEditTask = () => {
    this.props.openForm();
  };

  handleAddClick() {
    this.props.toggleForm();
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.searchIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  searchIndex = (id) => {
    var results = -1;
    var { tasks } = this.state;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        results = index;
      }
    });
    return results;
  };
  onRemoveTask = (id) => {
    var { tasks } = this.state;
    var index = this.searchIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onEditTask = (id) => {
    var { tasks } = this.state;
    var index = this.searchIndex(id);
    if (index !== -1) {
      this.setState({
        taskEditing: tasks[index],
      });
    }
    this.openEditTask();
  };
  onFilter = (filterName, filterStatus) => {
    filterStatus = +filterStatus;
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };
  handleSearch = (keyword) => {
    this.setState({
      filter: {
        keyword: keyword.toLowerCase(),
      },
    });
    console.log(keyword);
  };
  onSort = (sortby, status) => {
    this.setState({
      sort: {
        sortby: sortby,
        status: status,
      },
    });
  };

  render() {
    var { isDisplayForm } = this.props;
    var { sort } = this.state;
    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return tasks;
    //     }else {
    //       return task.status === (filter.status === 1 ? true : false)
    //     }

    //   });
    //   if (filter.keyword) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.keyword) !== -1;
    //     });
    //   }
    // };
    // if(sort.sortby==='name'){
    //   tasks.sort((a,b) =>{
    //     if(a.name>b.name) return sort.status;
    //     else if(a.name<b.name) return -sort.status;
    //     else return 0;
    //   })
    // }else{
    //   tasks.sort((a,b) =>{
    //     if(a.status>b.status) return sort.status;
    //     else if(a.status<b.status) return -sort.status;
    //     else return 0;
    //   })
    // }

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
            <Control
              handleOnClick={this.handleAddClick}
              handleSearch={this.handleSearch}
              onSort={this.onSort}
              sortSettings={sort}
            />
            <div className="row mt-15">
              <TaksList
                onUpdateStatus={this.onUpdateStatus}
                onRemoveTask={this.onRemoveTask}
                onEditTask={this.onEditTask}
                onfilter={this.onFilter}
              />
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
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
