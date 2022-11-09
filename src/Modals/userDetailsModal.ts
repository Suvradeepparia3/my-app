export interface Privileges {
  id: number;
  name: string;
  slug: string;
  icon: string;
  status: number;
  isDeleted: number;
  order?: number;
  createdAt: Date;
  creationUserID?: number;
  modificationAt: Date;
  modificationUserID?: number;
  deletedAt?: any;
  deletionUserID?: any;
}

export interface RolePrivilegeMap {
  id: number;
  status: number;
  isDeleted: number;
  createdAt: Date;
  creationUserID?: any;
  modificationAt: Date;
  modificationUserID?: any;
  deletedAt?: any;
  deletionUserID?: any;
  Privileges: Privileges;
}

export interface RoleDetails {
  id: number;
  name: string;
  slug: string;
  status: number;
  type: number;
  isDeleted: number;
  creationUserID?: any;
  modificationUserID?: any;
  deletedAt?: any;
  deletionUserID?: any;
  createdAt: Date;
  updatedAt: Date;
  RolePrivilegeMaps: RolePrivilegeMap[];
}

export interface UserRoleMaps {
  id: number;
  userID: number;
  roleID: number;
  status: number;
  createdAt: Date;
  creationUserID?: any;
  modificationAt: Date;
  modificationUserID?: any;
  deletedAt?: any;
  deletionUserID?: any;
  roleDetails: RoleDetails;
}

export interface RestaurantDetails {
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
  restaurantImage: string;
  foodPrepTime: number;
  foodPrepBuffer: string;
  creationUserID?: number;
  modificationUserID?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantUserMap {
  id: number;
  userId: number;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
  restaurantDetails: RestaurantDetails;
}

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobile: string;
  resetPassword: number;
  countryId: number;
  dateOfBirth?: any;
  address?: any;
  city?: any;
  zipcode?: any;
  stateId?: any;
  createdByUserId?: any;
  emailVerified: number;
  mobileVerified: number;
  status: number;
  availableStatus: number;
  modeOfTransport: string;
  deviceId?: any;
  profileImage?: any;
  isDeleted: number;
  creationUserID?: any;
  modificationUserID: number;
  deletedAt?: any;
  deletionUserID?: any;
  latitude: string;
  longitude: string;
  maxNoOfOrder?: any;
  createdAt: Date;
  updatedAt: Date;
  userRoleMaps: UserRoleMaps;
  restaurantUserMap: RestaurantUserMap[];
}
