import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {

	constructor () {
		super();
		this.state = {
		  alt_id: "",
		  category: "",
		  fullname: "",
		  email: "",
		  telephone: "",
		  city: "",
		  address: "",
		  date: "",
		  comment: ""
		};
		this.handleChange = this.handleChange.bind(this);
  }

  addCustomer = () => {
    const customerInfo = 
    	{
		  alt_id: this.state.alt_id,
		  category: this.state.category,
		  fullname: this.state.fullname,
		  email: this.state.email,
		  telephone: this.state.telephone,
		  city: this.state.city,
		  address: this.state.address,
		  date: this.state.date,
		  comment: this.state.comment
    	}

    if (customerInfo.alt_id && customerInfo.alt_id.length > 0
    		&& customerInfo.category && customerInfo.category.length > 0
    		&& customerInfo.fullname && customerInfo.fullname.length > 0
    		&& customerInfo.email && customerInfo.email.length > 0
    		&& customerInfo.telephone && customerInfo.telephone.length > 0
    		&& customerInfo.city && customerInfo.city.length > 0
    		&& customerInfo.address && customerInfo.address.length > 0
    		&& customerInfo.date && customerInfo.date.length > 0
    		&& customerInfo.comment && customerInfo.comment.length > 0) {
      axios.post('/api/customers', customerInfo)
        .then(res => {
          if (res.data) {
            this.props.getCustomers();
            this.setState({
							alt_id: "",
							category: "",
							fullname: "",
							email: "",
							telephone: "",
							city: "",
							address: "",
							date: "",
							comment: ""
						});
            this.props.cancelCreate();
          }
        })
        .catch(err => {
        	//console.log(err)
        });
        //console.log("all set");
    } else {
      //console.log('input field required')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      date: this.date.value
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
		      <input type="text"
		      	placeholder="Alternate ID"
		      	onChange={this.handleChange}
		      	name="alt_id"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.alt_id} /><br/>
		      <select
		      	placeholder="Level"
		      	onChange={this.handleChange}
		      	name="category"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.category} >
		      		<option>Please Select</option>
		      		<option value="1">Ivory</option>
		      		<option value="2">Bronze</option>
		      		<option value="3">Silver</option>
		      		<option value="4">Gold</option>
		      		<option value="5">Platinum</option>
		      	</select><br/>
		      <input type="text"
		      	placeholder="Full Name"
		      	onChange={this.handleChange}
		      	name="fullname"
		      	className="form-control bg-dark text-white"
		      	value={this.state.fullname} /><br/>
		      <input type="text"
		      	placeholder="Email"
		      	onChange={this.handleChange}
		      	name="email"
		      	className="form-control bg-dark text-white"
		      	value={this.state.email} /><br/>
		      <input type="text"
		      	placeholder="Telephone"
		      	onChange={this.handleChange}
		      	name="telephone"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.telephone} /><br/>
		      <input type="text"
		      	placeholder="City"
		      	onChange={this.handleChange}
		      	name="city"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.city} /><br/>
		      <input type="text"
		      	placeholder="Address"
		      	onChange={this.handleChange}
		      	name="address"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.address} /><br/>
		      <input readOnly
		      	type="hidden"
		      	name="date"
		      	ref={el => this.date=el}
		      	value={times} />
		      <input type="text"
		      	placeholder="Comment"
		      	onChange={this.handleChange}
		      	name="comment"
		      	className="form-control bg-dark text-white" 
		      	value={this.state.comment} /><br/>
		    </div>
        <div className="formButtons">
        	<span className="buttons">
        		<button onClick={this.addCustomer} className="btn btn-light">
        			Create Record
        		</button>   
        	</span>     	
        </div>
      </div>
    )
  }
}

export default Create
