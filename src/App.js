import { Layout, Flex, Menu } from "antd"
import { Routes, Route, Navigate , useNavigate, useLocation } from "react-router-dom";
import Marks from "./Create";
import MenuComponent from "./Menu";
import MenuApiComponent from "./MenuApiComponent";
import ListOfMarks from "./ListOfMarks";
import Login from "./Login";
import Registration from "./Registration";
function App() {
  let { Header, Content, Footer } = Layout;
  return(
    <Layout style={{ minHeight: "100vh"}}>

      <Header style={{backgroundColor:"#E1B547"}}>
        <Flex align='center' justify="center" style={{ height:"100%", width:"100%"}}>
        {!localStorage.getItem("access_token")&&<MenuComponent/>}
        {localStorage.getItem("access_token")&&<MenuApiComponent/>}
        </Flex>
      </Header>

      <Content style={{ padding: "20px 50px" }}>
        <Flex justify="center">
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
          <Routes>
            <Route path="/registration" element={<Registration/>}></Route>
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
