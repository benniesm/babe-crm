import React, { Component } from 'react';

class Index extends Component {

  render() {
		return (
		  <div className="tableAll">
				<table className="table table-dark tableAll tableAdmin">
					<thead>
						<tr className="text-warning">
							<th>CUSTOMER</th>
							<th>CATEGORY</th>
							<th>LOG TIME</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{
						  this.props.contacts &&
						    this.props.contacts.length > 0 ?
						      (
						        this.props.contacts.map(contact => {
						          return (
								          <tr key={contact._id} className="viewList">
								          	<td
								          		onClick={() => this.props.viewContact(contact)}>
								          		{contact.customer_id}
								          	</td>
								          	<td onClick={() => this.props.viewContact(contact)}>
								          		{contact.category}
								          	</td>
								          	<td onClick={() => this.props.viewContact(contact)}>
								          		{contact.timestamp}
								          	</td>
								          	<td>
								          		<button
								          			className="btn btn-danger"
								          			onClick={() => {
								          				if (window.confirm(
								          					'DELETE contact? This action cannot be undone'
								          				))
								          				this.props.deleteContact(contact._id) } }>
								          				X
								          		</button>
								          	</td>
								         </tr>
						          )
						        })
						      )
						      :
						      (
						        <tr><td>No contact(s) left</td></tr>
						      )
						}
				  </tbody>
				</table>
		  </div>
		)
  }
}

export default Index
