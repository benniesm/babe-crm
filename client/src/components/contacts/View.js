import React, { Component } from 'react';

class View extends Component {
      
  render() {
    return (
    	<div>
	      <div className="formButtons">
	      	<span className="buttons">
					  <button
					  	onClick={() => this.props.showEdit(this.props.contactInfo)}
					  	className="btn btn-secondary">
					  		Edit Information
					  </button>
			    </span>
			    <span className="buttons">
					  <button
							onClick={() => {
								if (window.confirm(
									'DELETE contact? This action cannot be undone'
								))
								this.props.deleteContact(this.props.contactInfo._id)
							}}
					  	className="btn btn-danger">
					  		Delete Contact
					  </button>
			    </span>
	      </div>
		    <div className="tableAll">
		    	<table className="table table-dark tableAll tableAdmin">
		    	<tbody>
				  		<tr className="text-warning">
				  			<th>Contact Information</th>
				  			<th className="viewClose">
				  				<font
				  					className="textClose text-white"
				  					onClick={() => this.props.closeView()}>
				  						close X
				  				</font>
				  			</th>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Customer:</td>
				  			<td>{this.props.customer}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Category:</td>
				  			<td>{this.props.contactInfo.category}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Details:</td>
				  			<td>{this.props.contactInfo.details}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Logged by:</td>
				  			<td>{this.props.user}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Log Time:</td>
				  			<td>{this.props.contactInfo.timestamp}</td>
				  		</tr>
		    		</tbody>
		    	</table>
		    </div>
      </div>
    )
  }
}

export default View
