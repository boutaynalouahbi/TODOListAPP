import { ADD_TODO, FILTER_TODOS, MARK_ALL_COMPLETED, MARK_COMPLETED, REMOVE_TODO, TOGGLE_TODO, UPDATE_SEARCH_TERM, UPDATE_TODO } from "./ActionTypes";

const initialState={
    todos:localStorage.getItem("Tasks") ? JSON.parse(localStorage.getItem("Tasks")):[] ,
    filter:'ALL',
    searchTerm:'',
}

const todoReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ADD_TODO:
            localStorage.setItem('Tasks',JSON.stringify([...state.todos,{title:action.payload.title,description:action.payload.description,completed:false}]));
            return {
                ...state,todos:[...state.todos,{title:action.payload.title,description:action.payload.description,completed:false}]
            }
        case TOGGLE_TODO:
            localStorage.setItem('Tasks',JSON.stringify(state.todos.map((todo,index)=>index===action.payload?{...todo,completed:!todo.completed}:todo)));
            return {
                ...state,
                todos:state.todos.map((todo,index)=>index===action.payload?{...todo,completed:!todo.completed}:todo)
            }
        case REMOVE_TODO:
            localStorage.setItem('Tasks',JSON.stringify(state.todos.filter((todo,index)=>index!==action.payload)));

            return {
                ...state,
                todos:state.todos.filter((todo,index)=>index!==action.payload)
            } 
        case UPDATE_TODO:
            localStorage.setItem('Tasks',JSON.stringify(state.todos.map((todo,index)=>index===action.payload.id?{...todo,title:action.payload.updatedTask.title,description:action.payload.updatedTask.description}:todo)));
            return {
                ...state,
                todos:state.todos.map((todo,index)=>index===action.payload.id?{...todo,title:action.payload.updatedTask.title,description:action.payload.updatedTask.description}:todo)
            }
        case MARK_COMPLETED:
            return {
                ...state,
                todos:state.todos.map((todo,index)=>index===action.payload?{...todo,completed:true}:todo)
            }
        case FILTER_TODOS:
            return {
                ...state,
                filter:action.payload
            }
        case UPDATE_SEARCH_TERM:
            return {
                ...state,
                searchTerm:action.payload,
            }
        case MARK_ALL_COMPLETED:
            localStorage.setItem('Tasks',JSON.stringify(state.todos.map((todo)=>({...todo,completed:true}))));
            return {
                ...state,
                todos:state.todos.map((todo)=>({...todo,completed:true}))
            }
                    
        default:
            return state;
    }
}
export default todoReducer