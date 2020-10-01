import React, { Component, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createAnswer } from "../../actions/questions";
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import NotFound from "../NotFound/NotFoundComponent";
import { useHistory, useParams } from "react-router";
const AddAnswer = () => {
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const id = params.question_id;
  const questions = useSelector((state) => state.questions);
  const question = questions[id];
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const handleSubmit = async (e, questionId) => {
    e.preventDefault();
    await dispatch(
      createAnswer({
        authedUser: authedUser.userId,
        qid: questionId,
        answer: answer,
      })
    );
    await setAnswer("");
    history.push(`/results/${id}`);
  };

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  if (question === undefined) {
    return <NotFound />;
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "20rem" }}>
            <Card.Img
              variant="top"
              width="400"
              height="300"
              className="img-rounded text-center "
              src={users[question.author].avatarURL}
            />
            <Card.Body>
              <Card.Title className="text-center">
                <b>{users[question.author].name}</b> Asks you , would you rather :
              </Card.Title>
              <Form onSubmit={(e) => handleSubmit(e, id)}>
                <ListGroup className="pb-3">
                  <ListGroupItem>
                    <input
                      type="radio"
                      name="questionPoll"
                      id="optionOne"
                      className="mr-1"
                      value="optionOne"
                      onChange={handleInputChange}
                    />
                    {question.optionOne.text}
                  </ListGroupItem>
                  <ListGroupItem>
                    <input
                      type="radio"
                      name="questionPoll"
                      id="optionTwo"
                      className="mr-1"
                      value="optionTwo"
                      onChange={handleInputChange}
                    />
                    {question.optionTwo.text}
                  </ListGroupItem>
                </ListGroup>
                <Button className="pr-3" type="submit" disabled={answer === ""}>
                  Submit{" "}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddAnswer;
