import { User } from '../models/user';
import { UserType, UserUpdatedType } from '../types/types';
import jwt, { Secret } from 'jsonwebtoken';
import { Application, Request, Response, NextFunction } from 'express';

const userInstance = new User();
const privateKey = process.env.PRIVATE_KEY as Secret;

const createUser = async (request: Request, response: Response) => {
  try {
    const userData: UserType = {
      userName: request.body.userName,
      password: request.body.password,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    };
    if (
      !userData.userName ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      response
        .status(400)
        .send(
          'BAD REQUEST... Username, Password firstName , lastName are required'
        );
      return;
    }
    const newUser: UserType = await userInstance.createUser(userData);
    const token = jwt.sign({ user: newUser }, privateKey);
    response.json({ user: newUser, token: token });
  } catch (err) {
    response.status(400).json({ message: err });
  }
};

const updateUser = async (request: Request, response: Response) => {
  try {
    const id = request.params.id as unknown as number;
    if (!id) {
      response
        .status(400)
        .send('Enter the ID of the user, you want to be updated');
      return;
    }
    const userData: UserUpdatedType = {
      userName: request.body.userName,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    };
    if (!userData.firstName || !userData.lastName || !userData.userName) {
      response
        .status(400)
        .send('BAD REQUEST... Username, firstName , lastName are required');
      return;
    }
    const updatedUser: UserUpdatedType = await userInstance.updateUser(
      id,
      userData
    );
    response.json({ user: updatedUser });
  } catch (err) {
    response.status(400);
    response.json({ message: err });
  }
};

const index = async (request: Request, response: Response) => {
  try {
    const users: UserType[] = await userInstance.index();
    response.json(users);
  } catch (err) {
    response.status(404).json({ message: err });
  }
};

const showUser = async (request: Request, response: Response) => {
  try {
    const id = request.params.id as unknown as number;
    const user: UserType = await userInstance.showUser(id);
    response.json(user);
  } catch (err) {
    response.status(404).json({ message: err });
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const userName = request.body.userName;
    const password = request.body.password;
    if (!userName || !password) {
      response
        .status(400)
        .send('BAD REQUEST Username and Password are required!!');
      return;
    }
    const signedInUser: UserType | null = await userInstance.login(
      userName,
      password
    );
    if (!signedInUser) {
      response.status(401);
      response.send('Wrong Username or Password');
    }
    const token = jwt.sign({ user: signedInUser }, privateKey);
    response.json(token);
  } catch (err) {
    response.status(404).json({ message: err });
  }
};

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const bearer = request.headers.authorization as unknown as string;
    const jwtToken = bearer.split(' ')[1];
    const decodedToken = jwt.verify(jwtToken, privateKey);
    response.locals.auth = decodedToken;
    next();
  } catch (error) {
    response.status(401).send('User NOT Authorized');
  }
};

const userRouter = (app: Application) => {
  app.post('/users', createUser);
  app.put('/users/:id', verifyToken, updateUser);
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, showUser);
  app.post('/users/login', login);
};

export default userRouter;

// All methods here are base on bringing data from body or url params
//then second step make validation all data existed and valid
//use this data in Models function.
//make sign for token in required cases and send response with both data and token
//verification token between url and fn in express instance with its methods
//The same idea with other handlers
