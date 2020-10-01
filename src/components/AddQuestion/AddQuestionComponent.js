import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../actions/questions";
import { Button, Form, FormGroup, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";

const AddQuestion = (props) => {
  const [options, setOptions] = useState({
    optionOne: "",
    optionTwo: "",
  });
  const [authedUser, setAuthedUser] = useState(undefined);

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authedUser);
  const history = useHistory();

  useEffect(() => {
    authedUser && setAuthedUser(authUser);
  });

  const handleChange = (e) => {
    setOptions({ [e.target.name]: e.target.value });
  };

  const createNewQuestion =  (e) => {
     e.preventDefault();
    const finalObject = { ...options, authedUser: authedUser };
     dispatch(createNewQuestion(finalObject));
    history.push("/dashboard");
    return false
    
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs="12" md="auto">
          <Col xs="12" className="p-3">
            <b>Would You Rather ?</b>
          </Col>
          <Form onSubmit={createNewQuestion}>
            <FormGroup>
              <label htmlFor="o1">Option One</label>
              <Form.Control
              id="o1"
                type="text"
                size="lg"
                name="optionOne"
                value={options.optionOne}
                onChange={handleChange}
                placeholder="Option One"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="o2">Option Two</label>
              <Form.Control
              id="o2"
                type="text"
                size="lg"
                name="optionTwo"
                value={options.optionTwo}
                onChange={handleChange}
                placeholder="Option Two"
              />
            </FormGroup>
            <Button variant="primary" type="submit" value="Submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuestion;
