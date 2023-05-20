import React, { useState } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import Auth from '../auth/Auth';
import { History } from 'history';
import dateFormat from 'dateformat';
import { Todo } from '../types/Todo';
import { createTodo, getTodoById, patchTodo } from '../api/todos-api';
import { getUploadUrl, uploadFile } from '../api/todos-api';

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile
}

interface ActionTodoProps {
  match: {
    params: {
      todoId: string;
    };
  };
  auth: Auth;
  history: History;
}

interface ActionTodoState {
  file: any;
  uploadState: UploadState;
  newTodoTitle: string;
  todo: Todo;
}

const ActionTodo = ({ match, auth, history }: ActionTodoProps) => {
  const [state, setState] = useState<ActionTodoState>({
    file: undefined,
    uploadState: UploadState.NoUpload,
    newTodoTitle: '',
    todo: {
      todoId: '',
      createdAt: '',
      name: '',
      dueDate: '',
      done: false,
      attachmentUrl: ''
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setState((prevState) => ({
      ...prevState,
      file: files[0]
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoTitle = event.target.value;
    setState((prevState) => ({ ...prevState, newTodoTitle }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const todoId = match.params.todoId;
    const isCreation = todoId === 'create-todo';
    try {
      if (!state.newTodoTitle) {
        alert('Todo title is empty');
        return;
      }

      if (!state.file && isCreation) {
        alert('File should be selected');
        return;
      }

      const idToken = auth.getIdToken();
      if (isCreation) {
        const dueDate = calculateDueDate();

        const newTodo = await createTodo(idToken, {
          name: state.newTodoTitle,
          dueDate
        });

        setUploadState(UploadState.FetchingPresignedUrl);
        const uploadUrl = await getUploadUrl(auth.getIdToken(), newTodo.todoId);

        setUploadState(UploadState.UploadingFile);
        await uploadFile(uploadUrl, state.file);

        alert('File was uploaded!');
      } else {
        const { name, dueDate, done } = await getTodoById(idToken, todoId);

        await patchTodo(auth.getIdToken(), todoId, {
          name: state.newTodoTitle || name,
          dueDate: state.todo.dueDate || dueDate,
          done: state.todo.done || done
        });
        alert('Updated successfully');
      }

      history.push('/');
    } catch (e) {
      alert('Could not upload a file: ' + (e as Error).message);
    } finally {
      setUploadState(UploadState.NoUpload);
    }
  };

  const setUploadState = (uploadState: UploadState) => {
    setState((prevState) => ({
      ...prevState,
      uploadState
    }));
  };

  const calculateDueDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    return dateFormat(date, 'yyyy-mm-dd HH:mm') as string;
  };

  const renderButton = () => {
    return (
      <div>
        {state.uploadState === UploadState.FetchingPresignedUrl && (
          <p>Uploading image metadata</p>
        )}
        {state.uploadState === UploadState.UploadingFile && (
          <p>Uploading file</p>
        )}
        <Button
          loading={state.uploadState !== UploadState.NoUpload}
          type="submit"
          color="green"
          icon
        >
          <Icon name="save" /> Save
        </Button>
      </div>
    );
  };

  return (
    <div>
      <h1>
        {match.params.todoId === 'create-todo'
          ? 'Create a new todo'
          : 'Edit todo'}
      </h1>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            type="text"
            placeholder="Input your todo..."
            onChange={handleTitleChange}
          />
        </Form.Field>

        {match.params.todoId === 'create-todo' && (
          <Form.Field>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={handleFileChange}
            />
          </Form.Field>
        )}

        {renderButton()}
      </Form>
    </div>
  );
};

export default ActionTodo;
