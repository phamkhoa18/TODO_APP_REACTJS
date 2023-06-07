import Button from '@atlaskit/button';
import React, { useState , useEffect } from 'react'

export default function Footer(props) {

  const [select , setSelect] = useState('');

  useEffect(() => {
    setSelect('all'); // Đặt chế độ mặc định là 'all' khi thành phần được tạo ra
    props.parentCallback(select);
  } , []);




  return (
    <div className='footer'>
      <Button className={`itembtn ${select === 'all' ? 'selected' : ''}`} onClick={() => {props.all() ; setSelect('all') ; props.parentCallback('all')}} >All</Button>
      <Button className={`itembtn ${select === 'processing' ? 'selected' : ''}`} onClick={() => {props.processing() ; setSelect('processing') ; props.parentCallback('processing')}}>Processing</Button>
      <Button className={`itembtn ${select === 'completed' ? 'selected' : ''}`}  onClick={() => {props.completed() ; setSelect('completed'); props.parentCallback('completed') } }>Completed</Button>
    </div>
  )
}
