import React, { useState, useEffect } from "react";
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
import { OrderRes } from "../Modals/orderResModal";
import { AppDispatch, RootState } from "../Redux/Store";

const Dashboard = (props: DashboardProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [kitchenName, setKichenName] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [selectedAssignedStatus, setSelectedAssignedStatus] = useState("");
  const [orderFromState, setOrderFromState] = useState("");
  const [orderFieldState, setOrderFieldState] = useState("");
  const [orderSortState, setOrderSortState] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allFilterUrl, setAllFilterUrl] = useState("");

  useEffect(() => {
    const call = () => {
      if (token === null) {
        return <>{navigate("/login")}</>;
      }
    };
    call();
  }, [token, navigate]);

  useEffect(() => {
    if (!!token) props.orderFetch(token);
  }, []);

  useEffect(() => {
    let searchUrl;
    if (search !== "") {
      searchUrl = `&search=${search}`;
    } else {
      searchUrl = "";
    }
    let kitchenNameUrl;
    if (kitchenName !== "") {
      kitchenNameUrl = `&kitchenName=${kitchenName}`;
    } else {
      kitchenNameUrl = "";
    }
    let orderStatusUrl;
    if (selectedOrderStatus !== "") {
      orderStatusUrl = `&orderStatus=${selectedOrderStatus}`;
    } else {
      orderStatusUrl = "";
    }
    let assignedStatusUrl;
    if (selectedAssignedStatus !== "") {
      assignedStatusUrl = `&assignedStatus=${selectedAssignedStatus}`;
    } else {
      assignedStatusUrl = "";
    }
    let orderFromStateUrl;
    if (orderFromState !== "") {
      orderFromStateUrl = `&orderSource=${orderFromState}`;
    } else {
      orderFromStateUrl = "";
    }
    let orderFieldStateUrl;
    if (orderFieldState !== "") {
      orderFieldStateUrl = `&field=${orderFieldState}`;
    } else {
      orderFieldStateUrl = "";
    }
    let orderSortStateUrl;
    if (orderSortState !== "") {
      orderSortStateUrl = `&sort=${orderSortState}`;
    } else {
      orderSortStateUrl = "";
    }
    let startDateUrl;
    if (startDate !== "") {
      startDateUrl = `&startDate=${startDate}`;
    } else {
      startDateUrl = "";
    }
    let endDateUrl;
    if (endDate !== "") {
      endDateUrl = `&endDate=${endDate}`;
    } else {
      endDateUrl = "";
    }
    setAllFilterUrl(
      searchUrl +
        kitchenNameUrl +
        orderStatusUrl +
        assignedStatusUrl +
        orderFromStateUrl +
        orderFieldStateUrl +
        orderSortStateUrl +
        startDateUrl +
        endDateUrl
    );
    setPage(1);
  }, [
    search,
    kitchenName,
    selectedOrderStatus,
    selectedAssignedStatus,
    orderFromState,
    orderFieldState,
    orderSortState,
    startDate,
    endDate,
  ]);

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
    setPage(selectedPage);
    setPageSize(selectedPageSize);
    !!token &&
      props.orderFetch(
        token,
        `page=${selectedPage}&limit=${selectedPageSize}` + allFilterUrl
      );
  };

  // All search
  const onSearch = () => {
    let urlWithPage = `page=${page}&limit=${pageSize}` + allFilterUrl;
    !!token && props.orderFetch(token, urlWithPage);
  };

  const onStartDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setStartDate(dateString);
  };
  const onEndDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setEndDate(dateString);
  };

  const listOfOrders = props?.orders?.orders;
  console.log(props.orders);
  return (
    <div className="dasboardContent">
      <h1>Orders</h1>
      <Input
        style={{
          width: "80%",
          marginTop: "1%",
        }}
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
        Search
      </Button>
      {props.loading === true ? <Spin /> : null}
      {props.loading === false &&
        listOfOrders.map((order: any) => (
          <div
            style={{
              padding: "4% 10% 0% 10%",
            }}
            key={order.id}
          >
            <Descriptions
              //title="Orders"
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
  orderFetch: (token: string, filter?: string | undefined) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    orderFetch: (token: any, filter?: string) =>
      dispatch(fetchOrders(token, filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
