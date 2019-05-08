import React, { Component } from 'react';
import axios from 'axios';

import Create from './Create.js';
import Index from './Index.js';
import Update from './Update.js';
import View from './View.js';

class Users extends Component {
	constructor () {
		super();
		this.state = {
		  users: [],
		  userInfo: [],
		  createClass: "divHide",
		  formTitle: "divHide",
		  listClass: "divShow",
		  newClass: "divShow",
		  updateClass: "divHide",
		  viewClass: "divHide",
		}
  }

  componentDidMount(){
    this.getUsers();
  }
  
  closeView = () => {
    this.setState({
    	listClass: "divShow",
    	newClass: "divShow",
    	viewClass: "divHide"
    });
  }

  confirmEdit = (userInfoEdited) => {
  	this.setState({
    	userInfo: userInfoEdited,
    	updateClass: "divHide",
    	viewClass: "divShow"
  	});
  }

  deleteUser = (id) => {
    const check = {act: "delete", rights: this.props.location.state.rights};
    axios.post('/api/crud', check)
      .then(res => {
        if (res.data.stat === 202) {
					axios.delete(`/api/users/${id}`)
						.then(res => {
							if (res.data) {
								this.getUsers();
								this.setState({
									listClass: "divShow",
									newClass: "divShow",
									viewClass: "divHide"
								});
							}
						})
						.catch(err => {
							//console.log(err)
						});
        } else {
        	window.alert("Unauthorized action!");
        }
      })
      .catch(err => {
      	//console.log(err)
      });   
  }

  getUsers = () => {
    axios.get('/api/users')
      .then(res => {
        if (res.data) {
          this.setState({
            users: res.data
          })
        }
      })
      .catch(err => {
      	//console.log(err)
      })
  }
  
  hideCreate = () => {  	
  	this.setState({
  		newClass: "divShow",
  		createClass: "divHide",
  		formTitle: "divHide"
  	});
  }

  hideEdit = () => {
  	this.setState({  		
    	updateClass: "divHide",
    	viewClass: "divShow"
  	});
  }

  showCreate = () => {
    const check = {act: "create", rights: this.props.location.state.rights};
    axios.post('/api/crud', check)
      .then(res => {
        if (res.data.stat === 202) {
					this.setState({
						newClass: "divHide",
						createClass: "divShow",
						formTitle: "divShow"
					});
        } else {
        	window.alert("Unauthorized action!");
        }
      })
      .catch(err => {
      	//console.log(err)
      });
  }

  showEdit = () => {
    const check = {act: "update", rights: this.props.location.state.rights};
    axios.post('/api/crud', check)
      .then(res => {
        if (res.data.stat === 202) {
					this.setState({
						listClass: "divHide",
						newClass: "divHide",
						viewClass: "divHide",
						updateClass: "divShow"
					});
        } else {
        	window.alert("Unauthorized action!");
        }
      })
      .catch(err => {
      	//console.log(err)
      });
  }
  
  viewUser = (user) => {
    this.setState({
    	userInfo: user,
    	listClass: "divHide",
    	newClass: "divHide",
    	viewClass: "divShow"
    });
  }

  render() {
    
    let { users } = this.state;

    return(
      <div>
        <h1 className="pageTitle">User Accounts</h1>
        <div className={this.state.newClass}>
		      <div className="buttons">
				    <button onClick={this.showCreate} className="btn btn-warning">
				    	Create new user
				    </button>
		      </div>
        </div>
        <div className={this.state.formTitle}>
        	<h4 className="text-warning">Create a new user</h4>
        </div>
        <div className={this.state.createClass}>
        	<Create getUsers={this.getUsers} cancelCreate={this.hideCreate} />
        </div>
        <div className={this.state.listClass}>
          <Index
            users={users}
            deleteUser={this.deleteUser}
            viewUser={this.viewUser} />
        </div>
        <div className={this.state.viewClass}>
        	<View
            deleteUser={this.deleteUser}
        		closeView={this.closeView}
            showEdit={this.showEdit}
        		userInfo={this.state.userInfo} />
        </div>
        <div className={this.state.updateClass}>
        	<Update
            getUsers={this.getUsers}
        		userInfo={this.state.userInfo}
            cancelEdit={this.hideEdit}
            confirmEdit={this.confirmEdit} />
        </div>
      </div>
    )
  }
}

export default Users;
