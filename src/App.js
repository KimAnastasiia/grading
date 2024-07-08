import { Layout, Flex } from "antd"
import { Routes, Route, Navigate , useNavigate, useLocation } from "react-router-dom";
import Marks from "./Marks";
import MenuComponent from "./Menu";
import MenuApiComponent from "./MenuApiComponent";
import ListOfMarks from "./ListOfMarks";
function App() {
  let { Header, Content, Footer } = Layout;
  return(
    <Layout style={{ minHeight: "100vh"}}>

      <Header style={{backgroundColor:"#E1B547"}}>
        <Flex align='center' justify="center" style={{ height:"100%", width:"100%"}}>
          <MenuApiComponent/>
        </Flex>
      </Header>

      <Content style={{ padding: "20px 50px" }}>
        <Flex justify="center">
          <Routes>
            <Route path="/" element={<Marks/>}></Route>
          </Routes>
          <Routes>
            <Route path="/list" element={<ListOfMarks/>}></Route>
          </Routes>
          </Flex>
      </Content>
      <Footer style={{ textAlign: "center" }}>Assistant for professors</Footer>
  </Layout>
  )
}

export default App;
