import { Button, Form, Input, Typography,message,Select,InputNumber, Flex  } from 'antd';
import { useEffect, useState } from "react";
import Commons from '../Utility/url';
import checkToken from '../Utility/CheckToken';
import { useNavigate } from 'react-router-dom';
function CreateMark() {

  const { Title } = Typography;
  let [sublects, setSublects] = useState([]);
  let [students, setStudents] = useState([]);
  const navigate = useNavigate();

  let [studentId, setStudentId] = useState("");
  let [description, setDescription] = useState();
  let [subjectId, setSubjectId] = useState();
  let [score, setScore] = useState();
  const token = checkToken()
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getAllSubjects()
    getAllStudents()
}, [])

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
    
    const response = await fetch(`${Commons.baseUrl}/v1/subject`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
        let data = await response.json()

        setSublects(data.map(item => ({
          value: item.id,
          label: item.name
      })))
    }

}

const postMark = async () => {

  const response = await fetch("http://localhost:8090/v1/mark", {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          score:score,
          subject:{ "id": subjectId },
          description:description,
          student: { "id": studentId }
      }),
  });
  if(response.ok){
      const data = await response.json();
      console.log(data)
      success()

  }
};
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    error()

  };

  const onChangeScore = (value) => {
    console.log('changed', value);
    setScore(value)
  };

  const error = () => {

        messageApi.open({
            type: 'error',
            content: 'Make sure you have entered all the required data',
        });
    };
  
  const success = () => {

    messageApi.open({
        type: "success",
        content: 'You have successfully graded a student',
    });
  };

    const onSearch = (value) => {
      console.log('search:', value);
    };
  return (
    <Form
        name="basic"
        labelCol={{
        span: 8,
        }}
        wrapperCol={{
        span: 16,
        }}
        style={{
        width: "60%",
        backgroundColor:"white",
        padding:100,
        borderRadius:30
        }}
        initialValues={{
        remember: true,
        }}
        onFinish={postMark}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Title level={2}>Add Mark</Title>
        <Form.Item
        label="Student name"
        name="studentName"
        rules={[
            {
            required: true,
            message: 'Please input student name!',
            },
        ]}
        >
         <Select
              showSearch
              placeholder="Select a student"
              optionFilterProp="label"
              onChange={(v)=>{setStudentId(v)}}
              onSearch={onSearch}
              options={students}
            />

        </Form.Item>
        <Form.Item
        label="Subject"
        name="subject"
        rules={[
            {
            required: true,
            message: 'Please input subject!',
            },
        ]}
        >
          <Flex>
            <Select
              showSearch
              placeholder="Select a subject"
              optionFilterProp="label"
              onChange={(value)=>{setSubjectId(value)}}
              onSearch={onSearch}
              options={sublects}
            />
          <Button onClick={()=>{navigate("/create_subject")}} type="primary">
            add
          </Button>
      </Flex>
        </Form.Item>

        <Form.Item
        label="Score"
        name="score"
        rules={[
            {
            required: true,
            message: 'Please input score!',
            },
        ]}
        >
           <InputNumber size="large" min={1} max={10}  onChange={onChangeScore} />
        </Form.Item>
        <Form.Item
        label="Description"
        name="description"
        rules={[
            {
            required: false,
            message: 'Please input description!',
            },
        ]}
        >
        <Input onChange={(e) => { setDescription(e.target.value) }}/>

        </Form.Item>
        <Form.Item
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Button style={{backgroundColor:"#4870E0"}} type="primary" htmlType="submit">
            Send
        </Button>

        </Form.Item>
  </Form>
  );
}

export default CreateMark;
