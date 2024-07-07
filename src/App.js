import { Layout, notification } from "antd"
import { Routes, Route, Navigate , useNavigate, useLocation } from "react-router-dom";
import Marks from "./Marks";
function App() {
  let { Header, Content, Footer } = Layout;
  return(
    <Layout style={{ minHeight: "100vh", padding:100 }}>
      <Content style={{ padding: "20px 50px" }}>
        
          <Routes>
            <Route path="/" element={<Marks/>}></Route>
          </Routes>

      </Content>
      <Footer style={{ textAlign: "center" }}>Assistant for professors</Footer>
  </Layout>
  )
}

export default App;
