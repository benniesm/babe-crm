import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {

	constructor () {
		super();
		this.state = {
		  fullname: "",
		  level: "",
		  username: "",
		  password: "",
		  email: ""
		};
		this.handleChange = this.handleChange.bind(this);
  }

  addUser = () => {
    const userInfo = 
    	{
    		fullname: this.state.fullname,
    		level: this.state.level,
    		username: this.state.username,
    		password: this.state.password,
    		email: this.state.email
    	}

    if (userInfo.fullname && userInfo.fullname.length > 0
    		&& userInfo.level && userInfo.level.length > 0
    		&& userInfo.username && userInfo.username.length > 0
    		&& userInfo.password && userInfo.password.length > 0
    		&& userInfo.email && userInfo.email.length > 0) {
      axios.post('/api/users', userInfo)
        .then(res => {
          if (res.data) {
            this.props.getUsers();
            this.setState({
    					fullname: "",
            	level: "",
    					username: "",
    					password: "",
            	email: ""
            });
            this.props.cancelCreate();
          }
        })
        .catch(err => {
        	//console.log(err)
        })
    } else {
      //console.log('input field required')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
      
  render() {

    return (
      <div className="formAll">
        <div className="createClose">
      		<button onClick={this.props.cancelCreate} className="btn btn-danger">
      			Cancel
      		</button>
        </div>
      	<div>
		      <input type="text"
		      	placeholder="Full Name"
		      	onChange={this.handleChange}
		      	name="fullname"
		      	className="form-control bg-dark text-white"
		      	value={this.state.fullname} /><br/>
		      <input type="text"
		      	placeholder="Level: 1 - 5 (numbers only)"
		      	onChange={this.handleChange}
		      	name="level"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.level} /><br/>
		      <input type="text"
		      	placeholder="User Name"
		      	onChange={this.handleChange}
		      	name="username"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.username} /><br/>
		      <input type="password"
		      	placeholder="Password"
		      	onChange={this.handleChange}
		      	name="password"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.password} /><br/>
		      <input type="text"
		      	placeholder="Email"
		      	onChange={this.handleChange}
		      	name="email"
		      	className="form-control bg-dark text-white"
		      	value={this.state.email} /><br/>
		    </div>
        <div className="formButtons">
        	<span className="buttons">
        		<button onClick={this.addUser} className="btn btn-light">
        			Create Record
        		</button>
        	</span>
        </div>
      </div>
    )
  }
}

export default Create
