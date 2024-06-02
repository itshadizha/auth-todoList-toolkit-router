import { createSlice } from "@reduxjs/toolkit";

//     case actionTypesTodo.edit:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
//         ),
//       };

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    removeAllTodos(state, action) {
      state.todos = [];
    },
    toggleTodoComplete(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload);

      todo.isComplete = !todo.isComplete;
    },
    toggleTodoEdit(state, action) {
     const togglingTodoEdit = state.todos.find((todo) => todo.id === action.payload);

      togglingTodoEdit.isEditing = !togglingTodoEdit.isEditing;
    },
    editTodo(state, action) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
    },
  },
});

export const {
  addTodo,
  removeTodo,
  removeAllTodos,
  toggleTodoComplete,
  toggleTodoEdit,
  editTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
