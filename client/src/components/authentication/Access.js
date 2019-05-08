import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

class Access extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loginData: {},
			actions: [],
			redirect: false,
			to: null,
			user: null
		}
  }
  
  componentWillMount = () => {
  	//console.log(this.props.match.params.id);
		const cookies = new Cookies();
			if (cookies.get('loginData')) {
					const loginCookie = JSON.stringify({
							"id": cookies.get('loginData').id,
							"user_id": cookies.get('loginData').user_id,
							"timestamp": cookies.get('loginData').timestamp,
							"page": this.props.match.params.id
						});
					axios.get(`/api/login/${loginCookie}`)
						.then(res => {
						  if (res.data.stat === 202) {
								//console.log("Welcome user!");
								//console.log(res.data.actions);
						  	this.setState({
						  		user: cookies.get('loginData').user_id,
						  		actions: res.data.actions,
						  		redirect: true,
						  		to: "/" + this.props.match.params.id
						  	});
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
				//console.log("Login to continue!");
				this.setState({redirect: true, to: "/authentication/login"});
			}
  }
      
  render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to={{
              pathname: this.state.to,
              state: { rights: this.state.actions, user: this.state.user }
            }} />
		}
     
    return (
      <div>				
      </div>
    )
  }
}

export default Access
