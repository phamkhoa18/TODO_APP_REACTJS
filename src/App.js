import { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from './components/Header';
import Todolist from './components/Todolist';
import CustomModal from './components/CustomModal';
import Footer from './components/Footer';

const TOTO_APP = 'TODO_APP';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = localStorage.getItem(TOTO_APP);
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  });

  const [filterList, setFilterList] = useState([]);
  const [edititem, setEdit] = useState({});
  const [show, setShow] = useState(false);
  const [itemshowhide, Setitemshowhide] = useState({});
  const [select, setSelect] = useState('');

  const callbackfs = (todoItem, value) => {
    if (value === 'add') {
      setTodoList([todoItem, ...todoList]);
    } else {
      const todolistedit = (prevTodoList) => {
        return prevTodoList.map((e) => {
          if (e.id === todoItem.id) {
            return { ...e, title: todoItem.title, des: todoItem.des, isCompleted: todoItem.isCompleted };
          }
          return e;
        });
      };
      setTodoList(todolistedit);
    }
  };

  const callbackmodal = () => {
    Setitemshowhide({});
  };

  const btnsuccess = (id, value) => {
    const todolistnew = (prevTodoList) => {
      return prevTodoList.map((e) => {
        if (e.id === id) {
          return { ...e, isCompleted: value };
        }
        return e;
      });
    };

    setTodoList(todolistnew);
  };

  const delItem = (id) => {
    const updatedList = todoList.filter((e) => e.id !== id);
    setTodoList(updatedList);
  };

  const editItem = (item) => {
    setEdit(item);
  };

  const handleShow = (item) => {
    Setitemshowhide(item);
  };

  const all = () => {
    setFilterList(todoList);
  };

  const completed = () => {
    const completedItems = todoList.filter((item) => item.isCompleted);
    setFilterList(completedItems);
  };

  const processing = () => {
    const processingItems = todoList.filter((item) => !item.isCompleted);
    setFilterList(processingItems);
  };

  const callbackselect = (select) => {
    if (select === '') {
      setSelect('all');
    } else {
      setSelect(select);
    }
  };

  useEffect(() => {
    localStorage.setItem(TOTO_APP, JSON.stringify(todoList));
    if (select === 'all') {
      setFilterList(todoList);
    } else if (select === 'completed') {
      completed();
    } else {
      processing();
    }
  }, [todoList, select]);

  return (
    <div className='app'>
      <Header parentCallback={callbackfs} dataFormEdit={edititem} />
      <Footer parentCallback={callbackselect} all={all} completed={completed} processing={processing} />
      <Todolist dataFormChild={filterList} btnsuccess={btnsuccess} editItem={editItem} delItem={delItem} handleShow={handleShow} />
      <CustomModal parentCallback={callbackmodal} dataShow={itemshowhide} />
    </div>
  );
}

export default App;
