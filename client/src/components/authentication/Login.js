import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class Login extends Component {

	constructor() {
		super();
		this.state = {
		  customer_id: "",
		  user_id: "",
		  category: "",
		  details: "",
		  timestamp: "",
		  redirect: false,
		  username: "",
		  password: ""
		};
		this.handleChange = this.handleChange.bind(this);
  }

  login = () => {
    const loginInfo = 
    	{
    		username: this.state.username,
    		password: this.state.password
    	}
		const cookies = new Cookies();
		
    if (loginInfo.username && loginInfo.username.length > 0
    		&& loginInfo.password && loginInfo.password.length > 0) {
    			if (cookies.get('loginData')) {
    				cookies.remove('loginData');
    				//console.log("Removed Old");
    			}
				  axios.post('/api/authenticate', loginInfo)
				    .then(res => {
				      if (res.data.stat === 202) {
				        cookies.set('loginData', res.data, { path: '/' });
				        //console.log(res.data.stat);
				        this.setState({redirect: true});
				      } else {
				      	//console.log(res.data.stat);
				      	window.alert("Login not successful");
				      }
				    })
				    .catch(err => {
				    	//console.log(err)
				    });

    } else {
      //console.log('input field required');
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
      
  render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to='/'/>;
		}
    const style = {
    	fontSize: 15,
    	fontWeight: 'bold',
    	paddingBottom: 15,
    }
     
    return (
      <div className="formLogin">      	
      	<div>
      		<div style={style}>Login to babe CRM</div>
		      <input type="text"
		      	placeholder="Username"
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
		    </div>
        <div className="formButtons">
        	<span className="buttons">
        		<button onClick={this.login} className="btn btn-light">
        			Login
        		</button>
        	</span>
        </div>
      </div>
    )
  }
}

export default Login
