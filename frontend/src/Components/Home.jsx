import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Modal, Row, Table, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import ButtonGroup from "antd/es/button/button-group";
const { Title, Text } = Typography;

const data = [
  {
    name: "Not Submitted",
    accounts: 1,
    fill: "#8884d8",
  },
  {
    name: "Sports",
    accounts: 3,
    fill: "#dd0033",
  },
  {
    name: "Crypto",
    accounts: 2,
    fill: "#333",
  },
];

const Home = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [followData, setFollowData] = useState([]);
  const [showTweets, setShowTweets] = useState([]);

  const getChartData = () => {
    const labels = {
    };
    for (let i = 0; i < followData.length; i += 1) {
      const rec = followData[i];
      if (rec.tweets.some((t) => t.label === "Pending")) {
        if (labels["Pending"])
        labels["Pending"] += 1
        else labels["Pending"] = 1
      }
      else if (rec.tweets.some((t) => t.label === undefined)){
        if (labels["Not Submitted"])
        labels["Not Submitted"] += 1
        else labels["Not Submitted"] = 1
      }
      else{
        
        let max = 0;
        let out = null;
        const temp = {};
        for (let j = 0; j < rec.tweets.length; j += 1) {
          let label = rec.tweets[j].tags[0];
          if (temp[label]) {
            temp[label] += 1;
          } else {
            temp[label] = 1;
          }
          if (max < temp[label]) {
            max = temp[label];
            out = label;
          }
        }
        if (labels[out]){
          labels[out] += 1
        } else labels[out] = 1
      }
    }
    return Object.keys(labels).map(x=>({
      name: x,
      accounts: labels[x],
      fill: "#dd0033",
    }))
  };

  useEffect(() => {
    const _userData = JSON.parse(localStorage.getItem("data"));
    try {
      let a = _userData.username;
      setUserData(_userData);
      setIsMounted(true);
    } catch (e) {
      console.log(e);
      window.location.href = "/";
    }
  }, []);

  const fetchData = async () => {
    const {
      data: { data },
    } = await axios.get(
      `http://localhost:8000/random?username=${userData.username}`
    );
    const { data: followData } = await axios.post(
      "http://127.0.0.1:5000/getTags",
      data
    );
    setFollowData(followData);
  };

  const submitData = async () => {
    await axios.post("http://127.0.0.1:5000/addData", followData);
  };

  const triggerClassifier = async () => {
    await axios.get("http://127.0.0.1:5000/triggerHadoop");
  };

  const getTags = async () => {
    const { data } = await axios.post(
      "http://127.0.0.1:5000/getTags",
      followData
    );
    setFollowData(data);
  };

  useEffect(() => {
    if (userData?.username) {
      fetchData();
    }
  }, [userData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!isMounted) return <></>;
  return (
    <div style={{ padding: 8 }}>
      <Row>
        <Col style={{ flex: 2 }}>
          <Title>Welcome, {userData.displayName}!</Title>
        </Col>
        <Col>
          <Button
            onClick={() => {
              localStorage.setItem("data", null);
              window.location.href = "/";
            }}
          >
            Log out
          </Button>
        </Col>
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
          <Button style={{ marginLeft: 8 }} size="small">
            View Twitter Profile
          </Button>
        </a>
      </Row>
      <div style={{width: "calc(100vw - 24px)", overflow: "scroll"}}>
      <div
        style={{ width: 210 * getChartData().length, height: 400, marginTop: 24, marginBottom: 24 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={1000}
            height={300}
            data={getChartData()}
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
      </div>
      <Row style={{ justifyContent: "flex-end", marginBottom: 8 }}>
        <ButtonGroup>
      <Button onClick={triggerClassifier}>
          Trigger Classifier
        </Button><Button onClick={getTags}>
          Refresh
        </Button>
        <Button type="primary" onClick={submitData}>
          Submit
        </Button>
        </ButtonGroup>
      </Row>
      <Table
        dataSource={followData}
        pagination={false}
        columns={[
          {
            title: "Username",
            dataIndex: "username",
            key: "username",
            render: (link, rec, idx) => (
              <div>
                <a href={`https://twitter.com/${link}`}>@{link}</a>
                <Button
                  size="small"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    console.log(data, rec, idx);
                    setShowTweets(rec.tweets.map((x) => ({ text: x })));
                    showModal();
                  }}
                >
                  View Tweets
                </Button>
              </div>
            ),
          },
          {
            title: "Label",
            dataIndex: "Username",
            key: "label",
            render: (_, rec) => {
              if (rec.tweets.some((t) => t.label === "Pending"))
                return <Tag>Pending</Tag>;
              else if (rec.tweets.some((t) => t.label === undefined))
                return <Tag>Not Submitted</Tag>;
              let max = 0;
              let out = null;
              const temp = {};
              for (let i = 0; i < rec.tweets.length; i += 1) {
                let label = rec.tweets[i].tags[0];
                if (temp[label]) {
                  temp[label] += 1;
                } else {
                  temp[label] = 1;
                }
                if (max < temp[label]) {
                  max = temp[label];
                  out = label;
                }
              }
              return <Tag>{out}</Tag>;
            },
          },
        ]}
      />
      <Modal
        title="View Tweets"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          dataSource={showTweets}
          pagination={false}
          columns={[
            {
              title: "Tweet",
              dataIndex: "text",
              key: "text",
              render: (_, rec) => {
                return rec.text.text;
              },
            },
            {
              title: "Label",
              dataIndex: "label",
              key: "label",
              render: (_, rec) => {
                console.log(rec);
                return (
                  rec.text.tags?.map((tag) => <Tag>{tag}</Tag>) || (
                    <Tag>{rec.text.label}</Tag>
                  )
                );
              },
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Home;
