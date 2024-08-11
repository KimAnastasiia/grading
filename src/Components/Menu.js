import React, { useState } from 'react';
import { Button, Divider, Flex, Typography } from 'antd';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
let MenuComponent = () => {
  const [size, setSize] = useState('large')
  const { Title } = Typography;
  let navigate = useNavigate()
  return (
    <Flex justify="space-between" align='center' style={{ height:"100%", width:"90%"}}>
      <Flex onClick={()=>{navigate("/")}} align='center' style={{textAlign:"center", height:"100%"}}>
        <img style={{fontSize: '35px', marginRight:10, color:"#4A55A2", width:40, color:"#4870E0"}} src='/teacher.png'/>
        <h2 style={{color:"#4870E0"}}>ProfEase</h2>
      </Flex>
      
      <Flex>

        <Button onClick={()=>{navigate("/login")}} type="primary" shape="round" size={size} style={{ backgroundColor:"#4870E0"}}>
          Iniciar sesion
        </Button>

      </Flex>
    </Flex>
  );
};

export default MenuComponent;