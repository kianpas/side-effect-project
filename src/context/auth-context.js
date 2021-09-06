import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //이펙트 사용시 리액트로 실행되고 모든 컴포넌트가 불러온 후 다음에 실행됨
  //[]의 내용이 변경될 경우에만, 없을 수도 있음. 여기서는 한번만 실행 되므로 없음
  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInfo === 1) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
      localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1")
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
