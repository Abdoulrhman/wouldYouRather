import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Table,Container,Row } from 'react-bootstrap';

class Leaderboard extends Component {
  componentDidMount() {
  const {users}=this.props;
   this.orderUsers(users)  
  }
  state={orderUsers:undefined}
   orderUsers =(allUsers)=>{
 this.setState({orderUsers:Object.keys(allUsers).map(id => ({
      id: id,
      name:allUsers[id].name,
      answer : Object.keys(allUsers[id].answers).length,
      question : Object.keys(allUsers[id].questions).length,
      avatarURL:allUsers[id].avatarURL
    })).sort((a, b) => b.answer+b.question - a.answer-a.question)})
   
}
  render() {
    const {orderUsers}=this.state
    return (
      <Container fluid="md">   
      <Row className="p-3">  
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
      { orderUsers!==undefined?orderUsers.slice(0,3).map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>
        <td><img src={user.avatarURL}  width="40" height="40"  alt='Profile Pic'/>  {user.name}<span style={{fontWeight:"bold" ,  color:"green"}}> {index == 0 ? '1st place': ''}</span>  </td>
        <td>{user.answer+user.question}</td>
      </tr>
    )):<tr></tr>}
        </tbody>
      </Table>
      </Row>  
      </Container>
    )
  }
}

const mapStateToProps=({ users })=> {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
