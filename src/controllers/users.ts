import { Request, Response } from '@/app';
import db, { User } from '@/db';
import { parsePartialUser, parseUser } from '@/validators';

export function getUsers(req: Request, res: Response) {
  const users = db.users;

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({ data: users }));
}

export function createUser(req: Request, res: Response) {
  const parse = parseUser(req.body as Partial<User>);

  if (!parse.result) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(400);
    res.end(JSON.stringify({ data: {}, error: parse.error }));
    return;
  }

  const newUser: User = {
    id: String(db.users.length + 1),
    ...parse.data,
  };
  db.users.push(newUser);

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({ data: newUser }));
}

export function getUser(req: Request, res: Response) {
  const user = db.users.find((user) => user.id === req.params?.id);

  if (!user) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ data: {}, error: 'User not found' }));
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({ data: user }));
}

export function updateUser(req: Request, res: Response) {
  const parse = parseUser(req.body as Partial<User>);

  if (!parse.result) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(400);
    res.end(JSON.stringify({ data: {}, error: parse.error }));
    return;
  }

  const updatedUser = db.users.find((user) => user.id === req.params?.id);

  if (!updatedUser) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ data: {}, error: 'User not found' }));
    return;
  }

  updatedUser.name = parse.data.name;
  updatedUser.email = parse.data.email;
  updatedUser.dateOfBirth = parse.data.dateOfBirth;

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({ data: updatedUser }));
}

export function updatePartialUser(req: Request, res: Response) {
  const parse = parsePartialUser(req.body as Partial<User>);

  if (!parse.result) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(400);
    res.end(JSON.stringify({ data: {}, error: parse.error }));
    return;
  }

  const updatedUser = db.users.find((user) => user.id === req.params?.id);

  if (!updatedUser) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ data: {}, error: 'User not found' }));
    return;
  }

  updatedUser.name = parse.data.name ?? updatedUser.name;
  updatedUser.email = parse.data.email ?? updatedUser.email;
  updatedUser.dateOfBirth = parse.data.dateOfBirth ?? updatedUser.dateOfBirth;

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({ data: updatedUser }));
}

export function deleteUser(req: Request, res: Response) {
  const deletedUser = db.users.find((user) => user.id === req.params?.id);

  if (!deletedUser) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ data: {}, error: 'User not found' }));
    return;
  }

  const index = db.users.indexOf(deletedUser);
  db.users.splice(index, 1);

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({ data: deletedUser }));
}
