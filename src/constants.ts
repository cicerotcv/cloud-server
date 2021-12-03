// routes
export enum AUTH {
  CREATE_ACCOUNT = "/auth/create-account",
  LOGIN = "/auth/login",
  DELETE_ACCOUNT = "/auth/delete",
  CHECK_AUTH = "/auth"
}

export enum TASKS {
  LIST_TASKS = "/tasks",
  GET_TASK = "/task/:taskId",
  DELETE_TASK = "/task/:taskId",
  CREATE_TASK = "/task",
  UPDATE_TASK = "/task/:taskId"
}

// headers
export enum HEADERS {
  AUTH = "x-authorization"
}
