import React ,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../redux/actions';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button as MuiButton} from '@mui/material';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function PopupContainer({action,id}) {
    const dispatch=useDispatch();
    const tasks=useSelector(state=>state.todos)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [taskName,setTaskName]=useState("");
    const [description,setDescription]=useState("");
    
    function handleClickEDIT() {
        toggle();
        const updatedTask={title:taskName.trim(),description:description.trim(),completed:false}
        dispatch(updateTodo(updatedTask,id))
        console.log(updateTodo)
        setTaskName('')
        setDescription('')
    }
    function handleClickADD() {
        toggle();
        const newId = generateNewId(); 
        console.log( "MyId",newId);
        console.log(taskName)
        const newTask={id:newId,title:taskName.trim(),description:description.trim(),completed:false}
        dispatch(addTodo(newTask))
        //localStorage.setItem('Tasks',JSON.stringify([...tasks,newTask]));
        setTaskName('')
        setDescription('')
    }
    function generateNewId() {
      const tasksFromLocalStorage = JSON.parse(localStorage.getItem('Tasks'));
      if (tasksFromLocalStorage && tasksFromLocalStorage.length > 0) {
        const lastTask = tasksFromLocalStorage[tasksFromLocalStorage.length - 1];
        return lastTask.id + 1;
      } else {
        return 1;
      }
    }
    function handleToggle() {
        const currentTask = tasks.find((task) => task.id === id);
        console.log(currentTask);
        setTaskName(currentTask.title)
        setDescription(currentTask.description)
        toggle();
        
    }
  return (
    <div>
      {action==='ADD' ? <Button color='primary' onClick={toggle} size="lg" block >
        Create Task
      </Button>: <MuiButton variant="contained" endIcon={<ModeEditIcon />} onClick={handleToggle} >
          Edit
        </MuiButton> }
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader  toggle={toggle}>
            {action==='ADD'? <p>Create Task</p> :<p>Edit Task</p> }
        </ModalHeader>
        <ModalBody >
            <form className='d-flex flex-col '>
                <label>Task Name</label>
                <input type="text" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-1" placeholder="Task Name" value={taskName}  onChange={(e)=>{setTaskName(e.target.value)}} required
  minLength={5}/>
                <label>Description</label>
                <textarea className="border border-gray-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-1" placeholder="Description" value={description}  onChange={(e)=>{setDescription(e.target.value)}} required
  minLength={10}></textarea>
            </form>
        </ModalBody>
        <ModalFooter>
            {action==='ADD' ?<Button color="primary" onClick={handleClickADD}  >
           Create
          </Button>: <MuiButton variant="contained" endIcon={<ModeEditIcon />} onClick={handleClickEDIT} >
          Edit
        </MuiButton> }
          
          <Button color="secondary" onClick={()=>{toggle(); setTaskName('');setDescription('')}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}