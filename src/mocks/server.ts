import { createServer, Model } from 'miragejs';


createServer({
  models: {
    todos: Model
  },
  routes() {
    this.namespace = 'api';

    this.get('/todos', (schema) => {
      return schema.all('todos');
    });

    this.post('/todos', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);

      const todo = schema.create('todos', attrs);

      return todo;
    });

    this.put('/todos/:id', (schema, request) => {
      const id = request.params.id;

      const newAttrs = JSON.parse(request.requestBody);

      const todo = schema.find('todos', id);
      todo?.update(newAttrs);

      return {};
    });

    this.delete('/todos/:id', (schema, request) => {
      const id = request.params.id;

      const todo = schema.find('todos', id);
      todo?.destroy();

      return {};
    });
  },
})
