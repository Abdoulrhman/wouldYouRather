import React from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Container,
  ProgressBar,
} from "react-bootstrap";
import { useParams } from "react-router";

const ViewResult = () => {
  const params = useParams();
  const questions = useSelector((state) => state.questions);
  const question_id = params.question_id;
  const question = questions[question_id];
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);

  const optionOneVotesNumber = question.optionOne.votes.length;
  const optionTwoVotesNumber = question.optionTwo.votes.length;
  const totalVotes = optionOneVotesNumber + optionTwoVotesNumber;
  const optionOnePercentage = parseInt(
    (optionOneVotesNumber / totalVotes) * 100,
    10
  );
  const optionTwoPercentage = parseInt(
    (optionTwoVotesNumber / totalVotes) * 100,
    10
  );
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Col xs="12" className="text-center">
            <p>Asked by {users[questions[question.id].author].name}</p>
            <br />
            <p>{users[authedUser.userId].name}</p> choose {''}
            {
              questions[question.id][
                users[authedUser.userId].answers[question.id]
              ].text
            }
          </Col>
          <ListGroup>
            <ListGroupItem>
              Option 1: {question.optionOne.text} ({optionOneVotesNumber} votes
              out of {totalVotes})
              <ProgressBar animated now={optionOnePercentage} />
            </ListGroupItem>
            <ListGroupItem>
              Option 2: {question.optionTwo.text} ({optionTwoVotesNumber} votes
              out of{totalVotes})
              <ProgressBar animated now={optionTwoPercentage} />
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewResult;
