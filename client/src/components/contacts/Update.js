import React, { Component } from 'react';
import axios from 'axios';

class Update extends Component {

	constructor() {
		super();
		
		this.state = {
		  details: null,
		  contactNewInfo: {}
		}
		this.handleChange = this.handleChange.bind(this);
  }
  
  cancelUpdate = () => {
  	this.setState({
		  details: null
  	});
  }

  updateContact = () => {
    const contactInfo = 
    	{
    		id: this.id.value,
    		customer_id: this.customer_id.value,
    		user_id: this.user_id.value,
    		category: this.category.value,
    		details: this.state.details + "(EDITED).",
    		timestamp: this.timestamp.value
    	}

    if (contactInfo.id && contactInfo.id.length > 0
    		&& contactInfo.customer_id && contactInfo.customer_id.length > 0
    		&& contactInfo.user_id && contactInfo.user_id.length > 0
    		&& contactInfo.category && contactInfo.category.length > 0
    		&& contactInfo.details && contactInfo.details.length > 0
    		&& contactInfo.timestamp && contactInfo.timestamp.length > 0) {
      		axios.put('/api/contacts', contactInfo)
		      .then(res => {
		        if (res.data) {
		          this.props.getContacts();
		          this.setState({
		          	contactNewInfo: {
		          		"_id": this.id.value,
		          		"customer_id": this.customer_id.value,
		          		"user_id": this.user_id.value,
		          		"category": this.category.value,
		          		"details": this.state.details,
		          		"timestamp": this.timestamp.value
		          	}
		          });
							this.setState({
								details: null
							});
							this.props.confirmEdit(this.state.contactNewInfo);
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
      details: this.details.value
    });
  }

  render() {
  
    return (
      <div className="formAll">
        <div className="subtitle"> 
        	<h4 className="text-warning">Edit contact details</h4>
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
		      <input readOnly
		      	type="hidden"
		      	name="id"
		      	ref={el => this.id=el}
		      	defaultValue={this.props.contactInfo._id} />
		      <input readOnly
		      	type="hidden"
		      	name="customer_id"
		      	ref={el => this.customer_id=el}
		      	defaultValue={this.props.contactInfo.customer_id} />
		      <input readOnly
		      	type="hidden"
		      	name="user_id"
		      	ref={el => this.user_id=el}
		      	defaultValue={this.props.contactInfo.user_id} />
		      <input readOnly
		      	type="hidden"
		      	name="category"
		      	ref={el => this.category=el}
		      	defaultValue={this.props.contactInfo.category} />
		      <div>Details</div>
		      <textarea
		      	placeholder="Details"
		      	onChange={this.handleChange}
		      	name="details"
		      	ref={el => this.details=el}
		      	className="form-control bg-dark text-white" 
		      	value={this.state.details === null ?
		      		(this.props.contactInfo.details) : (this.state.details)}>
		      </textarea><br/>
		      <input readOnly
		      	type="hidden"
		      	name="timestamp"
		      	ref={el => this.timestamp=el}
		      	defaultValue={this.props.contactInfo.timestamp} />
		    </div>
        <div className="formButtons">
        	<span className="buttons">
        		<button
        			onClick = {() => {
        				this.updateContact();        				
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
