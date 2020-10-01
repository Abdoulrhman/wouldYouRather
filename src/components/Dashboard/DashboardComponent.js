import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Question from "./Question/QuestionComponent";
import { Nav, Row, Container, Tab, Col } from "react-bootstrap";
const Dashboard = () => {
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);

  const answerQuestion = Object.keys(users[authedUser.userId].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unanswerQuestion = Object.keys(questions)
    .filter((id) => !answerQuestion.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return (
    <Container fluid="md">
      <Tab.Container id="left-tabs-example" defaultActiveKey="Answered">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column" bg="light">
              <Nav.Item>
                <Nav.Link eventKey="Answered">Answered</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Unanswered">Unanswered</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="Answered">
                {answerQuestion.map((id) => (
                  <Fragment key={id}>
                    <Question id={id} isAnswer={false} />
                  </Fragment>
                ))}
              </Tab.Pane>
              <Tab.Pane eventKey="Unanswered">
                {unanswerQuestion.map((id) => (
                  <Fragment key={id}>
                    <Question id={id} isAnswer={true} />
                  </Fragment>
                ))}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Dashboard;
