export type User = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
};

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    dateOfBirth: new Date('1990-01-01'),
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'janedoe@mail.com',
    dateOfBirth: new Date('1991-02-02'),
  },
];
