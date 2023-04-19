type UserLoginInfo = {
  id: null | string;
  accessToken: null | string;
};
type TUserContext = {
  user: UserLoginInfo;
  userInfo: User | null;
  cart: CartItem[] | null;
  updateUser: (u: UserLoginInfo) => void;
  removeUser: () => void;
  setUserInfo: (u: User | null) => void;
  setCartInfo: (c: CartItem[] | null) => void;
};
