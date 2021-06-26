import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Dashboard from "./Dashboard";
import ViewPage from "./ViewPage";
import ReceiptUploadedPage from "./ReceiptUploadedPage/ReceiptUploadedPage";
import ReportPage from "./ReportPage";
import AddPage from "./AddReceiptPage/AddPage";

function Router(props) {
  // How to go back to previous page: https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history
  // Another doc: https://stackoverflow.com/questions/46681387/react-router-v4-how-to-go-back

  const pages = props.pages;

  return (
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

export default Router;
