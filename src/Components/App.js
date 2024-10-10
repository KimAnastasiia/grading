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
import ProfessorRegistrStudent from "./Authorization/ProfessorRegistrStudent.js";
import TypeOfAccount from "./Authorization/TypeOfAccount";
import MenuStudentApiComponent from "./Menu/MenuStudentApiComponent.js";
import StudentListOfMarks from "./Mark/StudentListOfMarks.js";
import StudentMarkDetails from "./Mark/StudentMarkDetails.js";
import Profile from "./User/Profile.js";
import EditPassword from "./User/EditPassword.js";
function App() {
  let { Header, Content, Footer } = Layout;

  let [logged, setLogged] = useState(localStorage.getItem("access_token"));
  let [role, setRole] = useState(localStorage.getItem("user_role"));

  return(
    <Layout style={{ minHeight: "100vh"}}>

      <Header style={{backgroundColor:"#E1B547"}}>
        <Flex align='center' justify="center" style={{ height:"100%", width:"100%"}}>
        {!logged&&<MenuComponent />}
        {logged&&<MenuApiComponent setLogged={setLogged}/>}
        
        {/*logged&&<MenuStudentApiComponent setLogged={setLogged}/>*/}
        </Flex>
      </Header>

      <Content style={{ padding: "20px 50px" }}>
        <Flex justify="center">
          <Routes>
            <Route path="/login" element={<Login setLogged={setLogged} setRole={setRole}/>}></Route>
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
            <Route path="/marks" element={<ListOfMarks/>}></Route>
          </Routes>
          <Routes>
            <Route path="/my_marks" element={<StudentListOfMarks/>}></Route>
          </Routes>
          <Routes>
            <Route path="/details/:markId" element={<MarkDetails/>}></Route>
          </Routes>
          <Routes>
            <Route path="/mark_details/:markId" element={<StudentMarkDetails/>}></Route>
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
          <Routes>
            <Route path="/edit/password" element={<EditPassword/>}></Route>
          </Routes>
          <Routes>
            <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
          </Flex>
      </Content>
      <Footer style={{ textAlign: "center" }}>Assistant for professors</Footer>
  </Layout>
  )
}

export default App;
