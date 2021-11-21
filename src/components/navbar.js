import React from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand
} from 'reactstrap';
import { Link } from 'react-router-dom';
class NavbarComp extends React.Component {
    state = {
        open: false
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Front End Tester</NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({ open: !this.state.open })} />
                </Navbar>
            </div>
        );
    }
}

export default NavbarComp;