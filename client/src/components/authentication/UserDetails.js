import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class UserDetails extends Component {

	constructor() {
		super();
		this.state = {
			redirect: false,
			to: null,
			user_id: null
		}
  }
  
  componentWillMount = () => {
  	const cookies = new Cookies();
  	if (cookies.get('loginData')) {
					const loginCookie = JSON.stringify({
							"id": cookies.get('loginData').id,
							"user_id": cookies.get('loginData').user_id,
							"timestamp": cookies.get('loginData').timestamp,
							"page": "profile"
						});
					axios.get(`/api/login/${loginCookie}`)
						.then(res => {
						  if (res.data.stat === 202) {
								this.setState({
									actions: res.data.actions,
									"user_id": cookies.get('loginData').user_id,
								});
								//console.log("Welcome user!");
								//console.log(res.data.actions);
						  } else if (res.data.stat === 406) {
						  	//console.log("Expired Cookie!");
						  	this.setState({redirect: true, to: "/authentication/login"});
						  } else if (res.data.stat === 403) {
						  	//console.log("Restricted Access!");
						  	this.setState({redirect: true, to: "/"});
						  } else {
						  	//console.log(res.data);
						  	this.setState({redirect: true, to: "/authentication/login"});
						  }
						})
						.catch(err => {
							this.setState({redirect: true, to: "/authentication/login"});
							//console.log(err);
						});
  	} else {
  		this.setState({redirect: true, to: "/authentication/login"});
  		//console.log("Login now");
  	}
  }
  
	logout = () => {
		const cookies = new Cookies();
		if (cookies.get('loginData')) {
			const loginData = cookies.get('loginData');
			const loginId = loginData.user_id;
			axios.delete(`/api/login/${loginId}`)
		    .then(res => {
		      if (res.data) {          
						cookies.remove('loginData', {path: '/'});
		        //console.log("Goodbye user!");
						this.setState({redirect: true, to: "/"});
		      }
		    })
		    .catch(err => {
		    	//console.log(err)
		    });
		} else {
			//console.log("No valid login credentials");
		}
	}	
      
  render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to={this.state.to} />;
		} 
    const style = {
    	fontSize: 15,
    	fontWeight: 'bold',
    	paddingBottom: 15,
    }
    		    
    return (
      <div className="formLogin">
		    <div style={style}>
		    	User ID: {this.state.user_id}
		    </div>
		    <div>
					<button className="btn btn-danger" onClick={this.logout}>Log out</button>
		    </div>
      </div>
    )
  }
}

export default UserDetails
