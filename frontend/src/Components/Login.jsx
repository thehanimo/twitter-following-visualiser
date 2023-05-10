import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Row, Table, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import following from "../following.json";
import twitterBG from "./twitter-hero.jpg";
const { Title, Text } = Typography;

const Login = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("data")));
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;
  return (
    <div>
      <img
        src={twitterBG}
        style={{
          zIndex: -1,
          width: "100%",
          position: "absolute",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card style={{ width: 500 }}>
          <Row>
            <Title style={{ fontSize: 32 }}>Twitter Following Visualizer</Title>
          </Row>
          <Row>
            <Text style={{ fontSize: 16 }}>
              Visualize the accounts you follow as categories.
            </Text>
          </Row>
          <Row>
            <Text style={{ fontSize: 16, marginTop: 8 }}>
              Use this to mass unfollow categories that no longer interest you.
            </Text>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <a href="http://localhost:8000/auth/twitter/">
              <Button size="large" style={{ borderRadius: 1000 }}>
                Log in with Twitter
              </Button>
            </a>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Login;
