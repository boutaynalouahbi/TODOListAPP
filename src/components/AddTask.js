import React ,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function AddTask(args) {
    const dispatch=useDispatch();
    const tasks=useSelector(state=>state.todos)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [taskName,setTaskName]=useState("");
    const [description,setDescription]=useState("");
    
    function handleClick() {
        toggle();
        console.log(taskName)
        const newTask={title:taskName.trim(),description:description.trim(),completed:false}
        dispatch(addTodo(newTask))
        localStorage.setItem('Tasks',JSON.stringify([...tasks,newTask]));
        setTaskName('')
        setDescription('')
    }
  return (
    <div>
        <Button color='primary' onClick={toggle} className=' py-2 px-4  mt-5'>
        Create Task
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader  toggle={toggle}>Create Task</ModalHeader>
        <ModalBody >
            <form className='d-flex flex-col '>
                <label>Task Name</label>
                <input type="text" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-1" placeholder="Task Name" value={taskName}  onChange={(e)=>{setTaskName(e.target.value)}}/>
                <label>Description</label>
                <textarea className="border border-gray-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-1" placeholder="Description" value={description}  onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClick}>
           Create
          </Button>
          <Button color="secondary" onClick={()=>{toggle(); setTaskName('');setDescription('')}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
