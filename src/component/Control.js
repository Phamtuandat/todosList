import React, { Component } from "react";
import {connect} from "react-redux";
import * as actions from "./../actions/index"


class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  onSearch = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSort = (sortby, status) => {
    var sort = {
      sortby,
      status
    }
    this.props.onSort(sort);
  };
  handleSearch = () => {
    this.props.onSearch({
      name: this.state.keyword,
      status: -1,
    });
  };

  render() {
    var sort = this.props.sortTask;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.props.handleOnClick}
        >
          <span className="fa fa-plus mr-5" />
          Thêm Công Việc
        </button>

        <div className="row mt-15">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa..."
                name="keyword"
                value={this.state.keyword}
                onChange={this.onSearch}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.handleSearch}
                >
                  <span className="fa fa-search mr-5" />
                  Tìm
                </button>
              </span>
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li
                  name="name"
                  value={-1}
                  onClick={() => this.onSort("name", -1)}
                  className={
                    sort.sortby === "name" && sort.status === -1
                      ? "selected"
                      : ""
                  }
                >
                  <a role="button" href="# ">
                    <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                  </a>
                </li>
                <li
                  name="name"
                  value={1}
                  onClick={() => this.onSort("name", 1)}
                  className={
                    sort.sortby === "name" && sort.status === 1
                      ? "selected"
                      : ""
                  }
                >
                  <a role="button" href="# ">
                    <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
                  </a>
                </li>
                <li role="separator" className="divider" />
                <li
                  name="status"
                  value={-1}
                  onClick={() => this.onSort("status", -1)}
                  className={
                    sort.sortby === "status" && sort.status === -1
                      ? "selected"
                      : ""
                  }
                >
                  <a role="button" href="# ">
                    Trạng Thái Kích Hoạt
                  </a>
                </li>
                <li
                  name="status"
                  value={1}
                  onClick={() => this.onSort("status", 1)}
                  className={
                    sort.sortby === "status" && sort.status === 1
                      ? "selected"
                      : ""
                  }
                >
                  <a role="button" href="# ">
                    Trạng Thái Ẩn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filterTask: state.filterTask,
    sortTask: state.sortTask
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (filter) => {
      dispatch(actions.filterTask(filter))
    },
    onSort: (sort) => {
      dispatch(actions.sortTask(sort))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps ) (Control);
