import React, { useState, useEffect } from 'react';
import checkToken from '../Utility/CheckToken';
import Commons from '../Utility/url';
import { Avatar, Typography, Flex, Button, message, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
    const token = checkToken()
    const [user, setUser] = useState({})
    const { Paragraph } = Typography;
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        getUser()
    }, []) 

    let getUser = async () => {

        const response = await fetch(`${Commons.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            let data = await response.json()
            setUser(data);
        }

    }
    const editProfile=async()=>{
        let response = await fetch(`${Commons.baseUrl}/users/`, {
          method: "PUT",
          headers: {
        
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            fullName:user.fullName,
            email:user.email
          })
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
            content: 'Make sure you entered all the data',
        });
    };
    const success = () => {

        messageApi.open({
            type: "success",
            content: 'You have successfully edited your personal data',
        });
    };
    const onChange = (name, value) => {
        setUser(prevMark => ({ ...prevMark, [name]: value.target.value }));
    };
    return (
        <Flex style={{ width: "100%" }}>
            {contextHolder}
            <Flex style={{ backgroundColor: "white", width: "70%", padding: 40, borderRadius: 30 }} vertical>
                <Avatar style={{ marginBottom: 20 }} size={64} icon={<UserOutlined />} />
              
                <Input value={user.fullName}  onChange={(v)=>{onChange("fullName", v)}} />
                <Input value={user.email}   onChange={(v)=>{onChange("email", v)}} />
                
                <Paragraph>
                    course: {user.course}
                </Paragraph>
                <Button style={{marginBottom:10}} onClick={()=>{editProfile()}} type='primary'>Save</Button>
                <Button>Change password</Button>
            </Flex>
        </Flex>
    );
}
export default Profile;