import React, { Component } from "react";
import {connect} from "react-redux";
import * as actions from './../actions/index';

class TaksItem extends Component {

  toggleStatus = () => {
    this.props.toggleStatus(this.props.task);
  }
  onRemoveTask = () => {
    this.props.removeTask(this.props.task);
  }
  onEditTask = () => {
    this.props.updateTask(this.props.task)
    this.props.openForm()
  }
  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            onClick={this.toggleStatus}
            className={
              task.status ? "label label-success" : "label label-danger"
            }
          >
            {task.status ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onEditTask}>
            <span className="fa fa-pencil mr-5" />
            Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onRemoveTask} >
            <span className="fa fa-trash mr-5" />
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDisplayForm : state.isDisplayForm,
    editTask: state.editTask,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    openForm : () =>{
      dispatch(actions.openForm())
    },
    updateTask: (task) =>{
      dispatch(actions.updateTask(task))
    },
    removeTask: (task) =>{
      dispatch(actions.removeTask(task))
    }, 
    toggleStatus: (task) =>{
      dispatch(actions.toggleStatus(task))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps)(TaksItem);
