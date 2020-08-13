import React, { PureComponent } from 'react';
import { Navbar, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faSearch, faCopyright } from '@fortawesome/free-solid-svg-icons'

class Layout extends PureComponent {
	render() {
		return (
			<div className="layout">
				{/* the header */}
				<Navbar bg="primary" variant="dark" expand="lg" sticky="top">
					<Navbar.Brand href="#home">
						<FontAwesomeIcon icon={faWifi} />&nbsp;&nbsp;<b>IR Remote</b>
						</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home"></Nav.Link>
						</Nav>
						<Form inline>
							<InputGroup>
								<FormControl type="text" placeholder="Search" className="mr-2" />
								<InputGroup.Append>
									<Button variant="success">
										<FontAwesomeIcon icon={faSearch} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				{/* the body */}
				{this.props.children}
				{/* the footer */}
				<div className="footer">
					<FontAwesomeIcon icon={faCopyright} />&nbsp; Rohan is Bored
				</div>
			</div>
		)
	}
}

export default Layout;