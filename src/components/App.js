import React from "react";
import Navbar from "./Navbar";
import CategoryPicker from "./ReceiptUploadedPage/CategoryPicker";
import CategoryFilter from "./ReceiptUploadedPage/CategoryFilter";

function App() {
  return (
    <div>
      <CategoryPicker />
      <CategoryFilter />
    </div>
  );
}

export default App;
