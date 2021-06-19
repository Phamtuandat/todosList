import React, { Component } from "react";
import TaksItem from "./TaksItem";
import {connect} from "react-redux";
import * as actions from "./../actions/index"

class TaksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    }
  }
  onChange=(e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    
    this.setState({
      [name]: value
    })
    this.props.onfilter(
      {
      name:  name === 'filterName' ? value : this.state.filterName,
      status:  name === 'filterStatus' ? value : this.state.filterStatus
    }
    )
  }
  render() {
    var { tasks, filterTask, sort } = this.props;
    if(filterTask){
      if(filterTask.name){
        tasks = tasks.filter((task) =>{
          return task.name.toLowerCase().indexOf(filterTask.name.toLowerCase()) !== -1;
        })
      }
      tasks = tasks.filter((task) =>{
        if(filterTask.status === -1){
          return tasks;
        }else{
          return task.status === (filterTask.status === 1 ? true : false)
        }
      })
    }
     //sắp xếp task theo tên và status
    
     if(sort.sortby==='name'){
      tasks.sort((a,b) =>{
        if(a.name>b.name) return sort.status;
        else if(a.name<b.name) return -sort.status;
        else return 0;
      })
    }else{
      tasks.sort((a,b) =>{
        if(a.status>b.status) return sort.status;
        else if(a.status<b.status) return -sort.status;
        else return 0;
      })
    }
    var element = tasks.map((task, index) => {
      return (
        <TaksItem
          task={task}
          key={task.id}
          index={index}
        />
      );
    });

   
    

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>
                <input 
                  type="text" 
                  className="form-control" 
                  name='filterName'
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select 
                  className="form-control"
                  name='filterStatus'
                  onChange={this.onChange}
                  
                >
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td />
            </tr>
            {element}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks : state.tasks,
    filterTask: state.filterTask,
    sort: state.sortTask
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    onfilter: (filter) => {
      dispatch(actions.filterTask(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaksList);
