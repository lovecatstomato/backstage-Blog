// Hello.js
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'
import './ordinary/css/Universal.css'
import 'antd/dist/antd.css';
// import axios from 'axios';
import service from './ordinary/http';

// 类组件
class login extends React.Component {
  inputChange(e) {
    this.setState({
      txt: e.target.value
    })
  }
  // 获取axios
  componentDidMount() {
    
  }
  // 获取文本框的值
  getTxt = (values) => {
    service.post(`/sys/login?username=${values.username}&password=${values.password}`).then((red) => {
      // console.log(red);
      if (red.data.code === 2) {
        console.log(red);
        // console.log(1);
        console.log(red.data.data.token);
        window.localStorage.setItem('token',red.data.data.token)
        window.localStorage.setItem('username',red.data.data.user.authority)
        this.props.history.push('/about')
      }
    })
  }
  render() {
    return (
      <div className='body'>
        <div className='Rame'>
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.getTxt}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item labelAlign='right'>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default login