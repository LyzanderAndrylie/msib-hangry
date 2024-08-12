import { User } from '@/db';

type UserParseResult =
  | { result: true; data: Pick<User, 'name' | 'email' | 'dateOfBirth'> }
  | { result: false; error: string };

type UserPartialParseResult =
  | {
      result: true;
      data: Partial<Pick<User, 'name' | 'email' | 'dateOfBirth'>>;
    }
  | { result: false; error: string };

export function parseUser(user: Partial<User>): UserParseResult {
  const { name, email, dateOfBirth } = user;

  if (!name || name.length <= 0) {
    return { result: false, error: 'Name is required and cannot be empty' };
  }

  if (!email || email.length <= 0) {
    return { result: false, error: 'Email is required and cannot be empty' };
  }

  if (email.indexOf('@') === -1) {
    return { result: false, error: 'Email must be valid' };
  }

  if (!dateOfBirth || new Date(dateOfBirth).toString() === 'Invalid Date') {
    return {
      result: false,
      error: 'Date of birth is required and must be valid',
    };
  }

  return {
    result: true,
    data: { name, email, dateOfBirth: new Date(dateOfBirth) },
  };
}

export function parsePartialUser(user: Partial<User>): UserPartialParseResult {
  const { name, email, dateOfBirth } = user;

  if (!name && !email && !dateOfBirth) {
    return { result: false, error: 'At least one field is required' };
  }

  if (name && name.length <= 0) {
    return { result: false, error: 'Name cannot be empty' };
  }

  if (email) {
    if (email.length <= 0) {
      return { result: false, error: 'Email cannot be empty' };
    }

    if (email.indexOf('@') === -1) {
      return { result: false, error: 'Email must be valid' };
    }
  }

  if (dateOfBirth && new Date(dateOfBirth).toString() === 'Invalid Date') {
    return {
      result: false,
      error: 'Date of birth must be valid',
    };
  }

  const data = {
    ...(name && { name }),
    ...(email && { email }),
    ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
  };

  return { result: true, data: data };
}
