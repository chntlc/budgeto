import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    console.log(props.items)
    if (props.items) {
      setItems(props.items)
      const inputRowsArray = [];
      for (let i = 0; i < props.items.length - 1; i++) {
        inputRowsArray.push({})
      }
      setInputRows(inputRowsArray)
    }
  }, [])

  const addInputRow = () => {
    console.log('add input row')
    setInputRows([...inputRows, {}])
    console.log({ items })
  }

  const handleAddItems = () => {
    dispatch(addItems(items))
  }

  /**
   * handles editing an item within an array using setState
   * https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
   */

  const handleInput = (value, index, property) => {
    let itemsCopy = [...items]
    let item = { ...itemsCopy[index] }
    item[property] = value
    itemsCopy[index] = item;
    setItems(itemsCopy);
  }

  return (
    <div>
      <Row gutter={16} justify="end" className='button-row-add'>
        <Col className='col-content'>
          <Link to='/receiptUploaded' className='next-button' onClick={handleAddItems}>
            Next
          </Link>
        </Col>
      </Row>
      <Row gutter={16} className='row-content'>
        <Col flex={2} className='col-content'>
          <Card title='Upload a Receipt' className='card'>
            {/* <button className='upload-receipt-button' type='file'>Upload</button> */}
            <input type='file' id='choose-file' />
            {/* <label for='choose-file' className='choose-file-button'>Choose file</label> */}
          </Card>
        </Col>
        <Col flex={3} className='col-content'>
          <Card title='Enter Items' bordered={true} className='card'>
            <form className='item-form' style={{ width: '97%', marginRight: '15px' }} >
              <Row gutter={16} className='input-row'>
                <Col span={16}>
                  <label>Name</label>
                  <input className='item-name-input' type='text' onChange={(e) => handleInput(e.target.value, 0, 'name')} defaultValue={items[0]?.name || ''} />
                </Col>
                <Col span={4}>
                  <label>Quantity</label>
                  <input className='item-qty-input' type='number' onChange={(e) => handleInput(e.target.value, 0, 'qty')} defaultValue={items[0]?.qty || ''} />
                </Col>
                <Col span={4}>
                  <label>Price</label>
                  <input className='item-price-input' type='number' onChange={(e) => handleInput(e.target.value, 0, 'price')} defaultValue={items[0]?.price || ''} />
                </Col>
              </Row>
              {
                inputRows.map((item, index) => {
                  // update input row here
                  let itemId = `item-${index + 1}`
                  return (
                    <Row key={itemId + '-row'} gutter={16} className='input-row'>
                      <Col span={16}>
                        <input key={itemId + '-name'} className='item-name-input' type='text' onChange={(e) => handleInput(e.target.value, index + 1, 'name')} defaultValue={items[index + 1]?.name || ''} />
                      </Col>
                      <Col span={4}>
                        <input key={itemId + '-qty'} className='item-qty-input' type='number' onChange={(e) => handleInput(e.target.value, index + 1, 'qty')} defaultValue={items[index + 1]?.qty || ''} />
                      </Col>
                      <Col span={4}>
                        <input key={itemId + '-price'} className='item-price-input' type='number' onChange={(e) => handleInput(e.target.value, index + 1, 'price')} defaultValue={items[index + 1]?.price || ''} />
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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items
  }
}

export default connect(mapStateToProps)(AddPage)
