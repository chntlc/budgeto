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
              <Row>
                <Col flex={6}>
                  <label>Name</label>
                </Col>
                <Col flex={5}>
                  <label>Quantity</label>
                </Col>
                <Col flex={5}>
                  <label>Price</label>
                </Col>
              </Row>
              <div className='input-row'>
                <input className='item-name-input' type='text' />
                <input className='item-qty-input' type='number' />
                <input className='item-price-input' type='number' />
              </div>
              {
                items.map((item, index) => {
                  let itemId = `item-${index}`
                  return (
                    <div className='input-row'>
                      <input className='item-name-input' type='text' />
                      <input className='item-qty-input' type='number' />
                      <input className='item-price-input' type='number' />
                    </div>
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
