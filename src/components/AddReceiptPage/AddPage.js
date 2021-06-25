import React, { useState } from 'react'
import './AddPage.css'
import { Card, Col, Row } from 'antd';
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux'
import { addItems } from '../../features/receiptSlice'

function AddPage(props) {
  const dispatch = useDispatch()
  const [inputRows, setInputRows] = useState([])
  const [items, setItems] = useState([{
    name: '',
    qty: '',
    price: ''
  }])

  const addInputRow = () => {
    console.log('add input row')
    // setItems([...items, {
    //   name: '',
    //   qty: '',
    //   price: ''
    // }])
    setInputRows([...inputRows, {}])
    console.log({ items })
  }

  const handleAddItems = () => {
    dispatch(addItems(items))
  }

  const handleNameInput = (value, index) => {
    // 1. Make a shallow copy of the items
    let itemsCopy = [...items]
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...itemsCopy[index] }
    // 3. Replace the property you're intested in
    item.name = value
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    itemsCopy[index] = item;
    // 5. Set the state to our new copy
    setItems(itemsCopy);
  }

  const handleQtyInput = (value, index) => {
    // 1. Make a shallow copy of the items
    let itemsCopy = [...items]
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...itemsCopy[index] }
    // 3. Replace the property you're intested in
    item.qty = value
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    itemsCopy[index] = item;
    // 5. Set the state to our new copy
    setItems(itemsCopy);
  }

  const handlePriceInput = (value, index) => {
    // 1. Make a shallow copy of the items
    let itemsCopy = [...items]
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...itemsCopy[index] }
    // 3. Replace the property you're intested in
    item.price = value
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    itemsCopy[index] = item;
    // 5. Set the state to our new copy
    setItems(itemsCopy);
  }

  // TODO: add button that takes all items in state, when clicked, adds to our store in receiptSlice

  return (
    <div>
      <Row gutter={16} justify="end" className='button-row'>
        <Col className='col-content'>
          {/* <button className='next-button'>Next</button> */}
          <Link to='/receiptUploaded' className='next-button' onClick={handleAddItems}>
            Next
          </Link>
        </Col>
      </Row>
      <Row gutter={16} className='row-content'>
        <Col flex={2} className='col-content'>
          <Card title='Upload a Receipt' className='card'>
            <button className='upload-receipt-button'>Upload</button>
          </Card>
        </Col>
        <Col flex={3} className='col-content'>
          <Card title='Enter Items' bordered={true} className='card'>
            <form className='item-form'>
              <Row gutter={16} className='input-row'>
                <Col span={16}>
                  <label>Name</label>
                  <input className='item-name-input' type='text' onChange={(e) => handleNameInput(e.target.value, 0)} />
                </Col>
                <Col span={4}>
                  <label>Quantity</label>
                  <input className='item-qty-input' type='number' onChange={(e) => handleQtyInput(e.target.value, 0)} />
                </Col>
                <Col span={4}>
                  <label>Price</label>
                  <input className='item-price-input' type='number' onChange={(e) => handlePriceInput(e.target.value, 0)} />
                </Col>
              </Row>
              {
                inputRows.map((item, index) => {
                  let itemId = `item-${index + 1}`
                  return (
                    <Row key={itemId + '-row'} gutter={16} className='input-row'>
                      <Col span={16}>
                        <input key={itemId + '-name'} className='item-name-input' type='text' onChange={(e) => handleNameInput(e.target.value, index + 1)} />
                      </Col>
                      <Col span={4}>
                        <input key={itemId + '-qty'} className='item-qty-input' type='number' onChange={(e) => handleQtyInput(e.target.value, index + 1)} />
                      </Col>
                      <Col span={4}>
                        <input key={itemId + '-price'} className='item-price-input' type='number' onChange={(e) => handlePriceInput(e.target.value, index + 1)} />
                      </Col>
                    </Row>
                  )
                })
              }
              <button className='add-another-item-button' type='button' onClick={addInputRow}>Add Item +</button>
            </form>
          </Card>
        </Col>
      </Row>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items
  }
}

export default connect(mapStateToProps)(AddPage)
