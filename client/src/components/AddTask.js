// components/tasks/AddTask.js

import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  state = {
    title: "",
    description: "",
    priority:"",
    msg: this.props.msg,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const priority = this.state.priority;

    axios
      .post("http://localhost:5000/api/tasks", { title, description, priority })
      .then(() => {
        this.setState({ title: "", description: "", msg: "Task created!" });
        this.props.updateHandler();
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form
        className="modal-body dark-text flex-column"
        onSubmit={this.handleSubmit}
      >
        <p>
          <label htmlFor="title">Title</label>
        </p>
        <input
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          className="chp-modal center margin-bottom"
          type="text"
        />
        <p>
          <label htmlFor="description">Description</label>
        </p>
        <textarea
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          className="chp-modal center margin-bottom"
        />
        <p>
          <label htmlFor="priority">Priority</label>
        </p>
        <select name="priority" className="custom-select" onChange={this.handleChange}>
          <option value="Select" >Select...</option>
          <option value="high" className="high">
            High
          </option>
          <option value="medium" className="medium">
            Medium
          </option>
          <option value="low" className="low">
            Low
          </option>
        </select>
        <button className="btn" onClick={this.handleSubmit}>
          Submit
        </button>
        {this.state.msg}
      </form>
    );
  }
}

export default AddTask;
