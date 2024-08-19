import React, { useState } from 'react';
import { Button, Divider, Flex, Menu  } from 'antd';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { EditOutlined, PlusOutlined, FormOutlined,AlignLeftOutlined,LogoutOutlined } from '@ant-design/icons';
let MenuApiComponent = (props) => {
  let { setLogged } = props
  const items = [
    {
      label: "Data",
      key: 'data',
      icon: <AlignLeftOutlined />,
      children: [
        {
          label: 
          <a href="/list" >
            All my marks
          </a>
        },
       
        {
          label: 
          <a  href="/my_subjects">
             All my subjects
          </a>
        },
        
      ],
    },
    {
      label: (
        <a href="/create" >
          Create mark
        </a>
      ),
   
      key: 'createMark',
      icon: <PlusOutlined/>,
    },
    {
      label: 'Add...',
      key: 'SubMenu',
      icon: <FormOutlined />,
      children: [
        {
          label: 
          <a href="/professor/registration/student" >
            Create new student
          </a>
        },
       
        {
          label: 
          <a href="/create_subject" >
            Create new subject
          </a>
        },
        
      ],
    },
    {
      label: (
        <a  onClick={()=>{localStorage.clear();navigate("/login");setLogged(false)}}>
          log out
        </a>
      ),
   
      key: 'logout',
      icon:<LogoutOutlined />,
    },
  ];
  let navigate = useNavigate()
/** 
  return (
    <Flex justify="space-between" align='center' style={{ height: "100%", width: "90%" }} >
      <Flex onClick={()=>{navigate("/")}} align='center' style={{textAlign:"center", height:"100%"}}>
        <img style={{fontSize: '35px', marginRight:10, color:"#4A55A2", width:40, color:"#4870E0"}} src='/teacher.png'/>
        <h2 style={{color:"#4870E0"}}>ProfEase</h2>
      </Flex>

      <Flex>
      <Button  onClick={()=>{navigate("/create")}} type="primary" shape="round" size={"large"} style={{ backgroundColor: "#4A55A2", marginLeft: 10 }}>
          + Crear
        </Button>
        <Button onClick={()=>{navigate("/list")}} size={"large"} shape="round" type="text" style={{ marginLeft: 10 }}>
          <Flex justify="space-between" align='center' style={{ width: 60, height: "100%" }}>
            All marks
          </Flex>
        </Button>

        <Button type="text" shape="round" size={"large"} style={{ marginLeft: 10 }} onClick={()=>{localStorage.clear();navigate("/login")}}>
          Log out
        </Button>
      </Flex>
    </Flex>
  );
*/
const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
return <Menu style={{width:"100%"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuApiComponent;