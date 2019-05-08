import React, { Component } from 'react';
import axios from 'axios';

import Create from './Create.js';
import Index from './Index.js';
import Update from './Update.js';
import View from './View.js';

class Customers extends Component {
	constructor () {
		super();
		this.state = {
		  customers: [],
		  customerInfo: [],
		  createClass: "divHide",
		  formTitle: "divHide",
		  listClass: "divShow",
		  newClass: "divShow",
		  updateClass: "divHide",
		  viewClass: "divHide",
		};
  }

  componentDidMount = () => {
    this.getCustomers();
  }
  
  closeView = () => {
    this.setState({
    	listClass: "divShow",
    	newClass: "divShow",
    	viewClass: "divHide"
    });
  }

  confirmEdit = (customerInfoEdited) => {
  	this.setState({
    	customerInfo: customerInfoEdited,
    	updateClass: "divHide",
    	viewClass: "divShow"
  	});
  }

  deleteCustomer = (id) => {
    const check = {act: "delete", rights: this.props.location.state.rights};
    axios.post('/api/crud', check)
      .then(res => {
        if (res.data.stat === 202) {
					axios.delete(`/api/customers/${id}`)
						.then(res => {
							if (res.data) {
								this.getCustomers();
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

  getCustomers = () => {
    axios.get('/api/customers')
      .then(res => {
        if (res.data) {
          this.setState({
            customers: res.data
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
  
  viewCustomer = (customer) => {
    this.setState({
    	customerInfo: customer,
    	createClass: "divHide",
    	listClass: "divHide",
    	newClass: "divHide",
    	viewClass: "divShow"
    });
  }

  render() {
    
    let { customers } = this.state;

    return(
      <div>
        <h1 className="pageTitle">Customer Accounts</h1>
        <div className={this.state.newClass}>
		      <div className="buttons">
				    <button onClick={this.showCreate} className="btn btn-warning">
				    	Create new customer
				    </button>
		      </div>
        </div>
        <div className={this.state.formTitle}>
        	<h4 className="text-warning">Create a new customer</h4>
        </div>
        <div className={this.state.createClass}>
        	<Create
        		getCustomers={this.getCustomers}
        		cancelCreate={this.hideCreate} />
        </div>
        <div className={this.state.listClass}>
          <Index
            customers={customers}
            deleteCustomer={this.deleteCustomer}
            viewCustomer={this.viewCustomer} />
        </div>
        <div className={this.state.viewClass}>
        	<View
            deleteCustomer={this.deleteCustomer}
        		closeView={this.closeView}
            showEdit={this.showEdit}
        		customerInfo={this.state.customerInfo} />
        </div>
        <div className={this.state.updateClass}>
        	<Update
            getCustomers={this.getCustomers}
        		customerInfo={this.state.customerInfo}
            cancelEdit={this.hideEdit}
            confirmEdit={this.confirmEdit} />
        </div>
      </div>
    )
  }
}

export default Customers;
