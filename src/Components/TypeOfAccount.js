import { Button, Form, Typography, Flex } from 'antd';
import { useNavigate } from "react-router-dom";

function TypeOfAccount() {

    let navigate = useNavigate()
    const { Title } = Typography;

    return (

        <Flex justify="center" align='center' style={{ width: "100%", height: "100vh" }}>
            <Flex vertical style={{ width: "50%", height: "50vh",   border: "1px solid #D3DCE3", padding: 20,backgroundColor: "white", borderRadius: 20 }}>
                <Title style={{textAlign:"center",marginBottom:30}} level={3}>Choose type of your account</Title>
                <Button style={{marginBottom:30}} type="primary" onClick={() => { navigate("/registration/student") }}>Student</Button>
                <Button type="dashed" onClick={() => { navigate("/registration/professor") }}>Professor</Button>
            </Flex>
        </Flex>
    )
}
export default TypeOfAccount;