import AuthRepository from "./AuthRepository";
import SessionRepository from "./SessionRepository";
import UserRepository from "./UserRepository";

const repositories: Record<string, any> = {
  auth: AuthRepository,
  sessions: SessionRepository,
  users: UserRepository,
};
export default {
  get: (name: string) => {
    return repositories[name];
  },
};
