import { Button, Form, Input, Typography  } from 'antd';

function Marks() {
  const { Title } = Typography;


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
        width: "60%",
        backgroundColor:"white",
        padding:100,
        borderRadius:30
        }}
        initialValues={{
        remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Title level={2}>Add Mark</Title>

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
        <Button style={{backgroundColor:"#4870E0"}} type="primary" htmlType="submit">
            Send
        </Button>

        </Form.Item>
  </Form>
  );
}

export default Marks;
