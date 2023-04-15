type UserLoginInfo = {
  id: null | string;
  accessToken: null | string;
};
type TUserContext = {
  user: UserLoginInfo;
  updateUser: (u: UserLoginInfo) => void;
  removeUser: () => void;
};
