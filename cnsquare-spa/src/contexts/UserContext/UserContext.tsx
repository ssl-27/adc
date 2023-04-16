import { createContext, useState } from "react";
import cnAxios from "../../utils/cn-axios";

const UserContext = createContext<TUserContext>({
  user: { id: null, accessToken: null },
  userInfo: null,
  updateUser: () => {},
  removeUser: () => {},
  pullUserInfo: () => {},
});

function UserContextProvider(props) {
  const userId = window.localStorage.getItem("userId");
  const accessToken = window.localStorage.getItem("token");
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo") as string);

  const updateUser = (u: UserLoginInfo) => {
    if (u.id !== null) {
      cnAxios.get(`/users/${u.id}`).then((res) => {
        setUser({ ...user, user: u, userInfo: res.data });
        window.localStorage.setItem("userInfo", JSON.stringify(res.data));
      });
    } else {
      setUser({ ...user, user: u });
    }
    window.localStorage.setItem("userId", u.id as string);
    window.localStorage.setItem("token", u.accessToken as string);
  };

  const removeUser = () => {
    setUser({
      ...user,
      user: { id: null, accessToken: null },
      userInfo: null,
    });
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userInfo");
  };

  const pullUserInfo = () => {
    if (userId !== null) {
      cnAxios.get(`/users/${userId}`).then((res) => {
        setUser({ ...user, userInfo: res.data });
        window.localStorage.setItem("userInfo", JSON.stringify(res.data));
      });
    }
  };

  const [user, setUser] = useState<TUserContext>({
    user: { id: userId, accessToken: accessToken },
    userInfo: userInfo,
    updateUser,
    removeUser,
    pullUserInfo,
  });

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
