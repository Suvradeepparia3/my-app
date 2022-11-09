export interface Customer {
  id: number;
  customerName: string;
  customerMobile: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDetails {
  id: number;
  orderSource: string;
  subTotal: string;
  deliveryFee: string;
  tax: string;
  tip: string;
  bonus: string;
  total: string;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryBoy {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  resetPassword: number;
  countryId: number;
  dateOfBirth?: any;
  address: string;
  city?: any;
  zipcode?: any;
  stateId: number;
  createdByUserId: number;
  emailVerified: number;
  mobileVerified: number;
  status: number;
  availableStatus: number;
  modeOfTransport: string;
  deviceId: string;
  profileImage: string;
  isDeleted: number;
  creationUserID?: any;
  modificationUserID: number;
  deletedAt?: any;
  deletionUserID?: any;
  latitude: string;
  longitude: string;
  maxNoOfOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Delivery {
  id: number;
  deliveryAddress: string;
  deliveryAddressBlock: string;
  deliveryLatitude: string;
  deliveryLongitude: string;
  estimatedDeliveryTime?: number;
  distance?: number;
  deliveryBoyId?: number;
  deliveryBoyEarning?: number;
  acceptedStatus?: number;
  isDeliveryOnTime?: number;
  assignedAt?: Date;
  deliveryAt?: Date;
  acceptedAt?: Date;
  pickedAt?: Date;
  reachedKitchenAt?: Date;
  cancelledAt?: Date;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
  DeliveryBoy: DeliveryBoy;
}

export interface RestaurantUserMap {
  id: number;
  userId: number;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Restaurant {
  id: number;
  restaurantName: string;
  address: string;
  stateID: number;
  stationId: number;
  zip: string;
  latitude: string;
  longitude: string;
  restaurantPhone: string;
  email: string;
  status: number;
  bonus: string;
  bonusStatus: number;
  minimumDistance: string;
  minimumEarning: string;
  additionalEarning: string;
  restaurantImage?: any;
  foodPrepTime: number;
  foodPrepBuffer: string;
  creationUserID?: any;
  modificationUserID: number;
  createdAt: Date;
  updatedAt: Date;
  restaurantUserMap: RestaurantUserMap[];
}

export interface Item {
  id: number;
  itemCount: string;
  itemName: string;
  itemPrice: string;
  itemDetailsId?: any;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  confirmationCode: string;
  order: string;
  orderPlacedOn: Date;
  deliveryType: string;
  totalItems: number;
  restaurantId: number;
  assignedStatus: string;
  isGrouped: string;
  isAutoAssigned: string;
  createdAt: Date;
  updatedAt: Date;
  orderStatus: string;
  orderType?: number;
  createdUserId?: number;
  Customer: Customer;
  OrderDetails: OrderDetails;
  Delivery: Delivery;
  Restaurant: Restaurant;
  Items: Item[];
}

export interface Data {
  orders: Order[];
  total_orders: number;
  limit: number;
}

export interface Error {}

export interface Meta {
  total: string;
}

export interface RootObject {
  status: number;
  data: Data;
  error: Error;
  info: string;
  meta: Meta;
  message: string;
}
export interface OrderFilter {
  search: string;
  kitchenName: string;
  selectedOrderStatus: string;
  selectedAssignedStatus: string;
  orderFromState: string;
  orderFieldState: string;
  orderSortState: string;
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
}
export interface OrderRes {
  Customer: Customer;
  OrderDetails: OrderDetails;
  DeliveryBoy: DeliveryBoy;
  Delivery: Delivery;
  RestaurantUserMap: RestaurantUserMap;
  Restaurant: Restaurant;
  Item: Item;
  orders: Order[];
  total_orders: number;
  limit: number;
  error: Error;
}
