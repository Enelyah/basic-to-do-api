import React, { Component } from "react";
import axios from "axios";

class Task extends Component {
  state = {
    done: this.props.done,
    strikethrough: this.props.done,
  };

  taskDone = () => {
    const done = !this.state.done;
    axios
      .put(`http://localhost:5000/api/tasks/${this.props.id}`, { done })
      .then(() => {
        this.updateTodoStatus();
        this.props.completeTask();
      })
      .catch((err) => console.log(err));
  };

  updateTodoStatus = (task) => {
    this.setState({
      done: !this.state.done,
      strikethrough: !this.state.strikethrough,
    });
  };

  render() {
    const strikeClass = this.state.strikethrough ? "strike" : "nostrike";
    const priorityClass = this.props.priority;

    return (
      <div key={this.props.id}>
        <div className="flex">
          <input
            className="checkbox"
            type="checkbox"
            checked={this.state.done}
            onChange={this.taskDone.bind(this)}
          />
          <h3 className={`title ` + strikeClass + " " + priorityClass}>{this.props.title}</h3>
        </div>
        <div className="task flex-v">
          <h4 className={`description ` + strikeClass}>
            {this.props.description}
          </h4>
          <hr />
        </div>
      </div>
    );
  }
}

export default Task;
