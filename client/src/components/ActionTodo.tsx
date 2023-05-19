import * as React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { History } from 'history'
import dateFormat from 'dateformat'
import { Todo } from '../types/Todo'
import { createTodo, getTodoById, patchTodo } from '../api/todos-api'
import { getUploadUrl, uploadFile } from '../api/todos-api'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile
}

interface ActionTodoProps {
  match: {
    params: {
      todoId: string
    }
  }
  auth: Auth
  history: History
}

interface ActionTodoState {
  file: any
  uploadState: UploadState
  newTodoTitle: string
  todo: Todo
}

export default class ActionTodo extends React.PureComponent<
  ActionTodoProps,
  ActionTodoState
> {
  state: ActionTodoState = {
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
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodoTitle = event.target.value
    this.setState({ newTodoTitle })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const todoId = this.props.match.params.todoId
    const isCreation = todoId === 'create-todo'
    try {
      if (!this.state.newTodoTitle) {
        alert('Todo title is empty')
        return
      }

      if (!this.state.file && isCreation) {
        alert('File should be selected')
        return
      }

      const idToken = this.props.auth.getIdToken()
      if (isCreation) {
        const dueDate = this.calculateDueDate()

        const newTodo = await createTodo(idToken, {
          name: this.state.newTodoTitle,
          dueDate
        })

        this.setUploadState(UploadState.FetchingPresignedUrl)
        const uploadUrl = await getUploadUrl(
          this.props.auth.getIdToken(),
          newTodo.todoId
        )

        this.setUploadState(UploadState.UploadingFile)
        await uploadFile(uploadUrl, this.state.file)

        alert('File was uploaded!')
      } else {
        const { name, dueDate, done } = await getTodoById(idToken, todoId)

        await patchTodo(this.props.auth.getIdToken(), todoId, {
          name: this.state.newTodoTitle || name,
          dueDate: this.state.todo.dueDate || dueDate,
          done: this.state.todo.done || done
        })
        alert('Updated successfully')
      }

      this.props.history.push('/')
    } catch (e) {
      alert('Could not upload a file: ' + (e as Error).message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd HH:mm') as string
  }

  render() {
    return (
      <div>
        <h1>
          {this.props.match.params.todoId === 'create-todo'
            ? 'Create a new todo'
            : 'Edit todo'}
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input
              type="text"
              placeholder="Input your todo..."
              onChange={this.handleTitleChange}
            />
          </Form.Field>

          {this.props.match.params.todoId === 'create-todo' && (
            <Form.Field>
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                placeholder="Image to upload"
                onChange={this.handleFileChange}
              />
            </Form.Field>
          )}

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && (
          <p>Uploading image metadata</p>
        )}
        {this.state.uploadState === UploadState.UploadingFile && (
          <p>Uploading file</p>
        )}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
          color="green"
          icon
        >
          <Icon name="save" /> Save
        </Button>
      </div>
    )
  }
}
