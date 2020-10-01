import React, { Component, Fragment } from "react";
import { Form, Button, Col, Row, Container, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";
import { handleLoginUser } from "../../actions/authedUser.js";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    user: undefined,
  };

  handleChange = (e) => {
    this.setState({ user: e.target.value });
  };
  handleSubmit = (e) => {
    const { setLoginUser } = this.props;
    const { user } = this.state;
    e.preventDefault();
    setLoginUser(user);
  };
  render() {
    const { users, authedUser } = this.props;
    const { user } = this.state;
    return authedUser !== undefined ? (
      <Redirect to="/dashboard" />
    ) : (
      <Fragment>
        <Jumbotron>
          <h1>Welcome to would you rather App !</h1>
          <p>
            <Row>
              <Col xs={5}>
                <Form id="Login" onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Select Your Character </Form.Label>
                    <Form.Control
                      as="select"
                      name="select"
                      placeholder="Pokemon List"
                      value={user || "none"}
                      onChange={(e) => this.handleChange(e)}
                    >
                      <option disabled value="none">
                      Pokemon List
                      </option>
                      {Object.keys(users).map((singleUser) => (
                        <option
                          key={users[singleUser].id}
                          value={users[singleUser].id}
                        >
                          {users[singleUser].name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    value="Submit"
                    disabled={user === undefined}
                  >
                    Sign in
                  </Button>
                </Form>
              </Col>
            </Row>
          </p>
        </Jumbotron>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    authedUser: state.authedUser.userId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLoginUser: (Id) => dispatch(handleLoginUser(Id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
