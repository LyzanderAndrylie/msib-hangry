import { App } from '@/app';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updatePartialUser,
  deleteUser,
} from '@/controllers';
import { JSONParser } from '@/middlewares';

const app = new App({
  prefix: '/api',
});

// Middlewares
app.use('/', JSONParser);

// Routes
app.get('/users', getUsers);
app.post('/users', createUser);
app.get('/users/:id', getUser);
app.update('/users/:id', updateUser);
app.patch('/users/:id', updatePartialUser);
app.delete('/users/:id', deleteUser);
