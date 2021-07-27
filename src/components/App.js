import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import Router from "./Router";
// import Loader from "./Loader";

function App() {
  const [userContext, setUserContext] = useContext(UserContext)

  // const verifyUser = useCallback(() => {
  //   fetch("/users/refreshToken", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //   }).then(async response => {
  //     if (response.ok) {
  //       const data = await response.json()
  //       setUserContext(oldValues => {
  //         return { ...oldValues, token: data.token }
  //       })
  //     } else {
  //       setUserContext(oldValues => {
  //         return { ...oldValues, token: null }
  //       })
  //     }
  //     // call refreshToken every 5 minutes to renew the authentication token.
  //     setTimeout(verifyUser, 5 * 60 * 1000)
  //   })
  // }, [setUserContext])
  //
  // useEffect(() => {
  //   verifyUser()
  // }, [verifyUser])


  return <Router pages={["Home", "Login"]} />;
  // return userContext.token == null ? (
  //   <Router pages={["Home", "Login"]} />
  // ) : userContext.token ? (
  //
  // ) : (
  //
  // )
}

export default App;
