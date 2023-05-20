import React, { useEffect, useState } from 'react';
import { History } from 'history';
import update from 'immutability-helper';
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader
} from 'semantic-ui-react';

import { deleteTodo, getTodos, patchTodo } from '../api/todos-api';
import Auth from '../auth/Auth';
import { Todo } from '../types/Todo';

interface TodosProps {
  auth: Auth;
  history: History;
}

interface TodosState {
  todos: Todo[];
  newTodoName: string;
  loadingTodos: boolean;
}

const Todos = ({ auth, history }: TodosProps) => {
  const [state, setState] = useState<TodosState>({
    todos: [],
    newTodoName: '',
    loadingTodos: true
  });

  const onActionTodoClick = (todoId: string) => {
    history.push(`/todos/${todoId}`);
  };

  const onTodoDelete = async (todoId: string) => {
    try {
      await deleteTodo(auth.getIdToken(), todoId);
      setState((prevState) => ({
        ...prevState,
        todos: prevState.todos.filter((todo) => todo.todoId !== todoId)
      }));
    } catch {
      alert('Todo deletion failed');
    }
  };

  const onTodoCheck = async (pos: number) => {
    try {
      const todo = state.todos[pos];
      await patchTodo(auth.getIdToken(), todo.todoId, {
        name: todo.name,
        dueDate: todo.dueDate,
        done: !todo.done
      });
      setState((preState) => ({
        ...preState,
        todos: update(preState.todos, {
          [pos]: { done: { $set: !todo.done } }
        })
      }));
    } catch {
      alert('Todo deletion failed');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await getTodos(auth.getIdToken());
        setState((prevState) => ({
          ...prevState,
          todos,
          loadingTodos: false
        }));
      } catch (e) {
        alert(`Failed to fetch todos: ${(e as Error).message}`);
      }
    };
    fetchData();
  }, [auth]);

  const renderCreateTodoInput = () => {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Button
            icon
            fluid
            color="olive"
            onClick={() => onActionTodoClick('create-todo')}
          >
            <Icon name="plus" /> Create a new todo
          </Button>
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    );
  };

  const renderTodos = () => {
    if (state.loadingTodos) {
      return renderLoading();
    }

    return renderTodosList();
  };

  const renderLoading = () => {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading TODOs
        </Loader>
      </Grid.Row>
    );
  };

  const renderTodosList = () => {
    return (
      <Grid padded>
        {state.todos.map((todo, pos) => {
          return (
            <Grid.Row key={todo.todoId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => onTodoCheck(pos)}
                  checked={todo.done}
                />
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {todo.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {todo.dueDate}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => onActionTodoClick(todo.todoId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => onTodoDelete(todo.todoId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {todo.attachmentUrl && (
                <Image src={todo.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    );
  };

  return (
    <div>
      <Header as="h1">TODOs</Header>

      {renderCreateTodoInput()}

      {renderTodos()}
    </div>
  );
};

export default Todos;
