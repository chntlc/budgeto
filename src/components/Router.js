import React, { useCallback, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Dashboard from "./Dashboard";
import ViewPage from "./ViewPage";
import ReceiptUploadedPage from "./ReceiptUploadedPage/ReceiptUploadedPage";
import ReportPage from "./ReportPage";
import AddPage from "./AddReceiptPage/AddPage";
import { UserContext } from "./context/UserContext";
import { connect, useDispatch } from 'react-redux';
import { refreshUser } from "../features/globalSlice";

function Router(props) {
  // How to go back to previous page: https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history
  // Another doc: https://stackoverflow.com/questions/46681387/react-router-v4-how-to-go-back
  const dispatch = useDispatch()
  const pages = props.pages;
  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch("/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
        dispatch(refreshUser(data.refreshedUser))
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  return !userContext.token ? (
    <BrowserRouter>
      <div>
        <Navigation pages={pages} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Home} />
          <Route path="/view" component={Home} />
          <Route path="/add" component={Home} />
          <Route path="/receiptUploaded" component={Home} />
          <Route path="/report" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <div>
        <Navigation pages={pages} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/view" component={ViewPage} />
          <Route path="/add" component={AddPage} />
          <Route path="/receiptUploaded" component={ReceiptUploadedPage} />
          <Route path="/report" component={ReportPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.global.user
  }
}

export default connect(mapStateToProps)(Router);