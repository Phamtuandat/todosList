import React, { Component } from "react";
import "./App.css";
import TaskForm from './component/TaskForm'
import Control from './component/Control'
import TaksList from './component/TaksList'
import Randomstring from 'randomstring';

class App extends Component {

  

  constructor(props) {
    super(props)
    this.state={
      tasks : [],
      isDisplay: false
    }
    this.handleAddClick = this.handleAddClick.bind(this)
  };
  componentDidMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }
  onGenerate = () =>{

    var tasks = [
      {
        name: 'Trực ban tác chiến',
        status: false,
        id: Randomstring.generate(),
      },
      {
        name: 'Học lập trình',
        status: true,
        id: Randomstring.generate(),
      },
      {
        name: 'Đi ăn cơm',
        status: false,
        id: Randomstring.generate(),
      },
    ];
  this.setState({
    tasks: tasks
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  handleAddClick(){
    this.setState({
      isDisplay: !this.state.isDisplay
    })
  }
  render() {
    var {isDisplay} = this.state;
    var elementTaskForm = isDisplay ? <TaskForm handleOnClick={this.handleAddClick}/> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {elementTaskForm}
          </div>
          <div className={isDisplay ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <Control handleGenaral={this.onGenerate } handleOnClick={this.handleAddClick}/>
            <div className="row mt-15">
              <TaksList tasks={this.state.tasks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
