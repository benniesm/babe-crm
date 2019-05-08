import React, { Component } from 'react';
import axios from 'axios';

class Update extends Component {

	constructor() {
		super();
		
		this.state = {
		  fullname: null,
		  level: null,
		  username: null,
		  password: null,
		  email: null,
		  userNewInfo: {}
		}
		this.handleChange = this.handleChange.bind(this);
  }
  
  cancelUpdate = () => {
  	this.setState({
		  fullname: null,
		  level: null,
		  username: null,
		  password: null,
		  email: null
  	});
  }

  updateUser = () => {
    const userInfo = 
    	{
    		id: this.id.value,
    		fullname: this.state.fullname,
    		level: this.state.level,
    		username: this.state.username,
    		password: this.state.password,
    		email: this.state.email
    	}

    if (userInfo.id && userInfo.id.length > 0
    		&& userInfo.fullname && userInfo.fullname.length > 0
    		&& userInfo.level && userInfo.level.length > 0
    		&& userInfo.username && userInfo.username.length > 0
    		&& userInfo.password && userInfo.password.length > 0
    		&& userInfo.email && userInfo.email.length > 0) {
      		axios.put('/api/users', userInfo)
		      .then(res => {
		        if (res.data) {
		          this.props.getUsers();
		          this.setState({
		          	userNewInfo: {
		          		"_id": this.id.value,
		          		"fullname": this.state.fullname,
		          		"level": this.state.level,
		          		"username": this.state.username,
		          		"password": this.state.password,
		          		"email": this.state.email
		          	}
		          });
							this.setState({
								fullname: null,
								level: null,
								username: null,
								password: null,
								email: null
							});
							this.props.confirmEdit(this.state.userNewInfo);
		        }
		      })
		      .catch(err => {
		       //console.log(err)
		      })
    } else {
      //console.log('input field required')
    }
  }

  handleChange = () => {
    this.setState({
      fullname: this.fullname.value,
      level: this.level.value,
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
    });
  }

  render() {

    return (
      <div className="formAll">
        <div className="subtitle"> 
        	<h4 className="text-warning">Edit user information</h4>
        </div>
        <div className="updateClose">
      		<button
      			onClick ={() => {
      				this.props.cancelEdit();
      				this.cancelUpdate();
      			}}
      			className="btn btn-danger">
      			Cancel
      		</button>
        </div>
      	<div>
		      <div>ID</div>
		      <input readOnly
		      	type="text"
		      	name="id"
		      	ref={el => this.id=el}
		      	className="form-control bg-light"
		      	defaultValue={this.props.userInfo._id} />
		      <br/>
		      <div>Full Name</div>
		      <input type="text"
		      	placeholder="Full Name"
		      	onChange={this.handleChange}
		      	name="fullname"
		      	ref={el => this.fullname=el}
		      	className="form-control bg-dark text-white"
		      	defaultValue={this.state.fullname === null ?
		      		(this.props.userInfo.fullname): (this.state.fullname)} />
		      <br/>
		      <div>Access Level</div>
		      <input type="text"
		      	placeholder="Level"
		      	onChange={this.handleChange}
		      	name="level"
		      	ref={el => this.level=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.level === null ?
		      		(this.props.userInfo.level): (this.state.level)} />
		      <br/>
		      <div>Username</div>
		      <input type="text"
		      	placeholder="Username"
		      	onChange={this.handleChange}
		      	name="username"
		      	ref={el => this.username=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.username === null ?
		      		(this.props.userInfo.username): (this.state.username)} />
		      <br/>
		      <div>Password</div>
		      <input type="password"
		      	placeholder="Password"
		      	onChange={this.handleChange}
		      	name="password"
		      	ref={el => this.password=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.password === null ?
		      		(this.props.userInfo.password): (this.state.password)} />
		      <br/>
		      <div>Email</div>
		      <input type="text"
		      	placeholder="Email"
		      	onChange={this.handleChange}
		      	name="email"
		      	ref={el => this.email=el}
		      	className="form-control bg-dark text-white"
		      	defaultValue={this.state.email === null ?
		      		(this.props.userInfo.email): (this.state.email)} />
		      <br/>
		    </div>
        <div className="formButtons">
        	<span className="buttons">
        		<button
        			onClick = {() => {
        				this.updateUser();        				
        			}}
        			className="btn btn-light">
        			Update Record
        		</button>
        	</span>
        </div>
      </div>
    )
  }
}

export default Update
