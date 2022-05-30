import { React, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

export const App = () => {
  const [todoText, setTodotext] = useState([""]);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeClick = (event) => setTodotext(event.target.value);
  //追加ボタン
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodotext("");
  };
  //削除ボタン
  const onClickDel = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  //完了ボタン
  const onClickComp = (index) => {
    const newIncompTodos = [...incompleteTodos];
    newIncompTodos.splice(index, 1);
    const newCompTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompTodos);
    setCompleteTodos(newCompTodos);
  };
  //戻すボタン
  const onClickBack = (index) => {
    const newCompTodos = [...completeTodos];
    newCompTodos.splice(index, 1);
    const newIncompTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompTodos);
    setIncompleteTodos(newIncompTodos);
  };

  return (
    <>
      <InputTodo
        todos={todoText}
        onClick={onClickAdd}
        onChange={onChangeClick}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <>
          <h1 style={{ color: "red" }}>タスクが上限に達しました</h1>
          <p>タスクを削除してください</p>
        </>
      )}

      <IncompleteTodo
        todos={incompleteTodos}
        onClickCom={onClickComp}
        onClickDel={onClickDel}
      />

      <CompleteTodo todos={completeTodos} onClick={onClickBack} />
    </>
  );
};
