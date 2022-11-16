import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import { logInSubmit } from "../Redux/Action";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { AppDispatch, RootState } from "../Redux/Store";
import { useForm } from "react-hook-form";

function Login(props: LoginProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userCredProps>();

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

  const logIn = (userCred: userCredProps) => {
    let values = {
      password: userCred.password,
      username: userCred.email,
    };
    props.logIncall(values);
  };

  return (
    <div className="content">
      <h1>Log In</h1>
      <Row>
        <Col span={12} offset={5}>
          <form onSubmit={handleSubmit(logIn)}>
            <div className="input">
              <label htmlFor="name" className="lebelName">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                className="inputBox"
                name="email"
                id="email"
                type="email"
                placeholder="Your Email"
                autoComplete="off"
              />
              <br />
              {errors.email && "Email is required"}
            </div>

            <div className="input">
              <label htmlFor="email" className="lebelName">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                className="inputBox ml"
                name="password"
                id="password"
                type="password"
                autoComplete="off"
                placeholder="Your Password"
              />
              <p>{errors.password && "Password is required"}</p>
            </div>

            <div className="flex justify-end border-t mt-3 pt-5">
              <button className="button">Log In</button>
              <div style={{ marginTop: "10px" }}>
                {props.loading ? <Spin /> : null}
              </div>
              <div style={{ marginTop: "10px", color: "red" }}>
                {!props.loading && props.error ? <p>{props.error}</p> : null}
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}

interface ValueProps {
  password: string;
  username: string;
}
interface userCredProps {
  password: string;
  email: string;
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
