import React, { useState } from 'react';
import { Button, Divider, Modal, Menu  } from 'antd';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { EditOutlined, PlusOutlined, UserOutlined,AlignLeftOutlined,LogoutOutlined } from '@ant-design/icons';
let MenuStudentApiComponent = (props) => {
    
  let { setLogged } = props
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('mail');
  let navigate = useNavigate()

  const logOut=()=>{
    localStorage.clear();
    navigate("/login");
    setLogged(false)
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
      label:(
        <a href="/my_marks" >
         My marks
        </a>
      ),
      key: 'marks',
      icon: <AlignLeftOutlined />
    },

    {
      label: (
        <a  onClick={()=>{setOpen(true)}}>log out </a>
      ),
   
      key: 'logout',
      icon:<LogoutOutlined />,
      style: { marginLeft: 'auto' },  
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

export default MenuStudentApiComponent;