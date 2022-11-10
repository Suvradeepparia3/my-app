import React, { useEffect } from "react";
import { Descriptions } from "antd";
import { connect } from "react-redux";
import { userFetch } from "../Redux/Action";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { AppDispatch, RootState } from "../Redux/Store";
import { UserDetails } from "../Modals/userDetailsModal";

function Profile(props: ProfileProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    !!token && props.userFetch();
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
      {props.user ? (
        <>
          <Descriptions title="User Info">
            <Descriptions.Item label="UserName">
              {props.user?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Telephone">
              {props.user?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {props.user?.email}
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

interface ProfileProps {
  user: UserDetails;
  userFetch: () => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.userDetails,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    userFetch: () => dispatch(userFetch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
