import React, { Component } from 'react';

class Index extends Component {
	constructor () {
		super();
		this.state = {
			category: null
		}
  }
  
  render() {
  	
  	const cat = ["Ivory", "Bronze", "Silver", "Gold", "Platinum"];
  	
		return (
		  <div className="tableAll">
				<table className="table table-dark tableAll tableAdmin">
					<thead>
						<tr className="text-warning">
							<th>FULL NAME</th>
							<th>CITY</th>
							<th>LEVEL</th>
							<th>DATE AND TIME REGISTERED</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{
						  this.props.customers &&
						    this.props.customers.length > 0 ?
						      (
						        this.props.customers.map(customer => {
						          return (
								          <tr key={customer._id} className="viewList">
								          	<td onClick={() => this.props.viewCustomer(customer)}>
								          		{customer.fullname}
								          	</td>
								          	<td onClick={() => this.props.viewCustomer(customer)}>
								          		{customer.city}
								          	</td>
								          	<td onClick={() => this.props.viewCustomer(customer)}>
								          		{cat[customer.category - 1]}
								          	</td>
								          	<td onClick={() => this.props.viewCustomer(customer)}>
								          		{customer.date}
								          	</td>
								          	<td>
								          		<button
								          			className="btn btn-danger"
								          			onClick={() => {
								          				if (window.confirm(
								          					'DELETE Customer? This action cannot be undone'
								          				))
								          				this.props.deleteCustomer(customer._id) } }>
								          				X
								          		</button>
								          	</td>
								         </tr>
						          )
						        })
						      )
						      :
						      (
						        <tr><td>No Customer(s) left</td></tr>
						      )
						}
				  </tbody>
				</table>
		  </div>
		)
  }
}

export default Index
