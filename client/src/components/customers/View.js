import React, { Component } from 'react';

class View extends Component {
      
  render() {
		const cat = ["Ivory", "Bronze", "Silver", "Gold", "Platinum"];
		
    return (
    	<div>
	      <div className="formButtons">
	      	<span className="buttons">
					  <button
					  	onClick={() => this.props.showEdit(this.props.customerInfo)}
					  	className="btn btn-secondary">
					  		Edit Information
					  </button>
			    </span>
			    <span className="buttons">
					  <button
							onClick={() => {
								if (window.confirm(
									'DELETE Customer? This action cannot be undone'
								))
								this.props.deleteCustomer(this.props.customerInfo._id)
							}}
					  	className="btn btn-danger">
					  		Delete Customer
					  </button>
			    </span>
	      </div>
		    <div className="tableAll">
		    	<table className="table table-dark tableAll tableAdmin">
		    	<tbody>
				  		<tr className="text-warning">
				  			<th>Customer Information</th>
				  			<th className="viewClose">
				  				<font
				  					className="textClose text-white"
				  					onClick={() => this.props.closeView()}>
				  						close X
				  				</font>
				  			</th>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">ID:</td>
				  			<td>{this.props.customerInfo._id}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Alt Id:</td>
				  			<td>{this.props.customerInfo.alt_id}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Level:</td>
				  			<td>{cat[this.props.customerInfo.category - 1]}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Full Name:</td>
				  			<td>{this.props.customerInfo.fullname}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Email:</td>
				  			<td>{this.props.customerInfo.email}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Telephone:</td>
				  			<td>{this.props.customerInfo.telephone}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">City:</td>
				  			<td>{this.props.customerInfo.city}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Address:</td>
				  			<td>{this.props.customerInfo.address}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Date Registered:</td>
				  			<td>{this.props.customerInfo.date}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Comment:</td>
				  			<td>{this.props.customerInfo.comment}</td>
				  		</tr>
		    		</tbody>
		    	</table>
		    </div>
      </div>
    )
  }
}

export default View
