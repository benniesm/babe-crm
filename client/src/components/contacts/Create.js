import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {

	constructor () {
		super();
		this.state = {
		  customer_id: "",
		  user_id: "",
		  category: "",
		  details: "",
		  timestamp: ""
		};
		this.handleChange = this.handleChange.bind(this);
  }

  addContact = () => {
    const contactInfo = 
    	{
    		customer_id: this.state.customer_id,
    		user_id: this.state.user_id,
    		category: this.state.category,
    		details: this.state.details,
    		timestamp: this.state.timestamp
    	}

    if (contactInfo.customer_id && contactInfo.customer_id.length > 0
    		&& contactInfo.user_id && contactInfo.user_id.length > 0
    		&& contactInfo.category && contactInfo.category.length > 0
    		&& contactInfo.details && contactInfo.details.length > 0
    		&& contactInfo.timestamp && contactInfo.timestamp.length > 0) {
      axios.post('/api/contacts', contactInfo)
        .then(res => {
          if (res.data) {
            this.props.getContacts();
            this.setState({
    					customer_id: "",
            	user_id: "",
    					category: "",
    					details: "",
            	timestamp: ""
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
      [e.target.name]: e.target.value,
      user_id: this.user.value,
      timestamp: this.timestamp.value
    })
  }
      
  render() {
		const date = new Date();
		const times = date.toString();
    return (
      <div className="formAll">
        <div className="createClose">
      		<button onClick={this.props.cancelCreate} className="btn btn-danger">
      			Cancel
      		</button>
        </div>
      	<div>
		      <select
		      	onChange={this.handleChange}
		      	name="customer_id"
		      	className="form-control bg-dark text-white"
		      	value={this.state.customer_id} >
		      		<option>Please Select</option>
		      		{this.props.customers.map(customer => {
		      			return(
		      				<option key={customer._id} value={customer._id}>
		      					{customer.fullname}
		      				</option>
		      			)
		      		})}
		      	</select><br/>
		      <input type="hidden"
		      	name="user_id"
		      	ref={el => this.user=el}
		      	value={this.props.user} />
		      <select
		      	onChange={this.handleChange}
		      	name="category"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.category} >
		      		<option>Please Select</option>
		      		<option value="Enquiry">Enquiry</option>
		      		<option value="Complaint">Complaint</option>
		      		<option value="Request">Request</option>
		      	</select><br/>
		      <textarea
		      	placeholder="Details"
		      	onChange={this.handleChange}
		      	name="details"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.details}></textarea><br/>
		      <input readOnly
		      	type="hidden"
		      	name="timestamp"
		      	ref={el => this.timestamp=el}
		      	value={times} />
		    </div>
        <div className="formButtons">
        	<span className="buttons">
        		<button onClick={this.addContact} className="btn btn-light">
        			Create Record
        		</button>
        	</span>
        </div>
      </div>
    )
  }
}

export default Create
