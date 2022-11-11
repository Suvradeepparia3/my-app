import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrders } from "../Redux/Action";
import {
  Descriptions,
  Pagination,
  Spin,
  Input,
  Dropdown,
  Menu,
  Space,
  Button,
  DatePicker,
  DatePickerProps,
} from "antd";
import { Order, OrderFilter, OrderRes } from "../Modals/orderResModal";
import { AppDispatch, RootState } from "../Redux/Store";

const Dashboard = (props: DashboardProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [kitchenName, setKichenName] = useState<string>("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [selectedAssignedStatus, setSelectedAssignedStatus] = useState("");
  const [orderFromState, setOrderFromState] = useState("");
  const [orderFieldState, setOrderFieldState] = useState("");
  const [orderSortState, setOrderSortState] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const initialRender = useRef(true);

  useEffect(() => {
    const call = () => {
      if (token === null) {
        return <>{navigate("/login")}</>;
      }
    };
    call();
  }, [token, navigate]);

  useEffect(() => {
    !!token &&
      props.orderFetch({
        search: search,
        kitchenName: kitchenName,
        selectedOrderStatus: selectedOrderStatus,
        selectedAssignedStatus: selectedAssignedStatus,
        orderFromState: orderFromState,
        orderFieldState: orderFieldState,
        orderSortState: orderSortState,
        startDate: startDate,
        endDate: endDate,
        page: 1,
        pageSize: 10,
      });
  }, [
    selectedOrderStatus,
    selectedAssignedStatus,
    orderFromState,
    orderFieldState,
    orderSortState,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    // this logic for prevent initial render from this useeffect
    if (
      search !== "" ||
      kitchenName !== "" ||
      initialRender.current === false
    ) {
      const timeOut = setTimeout(() => {
        !!token &&
          props.orderFetch({
            search: search,
            kitchenName: kitchenName,
            selectedOrderStatus: selectedOrderStatus,
            selectedAssignedStatus: selectedAssignedStatus,
            orderFromState: orderFromState,
            orderFieldState: orderFieldState,
            orderSortState: orderSortState,
            startDate: startDate,
            endDate: endDate,
            page: 1,
            pageSize: 10,
          });
      }, 1000);
      return () => clearTimeout(timeOut);
    } else {
      initialRender.current = false;
    }
  }, [search, kitchenName]);

  // For Order
  const selectedOrder = (value: string) => {
    setSelectedOrderStatus(value);
  };
  const orderStatus = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrder("received")}
            >
              Recived
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrder("in-progress")}
            >
              In-Progress
            </button>
          ),
        },
        {
          key: "3",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrder("reached-kitchen")}
            >
              Reached-Kitchen
            </button>
          ),
        },
        {
          key: "4",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrder("on-the-way")}
            >
              On-the-Way
            </button>
          ),
        },
        {
          key: "5",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrder("delivered")}
            >
              Deliverd
            </button>
          ),
        },
        {
          key: "6",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrder("cancelled")}
            >
              Cancelled
            </button>
          ),
        },
        {
          key: "7",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrder("")}
            >
              Clear
            </button>
          ),
        },
      ]}
    />
  );

  // For Status
  const selectedStatus = (value: string) => {
    setSelectedAssignedStatus(value);
  };
  const assignedStatus = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedStatus("assigned")}
            >
              Assigned
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedStatus("un-assigned")}
            >
              Un-Assigned
            </button>
          ),
        },
        {
          key: "3",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedStatus("")}
            >
              Clear
            </button>
          ),
        },
      ]}
    />
  );

  // For Order From
  const selectedOrderFrom = (value: string) => {
    setOrderFromState(value);
  };
  const orderFrom = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderFrom("UBER EATS")}
            >
              UBER EATS
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderFrom("DOORDASH")}
            >
              DOORDASH
            </button>
          ),
        },
        {
          key: "3",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderFrom("DELIVERY")}
            >
              DELIVERY
            </button>
          ),
        },
        {
          key: "4",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderFrom("CLUB FEAST")}
            >
              CLUB FEAST
            </button>
          ),
        },
        {
          key: "5",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderFrom("GRUBHUB")}
            >
              GRUBHUB
            </button>
          ),
        },
        {
          key: "6",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderFrom("LUNCHBOX")}
            >
              LUNCHBOX
            </button>
          ),
        },
        {
          key: "7",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderFrom("")}
            >
              Clear
            </button>
          ),
        },
      ]}
    />
  );

  // For order field
  const selectedOrderOfField = (value: string) => {
    setOrderFieldState(value);
  };
  const orderOfField = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderOfField("createdAt")}
            >
              CreatedAt
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderOfField("assignedTo")}
            >
              AssignedTo
            </button>
          ),
        },
        {
          key: "3",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderOfField("orderStatus")}
            >
              Order Status
            </button>
          ),
        },
        {
          key: "4",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderOfField("deliveryTime")}
            >
              Delivery Time
            </button>
          ),
        },
        {
          key: "5",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderOfField("orderSource")}
            >
              Order Source
            </button>
          ),
        },
        {
          key: "6",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderOfField("")}
            >
              Clear
            </button>
          ),
        },
      ]}
    />
  );

  // For Sort
  const selectedOrderSort = (value: string) => {
    setOrderSortState(value);
  };
  const orderSorting = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderSort("ASC")}
            >
              Asc
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderSort("DESC")}
            >
              Desc
            </button>
          ),
        },
        {
          key: "3",
          label: (
            <button
              style={{
                outline: "none",
                background: "transparent",
                border: "none",
              }}
              onClick={() => selectedOrderSort("")}
            >
              Clear
            </button>
          ),
        },
      ]}
    />
  );

  // For Pagination
  const onChange = (selectedPage: number, selectedPageSize: number) => {
    !!token &&
      props.orderFetch({
        search: search,
        kitchenName: kitchenName,
        selectedOrderStatus: selectedOrderStatus,
        selectedAssignedStatus: selectedAssignedStatus,
        orderFromState: orderFromState,
        orderFieldState: orderFieldState,
        orderSortState: orderSortState,
        startDate: startDate,
        endDate: endDate,
        page: selectedPage,
        pageSize: selectedPageSize,
      });
  };

  // All search
  const onSearch = () => {
    !!token &&
      props.orderFetch({
        search: search,
        kitchenName: kitchenName,
        selectedOrderStatus: selectedOrderStatus,
        selectedAssignedStatus: selectedAssignedStatus,
        orderFromState: orderFromState,
        orderFieldState: orderFieldState,
        orderSortState: orderSortState,
        startDate: startDate,
        endDate: endDate,
        page: 1,
        pageSize: 10,
      });
  };

  // All clear
  const clear = () => {
    setSearch("");
    setKichenName("");
    setSelectedOrderStatus("");
    setSelectedAssignedStatus("");
    setOrderFromState("");
    setOrderFieldState("");
    setOrderSortState("");
    setStartDate("");
    setEndDate("");
  };

  const onStartDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setStartDate(dateString);
  };
  const onEndDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setEndDate(dateString);
  };

  const listOfOrders = props?.orders?.orders;

  return (
    <div className="dasboardContent">
      <h1>Orders</h1>
      <Input
        style={{
          width: "80%",
          marginTop: "1%",
        }}
        value={search}
        placeholder="You can search the record with the following values: Bill Number, Assigned User Name"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setSearch(ev.target.value)
        }
      />
      <Input
        style={{
          width: "80%",
          marginTop: "1%",
        }}
        value={kitchenName}
        placeholder="You can filter the record with the kitchen names"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setKichenName(ev.target.value)
        }
      />
      <div style={{ display: "flex", marginLeft: "10%" }}>
        {" "}
        <div
          style={{
            padding: "2% 0% 0% 0%",
            cursor: "pointer",
            color: "blue",
          }}
        >
          <Dropdown overlay={orderStatus}>
            <Space>Order Status</Space>
          </Dropdown>{" "}
          <br />
          <p style={{ color: "black" }}>{selectedOrderStatus}</p>
        </div>
        <div
          style={{
            padding: "2% 0% 0% 10%",
            cursor: "pointer",
            color: "blue",
          }}
        >
          <Dropdown overlay={assignedStatus}>
            <Space>Assigned Status</Space>
          </Dropdown>
          <p style={{ color: "black" }}>{selectedAssignedStatus}</p>
        </div>
        <div
          style={{
            padding: "2% 0% 0% 10%",
            cursor: "pointer",
            color: "blue",
          }}
        >
          <Dropdown overlay={orderFrom}>
            <Space>Order From</Space>
          </Dropdown>
          <p style={{ color: "black" }}>{orderFromState}</p>
        </div>
        <div
          style={{
            padding: "2% 0% 0% 10%",
            cursor: "pointer",
            color: "blue",
          }}
        >
          <Dropdown overlay={orderOfField}>
            <Space>Order of Field</Space>
          </Dropdown>
          <p style={{ color: "black" }}>{orderFieldState}</p>
        </div>
        <div
          style={{
            padding: "2% 10% 0% 10%",
            cursor: "pointer",
            color: "blue",
          }}
        >
          <Dropdown overlay={orderSorting}>
            <Space>Order of Sorting</Space>
          </Dropdown>
          <p style={{ color: "black" }}>{orderSortState}</p>
        </div>
      </div>
      <DatePicker onChange={onStartDateChange} />
      <DatePicker onChange={onEndDateChange} />
      <br /> <br />
      <Button type="primary" onClick={onSearch}>
        {" "}
        Submit
      </Button>
      <Button type="primary" onClick={clear}>
        {" "}
        Clear
      </Button>
      {props.loading === true ? <Spin /> : null}
      {props.loading === false &&
        listOfOrders?.map((order: Order) => (
          <div
            style={{
              padding: "4% 10% 0% 10%",
            }}
            key={order.id}
          >
            <Descriptions
              bordered
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Order Number">
                {order.id}
              </Descriptions.Item>
              <Descriptions.Item label="Customer Name">
                {order.Customer?.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Boy">
                {order.Delivery.DeliveryBoy?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Order Items">
                {order?.Items[0]?.itemName} & More ..
              </Descriptions.Item>
              <Descriptions.Item label="Order Details">
                {order.OrderDetails.orderSource}
              </Descriptions.Item>
              <Descriptions.Item label="Resturant">
                {order.Restaurant.restaurantName}
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Type">
                {order.deliveryType}
              </Descriptions.Item>
              <Descriptions.Item label="Order Status">
                {order.orderStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Bill Number">
                {order.order}
              </Descriptions.Item>
            </Descriptions>
            <br />
          </div>
        ))}
      <Pagination
        onChange={onChange}
        defaultCurrent={1}
        total={props?.orders?.total_orders}
      />{" "}
      <br />
    </div>
  );
};

interface DashboardProps {
  loading: boolean;
  orders: OrderRes;
  orderFetch: (UrlObj?: OrderFilter) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    orderFetch: (UrlObj?: OrderFilter | undefined) =>
      dispatch(fetchOrders(UrlObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
