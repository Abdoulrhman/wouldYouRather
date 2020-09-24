import React, {  Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { handleLogoutUser } from '../../actions/authedUser'
const NavBar = ()=> {
 
    const authedUser = useSelector((state)=>state.authedUser);
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.users);
    const user = users[authedUser.id];
    const { name } = user || ''
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand >Would You Rather</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authedUser && (
            <Fragment>
              <Nav className="mr-auto">
                <NavItem className="pr-3">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/leaderBoard">LeaderBoard</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/create">Add Question</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/login" onClick={() => {
                    dispatch(handleLogoutUser())
                  }}>Log Out
                  </NavLink>
                </NavItem>
              </Nav>

              <Navbar.Text className="justify-content-end">
                Signed in as:  {name}
              </Navbar.Text>
            </Fragment>
          ) }


        </Navbar.Collapse>
      </Navbar>
    )

}

export default NavBar

