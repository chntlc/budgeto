import React, { useState } from 'react'
import './AddPage.css'
import { Card, Col, Row } from 'antd';

function AddPage() {
  const [items, setItems] = useState([])

  const addInputRow = () => {
    console.log('add input row')
    setItems([...items, {
      name: '',
      qty: '',
      price: ''
    }])
    console.log({ items })
  }

  // TODO: add button that takes all items in state, when clicked, adds to our store in receiptSlice

  return (
    <div>
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
                  <input className='item-name-input' type='text' />
                </Col>
                <Col span={4}>
                  <label>Quantity</label>
                  <input className='item-qty-input' type='number' />
                </Col>
                <Col span={4}>
                  <label>Price</label>
                  <input className='item-price-input' type='number' />
                </Col>
              </Row>
              {
                items.map((item, index) => {
                  let itemId = `item-${index}`
                  return (
                    <Row gutter={16} className='input-row'>
                      <Col span={16}>
                        <input className='item-name-input' type='text' />
                      </Col>
                      <Col span={4}>
                        <input className='item-qty-input' type='number' />
                      </Col>
                      <Col span={4}>
                        <input className='item-price-input' type='number' />
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

export default AddPage
