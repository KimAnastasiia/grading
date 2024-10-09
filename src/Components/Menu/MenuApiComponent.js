import React, { useState } from 'react';
import { Button, Divider, Modal, Menu  } from 'antd';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, PlusOutlined, FormOutlined,AlignLeftOutlined,LogoutOutlined } from '@ant-design/icons';
let MenuApiComponent = (props) => {
  let { setLogged } = props
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('mail');
  let navigate = useNavigate()

  const logOut=()=>{
    localStorage.clear();navigate("/login");setLogged(false)
    setOpen(false);
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const items = [
    {
      label: (
        <a href="/profile">
          Profile
        </a>
      ),
      key: 'profile',
      icon: <UserOutlined />
    },
    {
      label: "Data",
      key: 'data',
      icon: <AlignLeftOutlined />,
      children: [
        {
          label: 
          <a href="/marks" >
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
        <a  onClick={()=>{setOpen(true)}}>log out </a>
      ),
   
      key: 'logout',
      icon:<LogoutOutlined />,
    },
  ];

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

return(
<>      
  <Modal
    title="Logout"
    open={open}
    onOk={logOut}
    onCancel={handleCancel}
  >
    <p>Are you sure you want to log out of your account?</p>
  </Modal>
  <Menu style={{width:"100%"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
</> 
)
};

export default MenuApiComponent;