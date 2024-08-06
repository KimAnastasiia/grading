import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { Flex, Radio } from 'antd';
import { useGoogleLogin } from '@react-oauth/google';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let [email, setEmail] = useState(false);
    let [password, setPassword] = useState(false);
    let navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {

            //localStorage.removeItem("access_token");
            navigate("/login")
        }
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This user does not exist',
        });
    };
    return (
        <Flex justify='center' align='center' style={{ height: "70vh", width: "100%" }}>
            {contextHolder}
            <Flex justify='center' align='center' style={{ height: 400, width: 600, backgroundColor: "white", border: "1px solid #D3DCE3", padding: 20, borderRadius: 20 }}>


                <Flex align="center" justify='center' vertical style={{ width: "100%", height: "60%", }}>
                    <h1>Login</h1>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}

                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ width: "100%", marginTop: "20px" }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Flex align='top' justify='center' style={{ width: "100%", height: "40%" }}>
                        <Button
                            onClick={() => { navigate("/registration") }}
                            style={{ width: "300px", height: 50, backgroundColor: "#E0B548", color: "white", fontSize: 17, border: "1px solid #4870E0" }}
                            shape="round"
                        >
                            Sign up
                        </Button>
                    </Flex>
                </Flex>


            </Flex>
        </Flex>
    )
}

export default Login;