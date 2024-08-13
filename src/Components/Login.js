import React from 'react';
import { Button, message, Form, Input } from 'antd';
import { Flex, Radio } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Commons from '../Utility/url';

const Login = (props) => {
    let { setLogged } = props
    let [email, setEmail] = useState(false);
    let [password, setPassword] = useState(false);
    let navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const login = async (values) => {
        console.log('Success:', values);
        const response = await fetch(Commons.baseUrl+"/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:email,
                password:password
            }),
        });
        if(response.ok){
            const data = await response.json();
            console.log(data)
            navigate("/list")
            localStorage.setItem('access_token', data.token);
            setLogged(true)
        }
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
                        onFinish={login}
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
                wrapperCol={{ span: 24 }} style={{ textAlign: 'center', marginBottom:60 }}
                        >
                            <Flex align='top' justify='center' style={{ width: "100%", height: "40%" }}>
                                <Button
                                    type="primary" htmlType="submit"
                                    style={{ width: "300px", height: 30, backgroundColor: "#E0B548", color: "white", fontSize: 17, border: "1px solid #4870E0" }}
                                    shape="round"

                                >
                                    Submit
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                    <Flex align='top' justify='center' style={{ width: "100%", height: "40%" }}>
                        <Button
                            onClick={() => { navigate("/registration") }}
                            style={{ width: "300px", height: 30,  fontSize: 17, border: "1px solid #4870E0" }}
                            shape="round"
                        >
                            Registration
                        </Button>
                    </Flex>
                </Flex>


            </Flex>
        </Flex>
    )
}

export default Login;