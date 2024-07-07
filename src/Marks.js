import { Button, Form, Input } from 'antd';
import './App.css';

function Marks() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        }}
        initialValues={{
        remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
        label="Description"
        name="description"
        rules={[
            {
            required: true,
            message: 'Please input description!',
            },
        ]}
        >
        <Input />

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
        <Input />
        </Form.Item>

        <Form.Item
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Button type="primary" htmlType="submit">
            Send
        </Button>

        </Form.Item>
  </Form>
  );
}

export default Marks;
