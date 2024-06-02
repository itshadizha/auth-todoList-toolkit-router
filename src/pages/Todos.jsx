import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Form, useNavigate } from "react-router-dom";
import {
  addTodo,
  editTodo,
  removeAllTodos,
  removeTodo,
  toggleTodoComplete,
  toggleTodoEdit,
} from "../store/slices/todoSlice";
import { setFalse } from "../store/slices/authSlice";

const Todos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = formData.get("task");

    dispatch(
      addTodo({
        id: Date.now(),
        task,
        isComplete: false,
        isEditing: false,
      })
    );

    e.target.reset();
  };

  const toggleIsComplete = (id) => {
    dispatch(toggleTodoComplete(id));
  };

  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const deleteAllTodos = () => {
    dispatch(removeAllTodos());
  };

  const isEditingTodo = (id) => {
    dispatch(toggleTodoEdit(id));
  };

  const saveEditedTodo = (id, editedTask) => {
    dispatch(editTodo({ id, task: editedTask }));
  };

  const toggleLogin = () => {
    dispatch(setFalse());
    navigate("/login");
  };

  return (
    <div>
      <ButtonStyled
        style={{ backgroundColor: "purple", fontSize: "22px" }}
        onClick={toggleLogin}
      >
        Log Out
      </ButtonStyled>
      <FormContainer onSubmit={onSubmitHandler}>
        <FormTitle>Todo-List</FormTitle>
        <FormGroup>
          <Label htmlFor="task">Task name:</Label>
          <Input type="text" id="task" name="task" required />
        </FormGroup>
        <SubmitButton type="submit">Add</SubmitButton>
      </FormContainer>

      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            {todo.isEditing ? (
              <>
                <Input type="text" defaultValue={todo.task} onChange={(e) => saveEditedTodo(todo.id, e.target.value)}/>
                <Button onClick={() => isEditingTodo(todo.id)}>Save</Button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.isComplete ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
                <ActionsContainer>

               
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => toggleIsComplete(todo.id)}
                />

                <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                <Button onClick={() => isEditingTodo(todo.id)}>Edit</Button>
                </ActionsContainer>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>

      <ButtonStyled onClick={deleteAllTodos}>Delete All</ButtonStyled>
    </div>
  );
};

export default Todos;

const FormContainer = styled(Form)`
  width: 450px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoList = styled.div`
  width: 500px;
  margin: 20px auto;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ButtonStyled = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #103256;
  color: white;
  margin-top: 30px;
  margin-left: 430px;
  font-size: 14px;
`;


const Button = styled.button`
   padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #103256;
  color: white;
  font-size: 14px;
  cursor: pointer;
`

const  ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`