import React, { useState, useEffect } from 'react';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import TextArea from '@atlaskit/textarea';

export default function Header(props) {
  const [todo, setTodo] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [textDes, setTextDes] = useState('');
  const [id, setId] = useState(Number);
  const [checktextvalue, setChecktextvalue] = useState(true);
  const [edititem , setEdit] = useState(false) ;
  const [itemtext , setitemvalue] = useState({});
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    // setTodo(props.dataFormEdit);
      setTextTitle(props.dataFormEdit.title) ;
      setTextDes(props.dataFormEdit.des);
      setId(props.dataFormEdit.id);
      if(!todo == '') {
        setitemvalue(props.dataFormEdit);
        setChecktextvalue(false);
        setEdit(true);
      }  
  }, [props.dataFormEdit]);

  const onTextTitleChange = (e) => {
    const newText = e.target.value;
    setTextTitle(newText);
    setIsTouched(true);
    if (newText === '') {
      setIsTouched(false);
    }
    // Kiểm tra textTitle value
    if (newText.length < 3) {
      setChecktextvalue(true);
    } else {
      setChecktextvalue(false);
    }
  };



  const onTextDesChange = (e) => {
    const newText = e.target.value;
    setTextDes(newText);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // add
    if(!edititem) {
      const text = { id: Math.random() , title: textTitle, des: textDes, isCompleted: false };
      setTodo(text);
      props.parentCallback(text , 'add');
      setTextDes('');
      setTextTitle('');
      setChecktextvalue(true); 
      setIsTouched(false)
    } 
    // edit
    else {
      const text = { id: id , title: textTitle, des: textDes, isCompleted: false };
      console.log(text);
      props.parentCallback(text , 'edit');
      setTextDes('');
      setTextTitle('');
      setId(Number) ;
      setChecktextvalue(true); 
      setIsTouched(false);
      setEdit(false);
      
    }
  };

  const Cancel = () => {
    props.parentCallback(itemtext , 'edit');
    setTextDes('');
    setTextTitle('');
    setId(Number) ;
    setChecktextvalue(true); 
    setIsTouched(false);
    setEdit(false);
  }

  return (
    <div className='container_todo'>
      <h2>TodoList App</h2>
      <form onSubmit={handleSubmit}>
        <input type='hidden' name='id' value={id} ></input>
        <TextField name='title' placeholder='Please enter a title...' value={textTitle} onChange={onTextTitleChange} />
        {checktextvalue && isTouched && <span style={{ color: 'red' }}>Title should be at least 3 characters</span>}
        <TextArea
          name='des'
          resize='auto'
          maxHeight='20vh'
          className='text_aria'
          placeholder='Please enter a description...'
          onChange={onTextDesChange}
          value={textDes}
        />
        {!edititem && <Button style={{ marginTop: '10px' }} isDisabled={checktextvalue} appearance='primary' type='submit'>
          Add
        </Button>}
        {edititem && <Button style={{ marginTop: '10px' }} isDisabled={checktextvalue} appearance='danger' type='submit'>
          Edit
        </Button>}
        {edititem && <Button style={{ marginTop: '10px' , marginLeft : '10px' }} onClick={Cancel} isDisabled={checktextvalue} appearance='warning'>
          Cancel
        </Button>}
      </form>
    </div>
  );
}
