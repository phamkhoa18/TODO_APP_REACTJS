import Button from '@atlaskit/button';
import React, { useState, useEffect } from 'react';
import CheckIcon from '@atlaskit/icon/glyph/check'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import EditIcon from '@atlaskit/icon/glyph/edit'
import CancelIcon from '@atlaskit/icon/glyph/cross-circle'
import WatchIcon from '@atlaskit/icon/glyph/watch'



export default function Todolist(props) {
  const [todoList, setTodoList] = useState([]);
  

  

  useEffect(() => {
    setTodoList(props.dataFormChild);
  }, [props.dataFormChild]);



  return (
    <>
      {todoList.map((e) => (
       <Button className={`item ${e.isCompleted ? 'completed' : ''}`} shouldFitContainer 
       iconAfter={
            <>
            {<span className='checkicon icon ' onClick={() => {props.handleShow(e)}} ><WatchIcon/></span>}
            { !e.isCompleted  && <span className='checkicon icon ' onClick={() => {props.btnsuccess(e.id , true )}} ><CheckIcon primaryColor='green'/></span>}
            { e.isCompleted && <span className='uncheckicon icon' onClick={() => {props.btnsuccess(e.id , false )}} ><CancelIcon primaryColor='red'/></span>}
            <span className='editicon icon' onClick={() => {props.editItem(e)}} ><EditIcon primaryColor='black'/></span>
            <span className='removeicon icon' onClick={() => {props.delItem(e.id)}} ><TrashIcon primaryColor='red'/></span>
            </>
       } 
       key={e.id} > <span className='success'>{e.title}</span> </Button>
      ))}
    </>
  );
}
