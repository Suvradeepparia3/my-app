import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrders } from "../Redux/Action";
import { Spin } from "antd";

function Dashboard(props: any) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const call = () => {
      if (token === null) {
        return <>{navigate("/login")}</>;
      }
    };
    call();
  }, [token, navigate]);

  useEffect(() => {
    props.orderFetch(token);
  }, []);

  const listOfOrders = props?.orders?.orders?.orders;
  return (
    <div className="dasboardContent">
      <h1>Dashboard</h1>
      {!listOfOrders ? <Spin /> : null}
      {listOfOrders &&
        listOfOrders.map((order: any) => (
          <div key={order.id}>
            Customer name: {order.Customer?.customerName}
            Delivery Boy: {order.Delivery.DeliveryBoy?.fullName}
          </div>
        ))}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { orders: state.orders };
};

const mapDispatchToProps = (dispatch: any) => {
  return { orderFetch: (token: any) => dispatch(fetchOrders(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
