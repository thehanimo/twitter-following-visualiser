import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Row, Table, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import following from "../following.json";
const { Title, Text } = Typography;

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
