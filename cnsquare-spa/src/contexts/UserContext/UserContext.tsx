import { createContext, useState } from "react";

const UserContext = createContext<TUserContext>({
  user: { id: null, accessToken: null },
  updateUser: () => {},
  removeUser: () => {},
});

function UserContextProvider(props) {
  const userId = window.localStorage.getItem("userId");
  const accessToken = window.localStorage.getItem("token");

  const updateUser = (u: UserLoginInfo) => {
    setUser({ ...user, user: u });
    window.localStorage.setItem("userId", u.id as string);
    window.localStorage.setItem("token", u.accessToken as string);
  };

  const removeUser = () => {
    setUser({ ...user, user: { id: null, accessToken: null } });
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
  };

  const [user, setUser] = useState<TUserContext>({
    user: { id: userId, accessToken: accessToken },
    updateUser: updateUser,
    removeUser: removeUser,
  });

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
