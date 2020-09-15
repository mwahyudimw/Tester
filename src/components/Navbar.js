import React from 'react';
import { Link } from 'gatsby';
import user from '../img/user.svg';
import search from '../img/search.svg';
import bookmark from '../img/bookmark.svg';
import logo from '../img/logo.svg';

import SearchBlog from '../components/SearchBlog';

const Navbar = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			navBarActiveClass: ''
		};
	}

	toggleHamburger = () => {
		// toggle the active boolean in the state
		this.setState(
			{
				active: !this.state.active
			},
			// after state has been updated,
			() => {
				// set the class in state for the navbar accordingly
				this.state.active
					? this.setState({
							navBarActiveClass: 'is-active'
						})
					: this.setState({
							navBarActiveClass: ''
						});
			}
		);
	};

	render() {
		return (
			<nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
				<div className="container">
					<div className="navbar-brand">
						<Link to="/" className="navbar-item" title="Logo">
							<img src={logo} alt="Kaldi" style={{ width: '88px' }} />
						</Link>
						{/* Hamburger menu */}
						<div
							className={`navbar-burger burger ${this.state.navBarActiveClass}`}
							data-target="navMenu"
							onClick={() => this.toggleHamburger()}
						>
							<span />
							<span />
							<span />
						</div>
					</div>
					<div id="navMenu" className={`navbar-menu ${this.state.navBarActiveClass}`}>
						<div className="navbar-end has-text-centered">
							<div className="navbar-item">
								<SearchBlog />
							</div>

							<span className="icon">
								<div className="dropdown">
									<img width="100" src={user} alt="user" />
									<div className="dropdown-content">
										<Link to="/admin" style={{ color: 'gray' }}>Dashboard</Link>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
			</nav>
		);
	}
};

export default Navbar;
