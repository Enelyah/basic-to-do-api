import React, { Component } from "react";
import Task from "./Task";
import axios from "axios";
import AddTask from "./AddTask";

class Todo extends Component {
  state = {
    tasks: [],
    tasksDone: [],
    modalOpened: false,
    msg: "",
  };

  constructor(props) {
    super(props);

    this.updateToDoList = this.updateToDoList.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  componentDidUpdate = () => {
    return this.state.tasks.map((task) => {
      return (
        <Task
          completeTask={() => this.updateToDoList(task._id)}
          title={task.title}
          description={task.description}
          key={task._id}
        />
      );
    });
  };

  getTasks = () => {
    axios
      .get(`http://localhost:5000/api/tasks`)
      .then((response) => {
        const tasks = response.data.filter((task) => task.done === false);
        const tasksDone = response.data.filter((task) => task.done === true);
        this.setState({ tasks: tasks, tasksDone: tasksDone });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateToDoList() {
    this.closeModal();
    this.getTasks();
  }

  modalToggle = () => {
    this.setState({ modalOpened: !this.state.modalOpened });
  };

  closeModal = () => {
    setTimeout(() => {
      this.setState({ modalOpened: false, colTitle: "", msg: "" });
    }, 2000);
  };

  render() {
    const coverClass = this.state.modalOpened
      ? "modal-cover modal-cover-active"
      : "modal-cover";
    const containerClass = this.state.modalOpened
      ? "modal-container modal-container-active"
      : "modal-container";
    return (
      <div className="center">
        <div>
          <img
            className="icon hidden-desktop"
            onClick={this.modalToggle}
            src="../../images/plus_icon_black.png"
            alt=""
          />
          <button
            onClick={this.modalToggle}
            className="hidden-mobile btn margin-bottom"
          >
            Add new task
          </button>
        </div>

        {this.state.tasks.length === 0 ? (
          <h2>All done! Click above to add a new task</h2>
        ) : (
          this.state.tasks.map((task) => {
            return (
              <Task
                completeTask={() => this.updateToDoList(task._id)}
                title={task.title}
                description={task.description}
                id={task._id}
                key={task._id}
                done={task.done}
              />
            );
          })
        )}
        <h2 className="orange">Completed tasks</h2>
        {this.state.tasksDone.length >= 1 ? (
          this.state.tasksDone.map((task) => {
            return (
              <Task
                completeTask={() => this.updateToDoList(task._id)}
                title={task.title}
                description={task.description}
                id={task._id}
                key={task._id}
                done={task.done}
              />
            );
          })
        ) : (
          <p>You've done nothing yet - Work harder!</p>
        )}
        {/* modal */}

        <div className={containerClass}>
          <div className="modal-header dark-text">
            <p className="modal-title center">Add task</p>
            <hr />
          </div>
          <AddTask
            updateHandler={() => this.updateToDoList()}
            msg={this.state.msg}
          />
        </div>
        <div className={coverClass} onClick={this.modalToggle}></div>
      </div>
    );
  }
}

export default Todo;
