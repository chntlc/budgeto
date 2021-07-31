import React, { useState } from "react";
import "./AddPage.css";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { addItems } from "../../features/receiptSlice";
import Tesseract from "tesseract.js";
import Loader from "react-loader-spinner";
import Bill from "../../images/bill.png";

function AddPage() {
  const dispatch = useDispatch();
  const [inputRows, setInputRows] = useState([]);
  const [items, setItems] = useState([
    {
      name: "",
      qty: "",
      price: "",
    },
  ]);
  const [receiptImg, setReceiptImg] = useState(Bill);
  const [isParsingReceipt, setParsingReceipt] = useState(false);

  const addInputRow = () => {
    setInputRows([...inputRows, {}]);
  };

  const handleAddItems = () => {
    dispatch(addItems(items));
  };

  /**
   * handles editing an item within an array using setState
   * https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
   */

  const handleNameInput = (value, index) => {
    let itemsCopy = [...items];
    let item = { ...itemsCopy[index] };
    item.name = value;
    itemsCopy[index] = item;
    setItems(itemsCopy);
  };

  const handleQtyInput = (value, index) => {
    console.log(typeof value);
    let itemsCopy = [...items];
    let item = { ...itemsCopy[index] };
    item.qty = value;
    itemsCopy[index] = item;
    setItems(itemsCopy);
  };

  const handlePriceInput = (value, index) => {
    let itemsCopy = [...items];
    let item = { ...itemsCopy[index] };
    item.price = value;
    itemsCopy[index] = item;
    setItems(itemsCopy);
  };

  const uploadReceipt = async (event) => {
    const files = event.target.files;

    if (files && files[0]) {
      const receipt = URL.createObjectURL(files[0]);
      await parseReceipt(receipt);

      const receiptParsed = URL.createObjectURL(files[0]);
      setReceiptImg(receiptParsed);
    }
  };

  const parseReceipt = async (receipt) => {
    setParsingReceipt(true);

    const parsedResult = await Tesseract.recognize(receipt, "eng");
    const transactions = parsedResult.data.text;
    const re = /(.*)(?=(\n.*){8,11}$)/g;

    let itemsAndTax = transactions.match(re);
    itemsAndTax = itemsAndTax.filter(
      (transaction) => transaction !== "" && !transaction.includes("Subtotal")
    );

    addTransactions(itemsAndTax);

    console.log(itemsAndTax);
    setParsingReceipt(false);
  };

  const addTransactions = (transactions) => {
    transactions.forEach((transaction) => {
      const name = transaction.match(/[a-zA-Z]*\s[a-zA-Z]*/g)[0];
      const price = transaction.match(/[\d\.]*$/g)[0];
      const qty = "1";
      const parsedTransaction = { name, qty, price };

      setItems((prevItems) => [...prevItems, parsedTransaction]);
      setInputRows((prevInputRows) => [...prevInputRows, parsedTransaction]);
    });
  };

  return (
    <div>
      <Row gutter={16} justify="end" className="button-row">
        <Col className="col-content">
          <Link
            to="/receiptUploaded"
            className="next-button"
            onClick={handleAddItems}
          >
            Next
          </Link>
        </Col>
      </Row>
      <Row gutter={16} className="row-content">
        <Col flex={2} className="col-content">
          <Card title="Upload a Receipt" className="card">
            {!isParsingReceipt && (
              <div className="uploadContainer">
                <React.Fragment>
                  <img id="billImg" src={receiptImg} alt="receipt image"></img>
                  <label id="receiptUpload">
                    <input
                      type="file"
                      name="receipt_img"
                      accept="image/png, image/jpeg"
                      onChange={uploadReceipt}
                    />
                    Choose File
                  </label>
                </React.Fragment>
              </div>
            )}
            {isParsingReceipt && (
              <div className="loadingContainer">
                <Loader
                  type="ThreeDots"
                  color="#48426d"
                  height={85}
                  width={85}
                />
              </div>
            )}
          </Card>
        </Col>
        <Col flex={3} className="col-content">
          <Card title="Enter Items" bordered={true} className="card">
            <form className="item-form">
              <Row gutter={16} className="input-row">
                <Col span={16}>
                  <label>Name</label>
                  <input
                    className="item-name-input"
                    type="text"
                    onChange={(e) => handleNameInput(e.target.value, 0)}
                  />
                </Col>
                <Col span={4}>
                  <label>Quantity</label>
                  <input
                    className="item-qty-input"
                    type="number"
                    onChange={(e) => handleQtyInput(e.target.value, 0)}
                  />
                </Col>
                <Col span={4}>
                  <label>Price</label>
                  <input
                    className="item-price-input"
                    type="number"
                    onChange={(e) => handlePriceInput(e.target.value, 0)}
                  />
                </Col>
              </Row>
              {inputRows.map((item, index) => {
                let itemId = `item-${index + 1}`;
                const { name, qty, price } = item;
                return (
                  <Row key={itemId + "-row"} gutter={16} className="input-row">
                    <Col span={16}>
                      <input
                        key={itemId + "-name"}
                        className="item-name-input"
                        type="text"
                        onChange={(e) =>
                          handleNameInput(e.target.value, index + 1)
                        }
                        defaultValue={name}
                      />
                    </Col>
                    <Col span={4}>
                      <input
                        key={itemId + "-qty"}
                        className="item-qty-input"
                        type="number"
                        onChange={(e) =>
                          handleQtyInput(e.target.value, index + 1)
                        }
                        defaultValue={qty}
                      />
                    </Col>
                    <Col span={4}>
                      <input
                        key={itemId + "-price"}
                        className="item-price-input"
                        type="number"
                        onChange={(e) =>
                          handlePriceInput(e.target.value, index + 1)
                        }
                        defaultValue={price}
                      />
                    </Col>
                  </Row>
                );
              })}
              <button
                className="add-another-item-button"
                type="button"
                onClick={addInputRow}
              >
                Add Item +
              </button>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items,
  };
};

export default connect(mapStateToProps)(AddPage);
