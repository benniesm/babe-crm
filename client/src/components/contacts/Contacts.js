import React, { Component } from 'react';
import axios from 'axios';

import Create from './Create.js';
import Index from './Index.js';
import Update from './Update.js';
import View from './View.js';

class Contacts extends Component {
	constructor() {
		super();
		this.state = {
		  contacts: [],
		  contactInfo: [],
		  customer: "",
		  customers: [],
		  user: "",
		  createClass: "divHide",
		  formTitle: "divHide",
		  listClass: "divShow",
		  newClass: "divShow",
		  updateClass: "divHide",
		  viewClass: "divHide",
		}
  }

  componentDidMount = () => {
    this.getContacts();
  }
  
  closeView = () => {
    this.setState({
    	listClass: "divShow",
    	newClass: "divShow",
    	viewClass: "divHide"
    });
  }

  confirmEdit = (contactInfoEdited) => {
  	this.setState({
    	contactInfo: contactInfoEdited,
    	updateClass: "divHide",
    	viewClass: "divShow"
  	});
  }

  deleteContact = (id) => {
    const check = {act: "delete", rights: this.props.location.state.rights};
    axios.post('/api/crud', check)
      .then(res => {
        if (res.data.stat === 202) {
					axios.delete(`/api/contacts/${id}`)
						.then(res => {
							if (res.data) {
								this.getContacts();
								this.setState({
									listClass: "divShow",
									newClass: "divShow",
									viewClass: "divHide"
								});
							} else {console.log('aaa')}
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

  getContacts = () => {
    axios.get('/api/contacts')
      .then(res => {
        if (res.data) {
          this.setState({
            contacts: res.data
          })
        }
      })
      .catch(err => {
      //console.log(err)
      })
  }

  getCustomers = () => {
    axios.get('/api/customers')
      .then(res => {
        if (res.data) {
          this.setState({
            customers: res.data
          });
          //console.log(this.state.customers);
        }
      })
      .catch(err => {
      //console.log(err)
      })
  }

  getOneCustomer = (id) => {
    axios.get(`/api/customers/${id}`)
      .then(res => {
        if (res.data) {
          this.setState({
            customer: res.data.fullname
          });
        }
      })
      .catch(err => {
      //console.log(err)
      })
  }

  getOneUser = (id) => {
    axios.get(`/api/users/${id}`)
      .then(res => {
        if (res.data) {
          this.setState({
            user: res.data.username
          });
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
  
  viewContact = (contact) => {
    this.getOneCustomer(contact.customer_id);
    this.getOneUser(contact.user_id);
    this.setState({
    	contactInfo: contact,
    	createClass: "divHide",
    	listClass: "divHide",
    	newClass: "divHide",
    	viewClass: "divShow"
    });
  }

  showCreate = () => {
    const check = {act: "create", rights: this.props.location.state.rights};
    axios.post('/api/crud', check)
      .then(res => {
        if (res.data.stat === 202) {
					this.getCustomers();
					this.setState({
						newClass: "divHide",
						createClass: "divShow",
						formTitle: "divShow"
					});
        } else {
        	window.alert("Unauthorized action!");
        }
      })
      .catch(err => console.log(err));  	
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

  render() {
		
    let { contacts } = this.state;

    return(
      <div>
        <h1 className="pageTitle">Contact Logs</h1>
        <div className={this.state.newClass}>
		      <div className="buttons">
				    <button onClick={this.showCreate} className="btn btn-warning">
				    	Create new contact
				    </button>
		      </div>
        </div>
        <div className={this.state.formTitle}>
        	<h4 className="text-warning">Create a new contact</h4>
        </div>
        <div className={this.state.createClass}>
        	<Create
        		getContacts={this.getContacts}
        		cancelCreate={this.hideCreate}
        		customers={this.state.customers}
        		user={this.props.location.state.user} />
        </div>
        <div className={this.state.listClass}>
          <Index
            contacts={contacts}
            deleteContact={this.deleteContact}
            viewContact={this.viewContact} />
        </div>
        <div className={this.state.viewClass}>
        	<View
        		customer={this.state.customer}
        		user={this.state.user}
            deleteContact={this.deleteContact}
        		closeView={this.closeView}
            showEdit={this.showEdit}
        		contactInfo={this.state.contactInfo} />
        </div>
        <div className={this.state.updateClass}>
        	<Update
            getContacts={this.getContacts}
        		contactInfo={this.state.contactInfo}
            cancelEdit={this.hideEdit}
            confirmEdit={this.confirmEdit} />
        </div>
      </div>
    )
  }
}

export default Contacts;
