import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutSubmit } from "../Redux/Action";
import { Button } from "antd";
import { AppDispatch, RootState } from "../Redux/Store";

function Header(props: HeaderProps) {
  const token = localStorage.getItem("token");

  return (
    <div>
      <nav className="header">
        {props.token || token ? (
          <div>
            <div className="header-item">
              <Link to="/">
                <Button
                  type="primary"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("expiresIn");
                    props.logOutcall(token!);
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

interface HeaderProps {
  token: string | undefined;
  logOutcall: (token: string | undefined) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    token: state.tokens.token,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    logOutcall: (token: any) => dispatch(logOutSubmit(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
