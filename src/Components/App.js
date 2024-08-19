import { Layout, Flex, Menu } from "antd"
import { Routes, Route, Navigate , useNavigate, useLocation } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import MenuComponent from "./Menu/Menu";
import MenuApiComponent from "./Menu/MenuApiComponent";
import Login from "./Authorization/Login";
import ListOfMarks from "./Mark/ListOfMarks";
import CreateMark from "./Mark/CreateMark";
import CreateSubject from "./Subject/CreateSubject";
import EditSubject from "./Subject/EditSubject";
import ListOfSubjectsOfProfessor from "./Subject/ListOfSubjectsOfProfessor";
import EditMark from "./Mark/EditMark";
import MarkDetails from "./Mark/MarkDetails";
import RegistrationProfessor from "./Authorization/RegistrationProfessor";
import RegistrationStudent from "./Authorization/RegistrationStudent";
import ProfessorRegistrStudentgistrStudent from "./Authorization/ProfessorRegistrStudentgistrStudent";
import TypeOfAccount from "./Authorization/TypeOfAccount";
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
            <Route path="/professor/registration/student" element={<ProfessorRegistrStudentgistrStudent/>}></Route>
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
          <Routes>
            <Route path="/edit_mark/:markId" element={<EditMark/>}></Route>
          </Routes>
          <Routes>
            <Route path="/edit_subject/:subjectId" element={<EditSubject/>}></Route>
          </Routes>
          </Flex>
      </Content>
      <Footer style={{ textAlign: "center" }}>Assistant for professors</Footer>
  </Layout>
  )
}

export default App;
