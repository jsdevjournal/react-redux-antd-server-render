import React from 'react'
import style from '../../styles/theme.scss'
import style2 from './style.css'
import { Col, Row } from 'react-styled-flexboxgrid'
import { DatePicker } from 'antd';

export default () => {
  return (
    <Row center="xs" className={style.test}>
      <Col xs={12} md={4}>test1</Col>
      <Col xs={12} md={4} className={style2.test2}>test2</Col>
      <Col xs={12} md={4}>test3</Col>
      <Col xs={12} md={4}><DatePicker /></Col>
    </Row>
  )
}
