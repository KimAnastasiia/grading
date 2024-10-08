import { Typography, Input, Flex, Button, message } from 'antd';
import checkToken from '../../Utility/CheckToken';
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
        <Flex justify='center' align='center' style={{ height: "70vh", width: "100%" }}>
        {contextHolder}
            <Flex vertical align='center' style={{ height: 300, width: 600, backgroundColor: "white", border: "1px solid #D3DCE3", padding: 20, borderRadius: 20 }}>


                <Flex align="center" justify='center' vertical style={{ width: "100%", height: "60%", }}>
                    <h1>Create new subject</h1>
                </Flex>
                <Flex align='center'justify='center' style={{ marginBottom: 16,width:"100%" }}>

                    <Title level={5} style={{ margin:0, width:"120px" }}>Subject name:</Title>
                    <Input onChange={(e)=>{setSublect(e.target.value)}} style={{width:"200px",marginRight:20}}></Input>
                    <Button  onClick={()=>{postSubject()}} type='primary'>Create</Button>
                </Flex>

            </Flex>
        </Flex>
    )

}
export default CreateSubject