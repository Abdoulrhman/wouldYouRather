import React, { Component } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Row, Col, Image, ListGroup, ListGroupItem } from "react-bootstrap";
const SingleQuestion = (props) => {

  const { id, isAnswer } = props;
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const question = questions[id];
  const user = users[questions[id].author];

  const answerOrResultLink =
  isAnswer ? `/results/${id}` : `/answer/${id}`;
  return (
    <Row className="justify-content-md-center p-3">
      <Col xs="2">
        <Image src={user.avatarURL} className="col-12" roundedCircle fluid />
      </Col>
      <Col xs="10">
        <Row>
          <Col xs="12">
            <Link to={answerOrResultLink}>
              <p
                style={{
                  width: "100%",
                  background: "#007bff",
                  color: "#FFF",
                  borderRadius: "5px",
                  padding: "15px",
                }}
              >
                <b>{user.name}</b> Asks would you rather:
              </p>
            </Link>
          </Col>
          <Col xs="12">
            <ListGroup>
              <ListGroupItem>{question.optionOne.text}</ListGroupItem>
              <ListGroupItem>{question.optionTwo.text}</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SingleQuestion;
