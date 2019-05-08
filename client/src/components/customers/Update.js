import React, { Component } from 'react';
import axios from 'axios';

class Update extends Component {

	constructor() {
		super();
		
		this.state = {
		  alt_id: null,
		  category: null,
		  fullname: null,
		  email: null,
		  telephone: null,
		  city: null,
		  address: null,
		  comment: null,
		  customerNewInfo: {}
		}
		this.handleChange = this.handleChange.bind(this);
  }
  
  cancelUpdate = () => {
  	this.setState({
		  alt_id: null,
		  category: null,
		  fullname: null,
		  email: null,
		  telephone: null,
		  city: null,
		  address: null,
		  comment: null
  	});
  }

  updateCustomer = () => {
    const customerInfo = 
    	{
    		id: this.id.value,
				alt_id: this.state.alt_id,
				category: this.state.category,
				fullname: this.state.fullname,
				email: this.state.email,
				telephone: this.state.telephone,
				city: this.state.city,
				address: this.state.address,
				date: this.date.value,
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
      		axios.put('/api/customers', customerInfo)
		      .then(res => {
		        if (res.data) {
		          this.props.getCustomers();
		          this.setState({
		          	customerNewInfo: {
		          		"_id": this.id.value,
									"alt_id": this.state.alt_id,
									"category": this.state.category,
									"fullname": this.state.fullname,
									"email": this.state.email,
									"telephone": this.state.telephone,
									"city": this.state.city,
									"address": this.state.address,
									"date": this.date.value,
									"comment": this.state.comment
								}
		          });
							this.setState({
								alt_id: null,
								category: null,
								fullname: null,
								email: null,
								telephone: null,
								city: null,
								address: null,
								comment: null
							});
							this.props.confirmEdit(this.state.customerNewInfo);
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
			alt_id: this.alt_id.value,
			category: this.category.value,
			fullname: this.fullname.value,
			email: this.email.value,
			telephone: this.telephone.value,
			city: this.city.value,
			address: this.address.value,
			comment: this.comment.value
    });
  }

  render() {
		const cat = ["Ivory", "Bronze", "Silver", "Gold", "Platinum"];
		
    return (

      <div className="formAll">
        <div className="subtitle"> 
        	<h4 className="text-warning">Edit: {this.props.customerInfo._id}</h4>
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
		      	defaultValue={this.props.customerInfo._id} />
		      <div>Alternate ID</div>
		      <input type="text"
		      	placeholder="Alternate ID"
		      	onChange={this.handleChange}
		      	name="alt_id"
		      	ref={el => this.alt_id=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.alt_id === null ?
		      		(this.props.customerInfo.alt_id) : (this.state.alt_id)} />
		      <br/>
		      <div>Level</div>
		      <select
		      	placeholder="Level"
		      	onChange={this.handleChange}
		      	name="category"
		      	ref={el => this.category=el}
		      	className="form-control bg-dark text-white" 
		      	value={this.state.category === null ?
		      		(this.props.customerInfo.category): (this.state.category)} >
		      		<option value={this.props.customerInfo.category}>
		      			{cat[this.props.customerInfo.category - 1]}
		      		</option>
		      		<option value="1">Ivory</option>
		      		<option value="2">Bronze</option>
		      		<option value="3">Silver</option>
		      		<option value="4">Gold</option>
		      		<option value="5">Platinum</option>
		      </select>
		      <br/>
		      <div>Full Name</div>
		      <input type="text"
		      	placeholder="Full Name"
		      	onChange={this.handleChange}
		      	name="fullname"
		      	ref={el => this.fullname=el}
		      	className="form-control bg-dark text-white"
		      	defaultValue={this.state.fullname === null ?
		      		(this.props.customerInfo.fullname): (this.state.fullname)} />
		      <br/>
		      <div>Email</div>
		      <input type="text"
		      	placeholder="Email"
		      	onChange={this.handleChange}
		      	name="email"
		      	ref={el => this.email=el}
		      	className="form-control bg-dark text-white"
		      	defaultValue={this.state.email === null ?
		      		(this.props.customerInfo.email): (this.state.email)} /><br/>
		      <div>Telephone</div>
		      <input type="text"
		      	placeholder="Telephone"
		      	onChange={this.handleChange}
		      	name="telephone"
		      	ref={el => this.telephone=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.telephone === null ?
		      		(this.props.customerInfo.telephone): (this.state.telephone)} />
		      <br/>
		      <div>City</div>
		      <input type="text"
		      	placeholder="City"
		      	onChange={this.handleChange}
		      	name="city"
		      	ref={el => this.city=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.city === null ?
		      		(this.props.customerInfo.city): (this.state.city)} />
		      <br/>
		      <div>Address</div>
		      <input type="text"
		      	placeholder="Address"
		      	onChange={this.handleChange}
		      	name="address"
		      	ref={el => this.address=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.address === null ?
		      		(this.props.customerInfo.address): (this.state.address)} />
		      <br/>
		      <input readOnly
		      	type="hidden"
		      	placeholder="Date"
		      	onChange={this.handleChange}
		      	name="date"
		      	ref={el => this.date=el}
		      	defaultValue={this.props.customerInfo.date} />
		      <div>Comment</div>
		      <input type="text"
		      	placeholder="Comment"
		      	onChange={this.handleChange}
		      	name="comment"
		      	ref={el => this.comment=el}
		      	className="form-control bg-dark text-white" 
		      	defaultValue={this.state.comment === null ?
		      		(this.props.customerInfo.comment): (this.state.comment)} />
		      <br/>
		      <div></div>
				</div>
        <div className="formButtons">
        	<span className="buttons">
        		<button
        			onClick = {() => {
        				this.updateCustomer();        				
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
