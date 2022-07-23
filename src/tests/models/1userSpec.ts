import { User } from '../../models/user';
import { UserTestType } from '../../types/types';

const user = new User();

describe('Model User functions tests', () => {
  it('Test createUser Method in different', async () => {
    const result: UserTestType = await user.createUser({
      id: 1,
      userName: 'Abdo',
      password: 'admin',
      firstName: 'Abdelrahman',
      lastName: 'Magdy',
    });
    expect(result).toBeInstanceOf(Object);
  });

  it('Test showUser Method in different', async () => {
    const result: UserTestType = await user.showUser(1);
    expect(result.user_name).toEqual('Abdo');
    expect(result.user_name).not.toEqual('Abdooooooo');
    expect(result.first_name).not.toEqual('Abdooooooo');
    expect(result.last_name).toEqual('Magdy');
    expect(result.last_name).not.toEqual('Abdooooooo');
    expect(result).toBeInstanceOf(Object);
  });

  it('Test index Method return', async () => {
    const result: UserTestType[] = await user.index();
    expect(result).toBeInstanceOf(Array);
  });

  it('Test showUser Method in different', async () => {
    const result: UserTestType = await user.showUser(1000000);
    expect(result).toBeUndefined();
  });

  it('Test updateUser Method in different ways', async () => {
    const result: UserTestType = await user.updateUser(1, {
      userName: 'Alaa',
      firstName: 'Abdelrahman',
      lastName: 'Magdy',
    });
    expect(result.user_name).toEqual('Alaa');
    expect(result.user_name).not.toEqual('Abdo');
    expect(result).toBeInstanceOf(Object);
  });

  it('Method createUser should be defined and create user correctly', () => {
    expect(user.createUser).toBeDefined();
  });
  it('Method updateUser should be defined and update user correctly', () => {
    expect(user.updateUser).toBeDefined();
  });
  it('Method index should be defined and retrieve all users', () => {
    expect(user.index).toBeDefined();
  });
  it('Method showUser should be defined and retrieve all users', () => {
    expect(user.showUser).toBeDefined();
  });
});
