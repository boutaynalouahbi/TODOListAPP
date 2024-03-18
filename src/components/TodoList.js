import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card,CardTitle,CardText, Container } from 'reactstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Pagination, Switch } from '@mui/material';
import Filter from './Filter';
import SearchByTitle from './SearchBYTitle';
import { markAllCompleted, removeTodo, toggleTodo } from '../redux/actions';
import PopupContainer from './PopupContainer';
export default function TodoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    };
  const dispatch=useDispatch()
  function handleClickC() {
    dispatch(markAllCompleted());
  }
  const filteredTodos = useSelector((state) => {
    const todos = state.todos; 
    const filter = state.filter; 
    const searchTerm = state.searchTerm.toLowerCase(); 
  
    return todos.filter((todo) => {
      const matchesFilter = (filter === 'COMPLETED' && todo.completed) ||
        (filter === 'UNCOMPLETED' && !todo.completed) ||
        filter === 'ALL'; 
  
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm); 
       return matchesFilter && matchesSearch; 
    });
  });
  const tasks = useSelector((state) => state.todos);
  const totalCount = filteredTodos.length;
  const itemsPerPage = 6;
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

   console.log('Filter',currentTodos.map((todo,index)=>[index,todo.title,todo.description]))

  return (
    < div className='container mx-auto' >
    <div className=' bg-slate-300 h-4/5 py-8 flex flex-col items-center justify-center   rounded-md'>
    <div className='text-5xl font-bold self-center'>TaskTracker</div>
    <div className='m-3  text-xl font-bold w-2/5 text-center'>Welcome to our Todo List app! Our app allows you to easily manage your daily tasks.</div>
    <div className='mt-3 '> <PopupContainer action='ADD' /></div>
    </div>
    <div className='w-full h-20 mt-10 md:flex md:justify-between md:flex-wrap md:gap-1'>
  <div className='flex gap-1 self-end h-4/5'> 
  <div className='w-fit '><Filter /></div> 
  <div className='w-fit h-full'><Button variant="contained" className='w-full h-5/6' onClick={handleClickC}>Mark All Completed</Button>
  </div>
    </div>
  <div className=' w-full h-4/5 mt-4 md:w-2/5 self-end'>
    <SearchByTitle />
  </div>
</div>
   <div className= ' w-full mt-32 md:mt-10 text-center mb-10 '> <h3>TODO LIST</h3></div>
   <div style={{borderColor:'blue',borderWidth:'2px',borderRadius:'5px'}} className='mb-10 flex flex-col'>
    <div className= ' w-full md:mt-4  flex  items-center justify-center content-center gap-x-4 gap-y-3 flex-wrap p-10 ' >
           {currentTodos.length>0 ? (
  currentTodos.map((task, index) => (
    <Card
      body
      className="my-2 max-w-96"
      key={index}
      style={{backgroundColor:task.completed ? '#B0C4DE':'#FFFFFF',borderWidth:'3px',color:task.completed?'#FFFFFF':'#000000'}}
    >
      <CardTitle tag="h5">{task.title}</CardTitle>
      <CardText>{task.description}</CardText>
      <Container className="flex justify-end gap-2">
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>dispatch(removeTodo(task.id))}>
          Delete
        </Button>
        <PopupContainer action='EDIT' id={task.id}/>
        <Switch   checked={task.completed} onClick={() => dispatch(toggleTodo(task.id))}/>
      </Container>
    </Card>
  ))
) : (
  <p className="text-gray-500 text-center font-semibold text-2xl md:text-4xl">
      There is no task
    </p>
)}
            
      </div>
      <Pagination 
        count={pageCount} 
        page={currentPage} 
        onChange={handlePageChange} 
        className='self-end'
      />
      </div>
    </div>
  )
}
