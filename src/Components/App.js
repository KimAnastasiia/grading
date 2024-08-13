import { Layout, Flex, Menu } from "antd"
import { Routes, Route, Navigate , useNavigate, useLocation } from "react-router-dom";
import MenuComponent from "./Menu";
import MenuApiComponent from "./MenuApiComponent";
import ListOfMarks from "./ListOfMarks";
import Login from "./Login";
import CreateMark from "./CreateMark.";
import TypeOfAccount from "./TypeOfAccount";
import RegistrationProfessor from "./RegistrationProfessor";
import RegistrationStudent from "./RegistrationStudent";
import MarkDetails from "./MarkDetails";
import CreateSubject from "./CreateSubject";
import ListOfSubjectsOfProfessor from "./ListOfSubjectsOfProfessor";
import React, { useState, useEffect } from 'react';
import ProfessorRegistrStudent from "./ProfessorRegistrStudent";
function App() {
  let { Header, Content, Footer } = Layout;

  let [logged, setLogged] = useState(localStorage.getItem("access_token"));

  return(
    <Layout style={{ minHeight: "100vh"}}>

      <Header style={{backgroundColor:"#E1B547"}}>
        <Flex align='center' justify="center" style={{ height:"100%", width:"100%"}}>
        {!logged&&<MenuComponent />}
        {logged&&<MenuApiComponent setLogged={setLogged}/>}
        </Flex>
      </Header>

      <Content style={{ padding: "20px 50px" }}>
        <Flex justify="center">
          <Routes>
            <Route path="/login" element={<Login setLogged={setLogged}/>}></Route>
          </Routes>
          <Routes>
            <Route path="/registration/professor" element={<RegistrationProfessor/>}></Route>
          </Routes>
          <Routes>
            <Route path="/registration/student" element={<RegistrationStudent/>}></Route>
          </Routes>
          <Routes>
            <Route path="/professor/registration/student" element={<ProfessorRegistrStudent/>}></Route>
          </Routes>
          <Routes>
            <Route path="/list" element={<ListOfMarks/>}></Route>
          </Routes>
          <Routes>
            <Route path="/details/:markId" element={<MarkDetails/>}></Route>
          </Routes>
          <Routes>
            <Route path="/create" element={<CreateMark/>}></Route>
          </Routes>
          <Routes>
            <Route path="/registration" element={<TypeOfAccount/>}></Route>
          </Routes>
          <Routes>
            <Route path="/create_subject" element={<CreateSubject/>}></Route>
          </Routes>
          <Routes>
            <Route path="/my_subjects" element={<ListOfSubjectsOfProfessor/>}></Route>
          </Routes>
          </Flex>
      </Content>
      <Footer style={{ textAlign: "center" }}>Assistant for professors</Footer>
  </Layout>
  )
}

export default App;
