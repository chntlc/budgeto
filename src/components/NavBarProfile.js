import React from "react";
import "antd/dist/antd.css";
import { Menu, Form, Input, Button, Dropdown } from "antd";

const menu = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 18,
    },
  };
  return (
    <Menu>
      <Menu.Item key="0">
        <Form {...layout}>
          <Form.Item label="Weekly Budget" name="weeklyBudget">
            <Input></Input>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Set
            </Button>
          </Form.Item>
        </Form>
      </Menu.Item>
    </Menu>
  );
};

function NavBarProfile(props) {
  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]} arrow>
      <img src={props.imgUrl} alt="" className="navbar__profile" />
    </Dropdown>
  );
}

export default NavBarProfile;
