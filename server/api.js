const routes = {
  '/api/todos/': {
    endpoint:'getAll',
    method: 'get',
  },
  '/api/todos/create': {
    endpoint: 'createItem',
    method: 'get',
  },
  '/api/todos/delete': {
    endpoint: 'deleteItem',
    method: 'get',
  },
  '/api/todos/edit': {
    endpoint: 'editItem',
    method: 'get',
  },
  '/api/todos/:id': {
    endpoint: 'getItem',
    method: 'get',
  },
  '/api/todos/:id/delete': {
    endpoint: 'deleteItem',
    method: 'post',
  },
  '/api/todos/:id/edit': {
    endpoint: 'editItem',
    method: 'put',
  },
};

module.exports = class API {
  constructor(app, todos) {
    this.app = app;
    this.todos = todos;
    this._buildRoutes();
  }

  _buildRoutes() {
    Object.keys(routes).forEach((key) => {
      let routeObj = routes[key];
      this.app[routeObj.method](key, this[routeObj.endpoint].bind(this));
    });
  }

  _jsonResponse(response, responseBody) {
    response.type('json');
    response.send(JSON.stringify(responseBody));
    return response;
  }

  _alterItem(request, response, functionRef) {
    const targetId = request.params.id || request.query.id;
    const todoObj = {
      id: targetId,
      title: request.query.title,
    };
    
    if (todoObj) {
      this.todos[functionRef](targetId, todoObj);
      return response.status(200).send('OK');
    } else {
      return response.status(404).send('Not found');
    }
  }

  getAll(request, response) {
    return this._jsonResponse(response, this.todos.getAll());
  }

  getItem(request, response) {
    const todoItem = this.todos.getItem(request.params.id);
    return this._jsonResponse(response, todoItem);
  }

  createItem(request, response) {
    if (request.query && request.query.title) {
      this.todos.createItem({title: request.query.title});
      return response.status(200).send('OK');
    } else {
      return response.status(400).send('Bad request');
    }
  }

  deleteItem(request, response) {
    this._alterItem(request, response, 'deleteItem');
  }

  editItem(request, response) {
    this._alterItem(request, response, 'editItem');
  }
}