import React, { PureComponent } from 'react';
import { Navbar, Nav, Form, FormControl, Button, InputGroup, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faSearch, faCopyright } from '@fortawesome/free-solid-svg-icons'

class Layout extends PureComponent {
	render() {
		return (
			<div className="layout">
				<header>
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
							<Form inline onSubmit={(e) => {
								e.preventDefault();
								this.props.onSearchClick();
							}}>
								<InputGroup>
									<FormControl type="text" placeholder="Search" className="mr-2" value={this.props.searchText} onChange={(e) => {
										const value = e.target.value;
										this.props.onChange(value);
									}}/>
									<InputGroup.Append>
										<Button variant="success" type="submit">
											<FontAwesomeIcon icon={faSearch} />
										</Button>
									</InputGroup.Append>
								</InputGroup>
							</Form>
						</Navbar.Collapse>
					</Navbar>
				</header>
				{/* the body */}
				{this.props.children}
				{/* the footer */}
				<footer className="footer">
					<Container>
						<Row className="justify-content-center footer-text">
							<span className="text-mute">
								<FontAwesomeIcon icon={faCopyright} />&nbsp; Rohan is Bored
						</span>
						</Row>
					</Container>
				</footer>
			</div>
		)
	}
}

export default Layout;