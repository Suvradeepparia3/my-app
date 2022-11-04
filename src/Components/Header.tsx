import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutSubmit } from "../Redux/Action";
import { Button } from "antd";

function Header(props: any) {
  const token = localStorage.getItem("token");

  return (
    <div>
      <nav className="header">
        {props.tokens?.token || token ? (
          <div>
            <div className="header-item">
              <Link to="/">
                <Button
                  type="primary"
                  onClick={() => {
                    localStorage.removeItem("token");
                    props.logOutcall(token);
                  }}
                >
                  {" "}
                  Log Out
                </Button>
              </Link>
            </div>
            <div className="header-item">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="header-item">
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
        ) : (
          <div className="header-item">
            <Link to="/login">
              <Button type="primary">Log In</Button>
            </Link>
          </div>
        )}
      </nav>
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
    logOutcall: (token: any) => dispatch(logOutSubmit(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
