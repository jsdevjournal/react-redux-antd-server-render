import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from 'styles/theme.scss'
import style2 from './style.css'
import { DatePicker } from 'antd';
import Profile from 'assets/images/KD-Profile.png'
import { someAction } from 'actions/actionCreator'
import { Row, Col, Icon, Layout, Menu, Breadcrumb } from 'antd'
const { Header, Content, Footer } = Layout


@connect(state => state, { someAction })
export default class App extends Component {

  constructor(props) {
    super(props)
    props.someAction()
  }

  render() {
    return (
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
            <Row gutter={24} className={style.test}>
              <Col xs={24} md={6}><Icon type="step-backward" />test1</Col>
              <Col xs={24} md={6} className={style2.test2}>test2</Col>
              <Col xs={24} md={6}><img className={style2.maxWidth} src={Profile} /></Col>
              <Col xs={24} md={6}><DatePicker /></Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}
