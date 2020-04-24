// components/tasks/AddTask.js

import React, { Component } from 'react';
import axios from 'axios';

class AddTask extends Component {
state = { 
    title: "", 
    description: "",
    msg: this.props.msg
}
   
  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;

    axios.post("http://localhost:5000/api/tasks", { title, description})
    .then( () => {
        this.setState({title: "", description: "", msg:"Task created!"});
        this.props.updateHandler();
    })
    .catch( error => console.log(error) )
  }


  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <form className="modal-body dark-text flex-column" onSubmit={this.handleSubmit}>
        <p><label htmlFor="title">Title</label></p>
        <input
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          className="chp-modal center custom-select margin-bottom"
          type="text"
        />
         <p><label htmlFor="description">Description</label></p>
        <textarea
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          className="chp-modal center custom-select margin-bottom"
        />
        <button className="btn" onClick={this.handleSubmit}>Submit</button>
        {this.state.msg}
      </form>
    )
  }
}

export default AddTask;