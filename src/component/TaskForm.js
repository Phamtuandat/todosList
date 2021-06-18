import React, { Component } from "react";
import {connect} from "react-redux";
import * as actions from './../actions/index';


class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: false,
      id: "",
    };
  }
  
  componentDidMount() {
    if (this.props.editTask) {
      var { editTask } = this.props;
      this.setState({
        name: editTask.name,
        status: editTask.status,
        id: editTask.id,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.editTask) {
      if(props.editTask.id !== state.id){
        return {
          id: props.editTask.id,
          name: props.editTask.name,
          status: props.editTask.status
        }
      }
    }else{
      if(state.id){
        return {
          id: '',
          name: '',
          status: true
        }
      }
    }
    return null
  }
  handleOnchange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (target.name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveTask(this.state);
    this.cancelForm();

  };
  cancelForm = () => {
    this.setState({
      name: "",
      value: false,
      id: "",
    });
  };

  render() {
    if(!this.props.isDisplayForm) return '';
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.props.editTask ? "Cập nhật công việc" : "Thêm công việc"}
          </h3>
          <span onClick={this.closeForm}>x</span>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit} name="taskForm">
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.handleOnchange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              name="status"
              value={this.state.status}
              onChange={this.handleOnchange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning"
                onClick={this.allowSubmit}
              >
                {this.props.editTask !== "" ? "Lưu lại" : "Thêm"}
              </button>
              &nbsp;
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.cancelForm}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDisplayForm : state.isDisplayForm,
    editTask: state.editTask
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveTask: (task) => {
      dispatch(actions.saveTask(task))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (TaskForm);
