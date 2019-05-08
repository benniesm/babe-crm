import React, { Component } from 'react';

class Index extends Component {
  
  render() {
  
		return (
		  <div className="tableAll">
				<table className="table table-dark tableAll tableAdmin">
					<thead>
						<tr className="text-warning">
							<th>FULL NAME</th>
							<th>USERNAME</th>
							<th>LEVEL</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{
						  this.props.users &&
						    this.props.users.length > 0 ?
						      (
						        this.props.users.map(user => {
						          return (
								          <tr key={user._id} className="viewList">
								          	<td onClick={() => this.props.viewUser(user)}>
								          		{user.fullname}
								          	</td>
								          	<td onClick={() => this.props.viewUser(user)}>
								          		{user.username}
								          	</td>
								          	<td onClick={() => this.props.viewUser(user)}>
								          		{user.level}
								          	</td>
								          	<td>
								          		<button
								          			className="btn btn-danger"
								          			onClick={() => {
								          				if (window.confirm(
								          					'DELETE user? This action cannot be undone'
								          				))
								          				this.props.deleteUser(user._id) } }>
								          				X
								          		</button>
								          	</td>
								         </tr>
						          )
						        })
						      )
						      :
						      (
						        <tr><td>No user(s) left</td></tr>
						      )
						}
				  </tbody>
				</table>
		  </div>
		)
  }
}

export default Index
