import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutUser } from "../../actions/authedUser";
const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const user = users[authedUser.userId];
  const { name } = user || "";
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Would You Rather ?</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authedUser.userId && (
            <Fragment>
              <Nav className="mr-auto">
                <NavItem className="pr-3">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/create">Add Question</NavLink>
                </NavItem>
                <NavItem className="pr-3">
                  <NavLink to="/leaderBoard">LeaderBoard</NavLink>
                </NavItem>
              </Nav>

              <Navbar.Text className="justify-content-end">
                <img src={user.avatarURL} style={{ maxWidth: "40px" }} />
                {""}
                {name}

                <span
                  style={{ cursor: "pointer", margin: "15px" }}
                  onClick={() => {
                    dispatch(handleLogoutUser());
                    history.push("/");
                  }}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-door-closed"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"
                    />
                    <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                  </svg>
                </span>
              </Navbar.Text>
            </Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
