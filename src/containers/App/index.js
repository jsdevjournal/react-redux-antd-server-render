import React from 'react'
import style from '../../styles/theme.scss'
import style2 from './style.css'
import { Col, Row } from 'react-styled-flexboxgrid'
import { DatePicker } from 'antd';
import Profile from '../../assets/images/KD-Profile.png'
import { LocaleProvider, Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import enUS from 'antd/lib/locale-provider/en_US';

export default () => {
  return (
    <LocaleProvider locale={enUS}>
      <Layout>
        <Header>
          <div className={style2.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }} >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Row center="xs" className={style.test}>
              <Col xs={12} md={4}><img src={Profile} /></Col>
              <Col xs={12} md={4}>test1</Col>
              <Col xs={12} md={4} className={style2.test2}>test2</Col>
              <Col xs={12} md={4}>test3</Col>
              <Col xs={12} md={4}><DatePicker /></Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </LocaleProvider>
  )
}
