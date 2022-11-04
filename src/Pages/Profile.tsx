import React, { useEffect } from "react";
import { Descriptions } from "antd";
import { connect } from "react-redux";
import { userFetch } from "../Redux/Action";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

function Profile(props: any) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    props.userFetch(token);
    const call = () => {
      if (token === null) {
        return <>{navigate("/login")}</>;
      }
    };
    call();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.user.userDetails ? (
        <>
          <Descriptions title="User Info">
            <Descriptions.Item label="UserName">
              {props.user.userDetails?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Telephone">
              {props.user.userDetails?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {props.user.userDetails?.email}
            </Descriptions.Item>

            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    userFetch: (token: any) => dispatch(userFetch(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
