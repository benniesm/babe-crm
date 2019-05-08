import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import Access from './components/authentication/Access';
import Contacts from './components/contacts/Contacts';
import Customers from './components/customers/Customers';
import Index from './components/Index';
import Users from './components/users/Users';
import Login from './components/authentication/Login';
import UserDetails from './components/authentication/UserDetails';

class AppRouter extends Component {
  render() {
		return (
		  <div className="container">
				<Router id="router">
				  <div className="row">
						<div id="leftPane" className="col-lg-2">
								<nav className="navbar bg-gray">
									<div className="navbar-brand text-warning">
										<h1 className="nav-app">babe CRM</h1>
									</div>
								  <ul className="navbar-nav">
								    <li className="nav-item nav1">
								      <Link to='/' className="nav-link text-light">Home</Link>
								    </li>
								    <li className="nav-item">
								      <Link to='/access/contacts' className="nav-link text-light">Contacts</Link>
								    </li>
								    <li className="nav-item">
								      <Link to='/access/customers' className="nav-link text-light">Customers</Link>
								    </li>
								    <li className="nav-item">
								      <Link to='/access/users'  className="nav-link text-light">Users</Link>
								    </li>
								    <li className="nav-item">
								      <Link to="/authentication/user" className="nav-link text-light">My Profile</Link>
								    </li>
								  </ul>
								</nav>
						</div>
						<div id="rightPane" className="bg-dark col-lg-10 no-float text-warning">
								<Route path="/" exact component={Index} />
								<Route path="/access/:id" exact component={Access} />
								<Route path="/contacts/" component={Contacts} />
								<Route path="/customers/" component={Customers} />
								<Route path="/users/" component={Users} />
								<Route path="/authentication/login" component={Login} />
								<Route path="/authentication/user" component={UserDetails} />
						</div>
				  </div>
				</Router>
		  </div>
		);
  }
}

export default AppRouter;

