import { Button, Form, Divider, Typography, Flex, Input,message } from 'antd';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Commons from '../Utility/url';
import checkToken from '../Utility/CheckToken';

function EditSubject() {
    const { subjectId } = useParams()
    const token = checkToken()
    let [subject, setSubject] = useState([]);
    const { Title } = Typography;
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        getSubject()
    }, [])

    let getSubject = async () => {


        const response = await fetch(`${Commons.baseUrl}/v1/subject/${subjectId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
            let data = await response.json()
            console.log(data)
            setSubject(data)
        }
      }
      
    const editSubject=async()=>{
        let response = await fetch(`${Commons.baseUrl}/v1/subject/${subjectId}`, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json', // Ensure the server knows you're sending JSON
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(subject.name) 
      });
        if(response.ok){
            success()
        }else{
            error()
        }
    }
    const error = () => {

        messageApi.open({
            type: 'error',
            content: 'Error, the subject name has not been edited',
        });
    };
  
  const success = () => {

    messageApi.open({
        type: "success",
        content: 'You have successfully edited a subject name',
    });
  };
    return (
        <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
            <Flex vertical style={{ width: "50%", backgroundColor: "white", borderRadius: 30, padding: 30 }}>
               {contextHolder}
               <Title style={{textAlign:"center"}} level={2}>Edit subject</Title>
               
                <Flex align='center' style={{ marginBottom: 16 }}>
                    <Input onChange={(value)=>{setSubject(prevMark => ({ ...prevMark, name: value.target.value }));}} value={subject.name}/>
                    <Button onClick={()=>{editSubject()}} style={{marginLeft:10}} type='primary'>Edit subject</Button>
                </Flex>
                
            </Flex>
        </Flex>
    );
}

export default EditSubject;