import React, { useState } from 'react';
import { Button, Divider, Flex, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

let MenuApiComponent = () => {

  let navigate = useNavigate()

  return (
    <Flex justify="space-between" align='center' style={{ height: "100%", width: "90%" }} >
      <Flex onClick={()=>{navigate("/")}} align='center' style={{textAlign:"center", height:"100%"}}>
        <img style={{fontSize: '35px', marginRight:10, color:"#4A55A2", width:40, color:"#4870E0"}} src='/teacher.png'/>
        <h2 style={{color:"#4870E0"}}>ProfEase</h2>
      </Flex>

      <Flex>
        <Button size={"large"} shape="round" type="text" style={{ marginLeft: 10 }}>
          <Flex justify="space-between" align='center' style={{ width: 60, height: "100%" }}>
            All marks
          </Flex>
        </Button>

        <Button type="primary" shape="round" size={"large"} style={{ backgroundColor: "#4A55A2", marginLeft: 10 }}>
          + Crear
        </Button>
       
      </Flex>
    </Flex>
  );
};

export default MenuApiComponent;