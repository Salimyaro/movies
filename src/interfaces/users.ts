export type User = {
  email: string;
  name: string;
  password: string;
};

export type CreateUserBody = User & { confirmPassword: string };
