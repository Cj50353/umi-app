import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, InputNumber} from 'antd'
import styles from './users.css';
import BigNumber from "bignumber.js"



export default function BigNum() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);
  const [text, setText] = useState('');
  var  handleChange1=(value)=>{
    setNum1(value)
    console.log('handleChange1',value)
  }

  useEffect(()=>{
    console.log('useEffect;')
    setText('我改变了:'+num1)
  },[text])
  var handleChange2=(value)=>{
    setNum2(value)
    console.log('handleChange2',value)
  }
  var plus=()=>{
    let result;
    let b_num1=BigNumber(num1)
    let b_num2=BigNumber(num2)
    result=b_num1.plus(b_num2).toFixed(4) //string
    console.log('plus',result)
    setResult(result)
  }
  var minus=()=>{
    let result;
    let b_num1=new BigNumber(num1)
    let b_num2=new BigNumber(num2)
    result=b_num1.minus(b_num2).toFixed(4)
    console.log('minus',result)
    setResult(result)
  }
  var times=()=>{
    let result;
    let b_num1=new BigNumber(num1)
    let b_num2=new BigNumber(num2)
    result=b_num1.times(b_num2).toFixed(4)
    console.log('times',result)
    setResult(result)
  }
  var divid=()=>{
    let result;
    let b_num1=new BigNumber(num1)
    let b_num2=new BigNumber(num2)
    result=b_num1.dividedBy(b_num2).toFixed(4)
    console.log('divid',result)
    setResult(result)
  }
  return (
    <div className={styles.normal}>
      <h1>Page users</h1>
      <InputNumber value={num1} onChange={handleChange1} precision={4}/>
      <InputNumber value={num2} onChange={handleChange2} precision={4}/>
      <p>result:{result}</p>
      <p>text:{text}</p>
      <Button onClick={plus}>+</Button>
      <Button onClick={minus}>-</Button>
      <Button onClick={times}>*</Button>
      <Button onClick={divid}>/</Button>
      <Button onClick={()=>setText(text+1)}>text+1</Button>
    </div>
  )
}
