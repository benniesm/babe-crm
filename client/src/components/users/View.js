import React, { Component } from 'react';

class View extends Component {
      
  render() {

    return (
    	<div>
	      <div className="formButtons">
	      	<span className="buttons">
					  <button
					  	onClick={() => this.props.showEdit(this.props.userInfo)}
					  	className="btn btn-secondary">
					  		Edit Information
					  </button>
			    </span>
			    <span className="buttons">
					  <button
							onClick={() => {
								if (window.confirm(
									'DELETE user? This action cannot be undone'
								))
								this.props.deleteUser(this.props.userInfo._id)
							}}
					  	className="btn btn-danger">
					  		Delete User
					  </button>
			    </span>
	      </div>
		    <div className="tableAll">
		    	<table className="table table-dark tableAll tableAdmin">
		    		<thead>
				  		<tr className="text-warning">
				  			<th>User Information</th>
				  			<th className="viewClose">
				  				<font
				  					className="textClose text-white"
				  					onClick={() => this.props.closeView()}>
				  						close X
				  				</font>
				  			</th>
				  		</tr>	
		    		</thead>
		    		<tbody>			  		
				  		<tr>
				  			<td className="tableColView1">ID:</td>
				  			<td>{this.props.userInfo._id}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Access Level:</td>
				  			<td>{this.props.userInfo.level}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Username:</td>
				  			<td>{this.props.userInfo.username}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Full Name:</td>
				  			<td>{this.props.userInfo.fullname}</td>
				  		</tr>
				  		<tr>
				  			<td className="tableColView1">Email:</td>
				  			<td>{this.props.userInfo.email}</td>
				  		</tr>
		    		</tbody>
		    	</table>
		    </div>
      </div>
    )
  }
}

export default View
