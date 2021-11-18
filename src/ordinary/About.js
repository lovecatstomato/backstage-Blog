import React from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import './css/About.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../routing/index"
import Home from "../ordinary/Component/Column/Home";
import Manage from "../ordinary/Component/Column/Manage"
import Contentadd from "../ordinary/Component/content/Contentadd"
import Newsmana from "../ordinary/Component/content/Newsmana"
import Inquire from './Component/content/Inquire';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const About = () => {
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider className="site-layout-background">
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}>
              <SubMenu key="sub1" icon={<MailOutlined />} title="栏目管理">
                <Link to="/about/home">
                  <Menu.Item key="1">添加栏目</Menu.Item>
                </Link>
                <Link to="/about/manage">
                  <Menu.Item key="2">栏目管理</Menu.Item>
                </Link>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="新闻管理">
                <Link to="/about/contentadd">
                  <Menu.Item key="5">新闻的添加</Menu.Item>
                </Link>
                <Link to="/about/newsmana">
                  <Menu.Item key="6">新闻管理</Menu.Item>
                </Link>
                <Link to="/about/inquire">
                  <Menu.Item key="7">新闻查询</Menu.Item>
                </Link>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
              }}
            >

              <Switch>
                <Route exact path="/about/home" component={Home} />{/* 添加栏目 */}
                <Route path="/about/manage" component={Manage} />{/* 栏目管理 */}
                <Route path="/about/contentadd" component={Contentadd} />{/* 新闻的添加 */}
                <Route path="/about/newsmana" component={Newsmana} />{/* 新闻管理 */}
                <Route path="/about/inquire" component={Inquire} />{/* 新闻查询 */}
              </Switch>


            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default About