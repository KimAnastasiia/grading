import { Typography, Input, Flex, Button, message } from 'antd';
import checkToken from '../Utility/CheckToken';
import { useEffect, useState } from "react";

function CreateSubject() {

    const { Title, Text } = Typography;
    const token = checkToken()
    let [sublect, setSublect] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {

        messageApi.open({
            type: "success",
            content: 'You have successfully created a subject',
        });
    };

    const postSubject = async () => {

        const response = await fetch("http://localhost:8090/v1/subject", {
            method: 'POST',
            headers: {
               'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:sublect
            }),
        });
        if(response.ok){
            const data = await response.json();
            console.log(data)
            success()
        }
      };
    return (
        <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
            <Flex vertical style={{ width: "50%", backgroundColor: "white", borderRadius: 30, padding: 30 }}>
                <Flex align='center' style={{ marginBottom: 16 }}>
                    <Title level={5} style={{ margin:0 }}>Subject name:</Title>
                    <Input onChange={(e)=>{setSublect(e.target.value)}} style={{width:"50%", marginLeft:20,marginRight:20}}></Input>
                    <Button  onClick={()=>{postSubject()}} type='primary'>Create</Button>
                </Flex>
            </Flex>
        </Flex>
    )

}
export default CreateSubject