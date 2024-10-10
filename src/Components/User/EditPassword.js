import React, { useState, useEffect } from 'react';
import checkToken from '../../Utility/CheckToken';
import Commons from '../../Utility/url';
import { Button, message, Input, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const EditPassword = () => {

    const token = checkToken()
    const [user, setUser] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate()
    const editPassword = async () => {

        let response = await fetch(`${Commons.baseUrl}/users/change-password`, {
            method: "PUT",
            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                oldPassword: user.prevPassw,
                newPassword: user.newPassw
            })
        });
        if (response.ok) {
            success()
        } else {
            error()
        }
    }
    const error = () => {

        messageApi.open({
            type: 'error',
            content: "Old password is incorrect. Please try again.",
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

    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.forEach(error => {
            messageApi.open({
                type: 'error',
                content: 'Failed:' + error.errors[0]
            });
        });

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
                maxWidth: 600,
                backgroundColor: 'white', // Set the background color to white
                padding: '20px', // Add some padding for better spacing
                borderRadius: '8px', // Optional: Add rounded corners for better aesthetics
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: Add a subtle shadow
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={editPassword}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >   {contextHolder}
            <Button onClick={()=>{navigate("/profile")}} style={{marginBottom:20}} shape="round" icon={<ArrowLeftOutlined />} />
            <Form.Item
                label="old password"
                name="prevPassw"
                rules={[
                    {
                        required: true,
                        message: 'Please input your old password!',
                    },
                ]}
            >
                <Input.Password onChange={(v) => { onChange("prevPassw", v) }} />
            </Form.Item>

            <Form.Item
                label="new password"
                name="newPassw"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                ]}
            >
                <Input.Password onChange={(v) => { onChange("newPassw", v) }} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default EditPassword;