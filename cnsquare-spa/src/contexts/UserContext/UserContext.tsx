import { createContext, useEffect, useState } from "react";
import cnAxios from "../../utils/cn-axios";

const UserContext = createContext<TUserContext>({
  user: { id: null, accessToken: null },
  userInfo: null,
  cart: null,
  updateUser: () => {},
  removeUser: () => {},
  setUserInfo: () => {},
  setCartInfo: () => {},
});

function UserContextProvider(props) {
  const [user, setUser] = useState<TUserContext>({
    user: { id: null, accessToken: null },
    userInfo: null,
    cart: null,
    updateUser: () => {},
    removeUser: () => {},
    setUserInfo: () => {},
    setCartInfo: () => {},
  });
  const [userId, setUserId] = useState<string | null>(
    window.localStorage.getItem("userId")
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    window.localStorage.getItem("token")
  );
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[] | null>(
    JSON.parse(window.localStorage.getItem("cart") as string)
  );

  const updateUser = (u: UserLoginInfo) => {
    setUserId(u.id);
    setAccessToken(u.accessToken);
    window.localStorage.setItem("userId", u.id as string);
    window.localStorage.setItem("token", u.accessToken as string);
  };

  const removeUser = () => {
    setUserId(null);
    setAccessToken(null);
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
  };

  const setCartInfo = (c: CartItem[] | null) => {
    setCart(c);
  };

  useEffect(() => {
    if (userId !== null) {
      cnAxios.get(`/users/${userId}`).then((res) => setUserInfo(res.data));
    } else {
      setUserInfo(null);
    }
  }, [userId]);

  useEffect(() => {
    setUser({
      user: { id: userId, accessToken: accessToken },
      userInfo,
      cart,
      updateUser,
      removeUser,
      setUserInfo,
      setCartInfo,
    });
  }, [userId, accessToken, cart, userInfo]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
