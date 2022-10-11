import { Button, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.css';

export default function() {
  const [a, setA] = useState(()=>1);
  const aRef= useRef<any>(null)
  useEffect(()=>{
    // 在需要监听window事件的时候需要用到eg: scroll 
    document.querySelector('.btn').addEventListener('click',clickCB)
  },[])
  const clickCB=()=>{
    console.log('原来的state a',{a})
    console.log('使用ref缓存 a',{a:getA()})
  }
  const handlerClick=()=>{
    const newA=a+1;
    setA(newA);
  }
  const getA=()=>{
    return aRef.current
  }
  // 解决方案
  useEffect(()=>{
    aRef.current=a
  },[a])
  return (
    <div className={styles.normal}>
      <h3>原生事件回调无法获取state的最新值</h3>
      <Row justify='start'>
        <Col>
           a的值:{a}
        </Col>
        <Col>
          <Button type='primary' onClick={handlerClick}>+1</Button>
        </Col>
        <Col>
          <Button type='primary' className='btn'>点击这里查看js原生事件获取的state A的值</Button>
        </Col>
      </Row>
    </div>
  );
}
