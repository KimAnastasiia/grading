import React from 'react';
import { Button, message, Form, Input,InputNumber  } from 'antd';
import { Flex, Radio } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfessorRegistrStudent = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [fullName, setFullName] = useState("");
    let [course, setCourse] = useState(1);
    let navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        error()
    };
    const error = () => {

        messageApi.open({
            type: 'error',
            content: 'Make sure you entered all the data correctly',
        });
    };
    const success = () => {

        messageApi.open({
            type: "success",
            content: 'You have successfully registered, now you can log in to your account',
        });
    };
    const createUser = async () => {

            const response = await fetch("http://localhost:8090/auth/signup/student", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                    fullName:fullName,
                    course:course
                }),
            });
            if(response.ok){
                const data = await response.json();
                console.log(data)
                setEmail("")
                setPassword("")
                setCourse("")
                setFullName("")
                success()
            }
    };
    return (
        <Flex justify='center' align='center' style={{ height: "70vh", width: "100%" }}>
            {contextHolder}
            <Flex justify='center' align='center' style={{ height: 400, width: 600, backgroundColor: "white", border: "1px solid #D3DCE3", padding: 20, borderRadius: 20 }}>


                <Flex align="center" justify='center' vertical style={{ width: "100%", height: "60%", }}>
                    <h1>Create stuent account</h1>
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
                        onFinish={createUser}
                        onFinishFailed={onFinishFailed}
                        style={{ width: "100%", marginTop: "20px" }}
                    >

                        
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => { setFullName(e.target.value) }} />
                        </Form.Item>
                        <Form.Item
                            label="Course"
                            name="course"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your course!',
                                },
                            ]}
                        >
                            <InputNumber min={1} max={4} type='number' onChange={(value) => { setCourse(value) }} />

                        </Form.Item>
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
                wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}
                        >
                            <Flex align='top' justify='center' style={{ width: "100%", height: "40%" }}>
                                <Button
                                    type="primary" htmlType="submit"
                                    style={{ width: "300px", height: 50, backgroundColor: "#E0B548", color: "white", fontSize: 17, border: "1px solid #4870E0" }}
                                    shape="round"

                                >
                                    Submit
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Form>

                </Flex>


            </Flex>
        </Flex>
    )
}

export default ProfessorRegistrStudent;