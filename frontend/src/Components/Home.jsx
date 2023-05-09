import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Row, Table, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import following from "../following.json";
const { Title, Text } = Typography;

const data = [
  {
    name: 'Not Submitted',
    accounts: 1,
    fill: "#8884d8"
  },
  {
    name: 'Sports',
    accounts: 3,
    fill: "#dd0033"
  },
  {
    name: 'Crypto',
    accounts: 2,
    fill: "#333"
  },
  
];

const Home = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const _userData = JSON.parse(localStorage.getItem("data"))
    try {
      let a = _userData.username;
      setUserData(_userData);
    setIsMounted(true);
    } catch(e){
      console.log(e)
      window.location.href = '/'
    }
    
  }, []);

  if (!isMounted) return <></>;
  return (
    <div style={{padding: 8}}>
      <Row>
        <Col style={{flex: 2}}>
          <Title>
            Welcome,{" "}
            
            {userData.displayName}!
          </Title>
        </Col>
        <Col><Button onClick={()=>{
          localStorage.setItem("data", null)
          window.location.href = '/'
        }}>Log out</Button></Col>
      </Row>
      <Row style={{ alignItems: "center" }}>
      <Avatar
              size={42}
              src={(userData?.photos || [{}])[0].value}
              icon={<UserOutlined />}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
        <Text style={{ fontSize: 16 }}>@{userData.username}</Text>
        <a href={`https://twitter.com/${userData.username}`}>
          <Button style={{ marginLeft: 8 }} size="small">View Twitter Profile</Button>
        </a>
      </Row>
      <div style={{width: 1000, height: 400, marginTop: 24, marginBottom: 24}}>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="accounts" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <Row style={{justifyContent: "flex-end", marginBottom: 8}}>
        <Button type="primary">Submit</Button>
      </Row>
      <Table
        dataSource={following}
        pagination={false}
        columns={[
          {
            title: "Username",
            dataIndex: "Username",
            key: "Username",
            render: (link)=><a href={`https://twitter.com/${link}`}>{link}</a>
          },
          {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
          },
          {
            title: "Label",
            dataIndex: "Username",
            key: "Label",
            render: ()=><Tag>Not Submitted</Tag>,
          },
        ]}
      />
    </div>
  );
};

export default Home;
