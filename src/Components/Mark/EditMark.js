import { Button, Form, Input, Typography,message,Select,InputNumber, Flex  } from 'antd';
import { useEffect, useState } from "react";
import Commons from '../../Utility/url';
import checkToken from '../../Utility/CheckToken';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function EditMark() {

  const { Title } = Typography;
  let [subjects, setSubjects] = useState([]);
  let [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const { markId } = useParams()

  let [mark, setMark] = useState({});
  const token = checkToken()
  const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        getAllSubjects()
        getAllStudents()
        getMarkDetails()
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
 
        }
    
      }
  let getAllStudents = async () => {


    const response = await fetch(`${Commons.baseUrl}/users/students`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
        let data = await response.json()
        setStudents(data.map(item => ({
          value: item.id,
          label: `${item.fullName} (${item.course} course)`
      })))
    }

  }

  let getAllSubjects = async () => {
      
      const response = await fetch(`${Commons.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
          let data = await response.json()

          setSubjects(data.subjects.map(item => ({
            value: item.id,
            label: item.name
        })))
      }

  }

  const error = () => {

        messageApi.open({
            type: 'error',
            content: 'Error, mark didn`t edit',
        });
    };
  
  const success = () => {

    messageApi.open({
        type: "success",
        content: 'You have successfully graded a student',
    });
  };

    const editMark=async()=>{
      let response = await fetch(`${Commons.baseUrl}/v1/mark/${markId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json', // Ensure the server knows you're sending JSON
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mark)
    });
      if(response.ok){
          success()
      }else{
          error()
      }
  }
  const onChange = (name, value) => {
    if(name == "description"){
      setMark(prevMark => ({ ...prevMark, [name]: value.target.value }));
    }else{
      setMark(prevMark => ({ ...prevMark, [name]: value }));
    }
  };
  return (

    <div style={{ width: '60%', backgroundColor: 'white', padding: 100, borderRadius: 30 }}>
      {contextHolder}
    <Title level={2}>Edit Mark</Title>
    <div style={{ marginBottom: 16 }}>
      <label>Student name</label>
      <div style={{ display: 'flex', gap: 10 }}>
        <Select
          showSearch
          placeholder="Select a student"
          optionFilterProp="label"
          value={mark.student}
          options={students}
          style={{ flex: 1 }}
          onChange={(v)=>{onChange("student",v )}}
        />
        <Button onClick={() => navigate('/professor/registration/student')} type="primary">
          Add
        </Button>
      </div>
    </div>

    <div style={{ marginBottom: 16 }}>
      <label>Subject</label>
      <div style={{ display: 'flex', gap: 10 }}>
        <Select
          showSearch
          placeholder="Select a subject"
          optionFilterProp="label"
          value={mark.subject}
          options={subjects}
          style={{ flex: 1 }}
          onChange={(v)=>{onChange("subject",v )}}
        />
        <Button onClick={() => navigate('/create_subject')} type="primary">
          Add
        </Button>
      </div>
    </div>

    <div style={{ marginBottom: 16 }}>
      <label>Score</label>
      <InputNumber onChange={(v)=>{onChange("score", v)}} size="large" min={1} max={10} value={mark.score}  style={{ width: '100%' }} />
    </div>

    <div style={{ marginBottom: 16 }}>
      <label>Description</label>
      <Input value={mark.description} onChange={(v)=>{onChange("description", v)}} />
    </div>

    <Button onClick={()=>{editMark()}} style={{ backgroundColor: '#4870E0' }} type="primary" >
      Send
    </Button>
  </div>

  );
}

export default EditMark;
