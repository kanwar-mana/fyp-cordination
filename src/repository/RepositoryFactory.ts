import AuthRepository from "./AuthRepository";

const repositories: Record<string, any> = {
  auth: AuthRepository,
};
export default {
  get: (name: string) => {
    return repositories[name];
  },
};
