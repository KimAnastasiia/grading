import { Button, Form, Divider, Typography, Flex } from 'antd';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Commons from '../Utility/url';
import checkToken from '../Utility/CheckToken';
import { useNavigate } from 'react-router-dom';

function MarkDetails() {
  
  const { Title, Text } = Typography;
  const { markId } = useParams()
  const token = checkToken()
  const [mark, setMark] = useState({})
  const [professor, setProfessor] = useState({})
  const [student, setStudent] = useState({})
  const [subject, setSubject] = useState({})
  const navigate = useNavigate();
  useEffect(() => {
    getMarkDetails()
    getProfessor()
  }, [])

  let getMarkDetails = async () => {

    const response = await fetch(`${Commons.baseUrl}/v1/mark/` + markId, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      let data = await response.json()
      setMark(data)
      getStudent(data.student)
      getSubject(data.subject)
    }

  }
  let getProfessor = async () => {

    const response = await fetch(`${Commons.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      let data = await response.json()
      setProfessor(data)
    }

  }
  let getSubject = async (subjectId) => {

    const response = await fetch(`${Commons.baseUrl}/v1/subject/` + subjectId, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      let data = await response.json()
      setSubject(data)
    }

  }
  let getStudent = async (studentId) => {

    const response = await fetch(`${Commons.baseUrl}/users/` + studentId, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      let data = await response.json()
      setStudent(data)
    }

  }
  return (
    <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
      <Flex vertical style={{ width: "50%", backgroundColor: "white", borderRadius: 30, padding: 30 }}>
        <Flex vertical align='center' style={{ marginBottom: 16 }}>
          <Title style={{textAlign:"center"}}>Mark details</Title>
          <Button type='primary' onClick={()=>{navigate("/edit_mark/"+markId)}}>Edit</Button>
        </Flex>
        <Flex align='center' style={{ marginBottom: 16 }}>
          <Title level={5} style={{ margin: 0 }}>Student name:</Title>
          <Text style={{ marginLeft: 8 }}> {student.fullName}</Text>
        </Flex>
        <Divider style={{ margin: "16px 0" }} />
        <Flex align='center' style={{ marginBottom: 16 }}>
          <Title level={5} style={{ margin: 0 }}>Student email:</Title>
          <Text style={{ marginLeft: 8 }}> {student.email}</Text>
        </Flex>
        <Divider style={{ margin: "16px 0" }} />
        <Flex align='center'  style={{ marginBottom: 16 }}>
          <Title level={5} style={{ margin: 0 }}>Student course:</Title>
          <Text style={{ marginLeft: 8 }}> {student.course}</Text>
        </Flex>
        <Divider style={{ margin: "16px 0" }} />
        <Flex align='center' style={{ marginBottom: 16 }}>
          <Title level={5} style={{ margin: 0 }}>Mark:</Title>
          <Text style={{ marginLeft: 8 }}> {mark.score}</Text>
        </Flex>
        <Divider style={{ margin: "16px 0" }} />
        <Flex align='center' style={{ marginBottom: 16 }}>
          <Title level={5} style={{ margin: 0 }}>Subject:</Title>
          <Text style={{ marginLeft: 8 }}> {subject.name}</Text>
        </Flex>
        <Divider style={{ margin: "16px 0" }} />
        <Flex align='center'  style={{ marginBottom: 16 }}>
          <Title level={5} style={{ margin: 0 }}>Professor:</Title>
          <Text style={{ marginLeft: 8 }}> {professor.fullName}</Text>
        </Flex>
        <Divider style={{ margin: "16px 0" }} />
        <Flex align='center' >
          <Title level={5} style={{ margin: 0 }}>Description:</Title>
          <Text style={{ marginLeft: 8 }}> {mark.description}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MarkDetails;
