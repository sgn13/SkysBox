import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";

class delete1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   const { id } = this.props.match.params
  //   console.log(id);
  //   axios.delete(`/api/auth/${id}`)
  // .then(res => {
  //   console.log(res);
  //   this.setState({answers:res.data.answer});

  // }
  // )
  // }
  handleClick(event) {
    const { id } = this.props.match.params;
    console.log(id);
    axios.delete(`/api/auth/${id}`).then(console.log("Deleted"));
    if (window.confirm(`User with id ${id} has been deleted`)) {
      window.location.reload();
      window.location.href = "/admin";
    }
  }
  handleSubmit(event) {
    window.location.href = "/admin";
  }
  //    handleDelete(){
  //        console.log("clicked")
  //     {
  //     axios.delete(`/api/auth/${this.props.params.match.id}`)
  //     .then(res => {
  //     console.log(res.data);
  //     }
  //     )}
  // }

  render() {
    return (
      <div class="Container">
        <h1>Are you Sure?</h1>
        <button onClick={this.handleClick}>Yes</button>
        <div class="button">
          <br />
          <button onClick={this.handleSubmit}>No</button>
        </div>
      </div>
    );
  }
}

export default delete1;
