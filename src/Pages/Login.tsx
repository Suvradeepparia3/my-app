import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { Col, Row } from "antd";
import { logInSubmit } from "../Redux/Action";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

function Login(props: any) {
  const onFinish = (values: any) => {
    props.logIncall(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const call = () => {
      if (token) {
        return <>{navigate("/dashboard")}</>;
      }
    };
    call();
  }, [token, navigate]);

  return (
    <div className="content">
      <h1>Log In</h1>
      <Row>
        <Col span={12} offset={5}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Please input your username!" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Please input your password!" />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              style={{ marginRight: "12%" }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <div style={{ marginTop: "10px" }}>
                {props.tokens?.loading ? <Spin /> : null}
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    tokens: state.tokens,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    logIncall: (values: any) => dispatch(logInSubmit(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
