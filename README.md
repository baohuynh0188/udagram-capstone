# Serverless TODO App
This is capstone serverless project

*endpoints:*
 * GET - https://ai36st6cxl.execute-api.us-east-1.amazonaws.com/dev/todos
 * POST - https://ai36st6cxl.execute-api.us-east-1.amazonaws.com/dev/todos
 * PATCH - https://ai36st6cxl.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}
 * DELETE - https://ai36st6cxl.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}
 * POST - https://ai36st6cxl.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}/attachment
 * wss://d6kfet1qrk.execute-api.us-east-1.amazonaws.com/dev

# PROJECT SPECIFICATION
(Option 1): Container
On DockerHub images for the application are available
- [DockerHub](https://hub.docker.com/repository/docker/baohuynh0188/client/general)
<img width="1127" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/c92e7fd1-4c16-47a4-83a5-daa925e6a80d">
There is a Dockerfile in repo and the docker image can be build
<img width="493" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/9be17c1a-523f-41fc-a29f-730396588844">
<img width="878" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/62f90c45-0024-43f8-8267-c1560d0cef67">
Starting the app as a container on a local system
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/efe5ab48-81be-4a3c-9e4d-e28195471de9">

(Option 2): Functionality
<img width="1124" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/913cda47-ee94-48aa-8253-fdb949558546">
A user of the web application can use the interface to create, delete and complete an item.
- Create
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/aa4964a3-c066-4980-a259-843b3c6352f5">
- Update image
A user of the web interface can click on a "pencil" button, then select and upload a file. A file should appear in the list of items on the home page.
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/f0675424-15f9-4ec7-a953-1e5fb0dadcd2">

- Mark as done
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/f0f36bb2-a977-41e8-bb66-bbce5600552a">

- Delete
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/3f8e8705-e6b2-4888-b00d-e30a59c9836a">


If you log out from a current user and log in as a different user, the application should not show items created by the first account.
- Current user 
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/43f43f68-4abe-48b2-9e9a-487d968025fc">
- A different user
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/ba5f8c37-0f04-4dc5-874b-8ad621e63e47">
A user needs to authenticate in order to use an application.
<img width="735" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/1e61e476-8969-43d1-9516-e01a30c00e45">

(Option 2):Codebase
<img width="1127" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/c09d8e25-29a3-45db-b084-afd5665fc778">
Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access, file storage, and code related to AWS Lambda.
To get results of asynchronous operations, a student is using async/await constructs instead of passing callbacks.

(Option 2):Best practices
<img width="1148" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/687f12ec-7f39-4d8a-af3a-3574c11a3cda">

(Option 2):Architecture
<img width="1128" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/545e5aeb-2acd-40c1-b009-de91281c308d">

Websocket

<img width="801" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/a2e83001-f49a-4e52-aa10-b6c5fa9472bd">

Resize image
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/a96c4a7d-e7be-4a45-bbb6-6fc4e07fa9e8">
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/a734a977-5d03-4522-803e-418962c4af1e">

CloudWatch
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/26503c89-06c9-4118-a792-077f3f032ee6">

Lambda
<img width="1440" alt="image" src="https://github.com/baohuynh0188/udagram-capstone/assets/44991601/02b48228-ac95-4c3e-a5ff-0c2687b3032e">
