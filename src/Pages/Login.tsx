import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { Col, Row } from "antd";
import { logInSubmit } from "../Redux/Action";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { AppDispatch, RootState } from "../Redux/Store";

function Login(props: LoginProps) {
  const onFinish = (values: ValueProps) => {
    props.logIncall(values);
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
                {props.loading ? <Spin /> : null}
              </div>
              <div style={{ marginTop: "10px", color: "red" }}>
                {!props.loading && props.error ? <p>{props.error}</p> : null}
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

interface ValueProps {
  password: string;
  username: string;
}

interface LoginProps {
  loading: boolean;
  token: undefined | string;
  error: undefined;
  logIncall: (values: ValueProps) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    token: state.tokens.token,
    loading: state.tokens.loading,
    error: state.tokens.error,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    logIncall: (values: ValueProps) => dispatch(logInSubmit(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
