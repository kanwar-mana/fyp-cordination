import apiClient from "./index";
import { User } from "@/types/auth.types";

const COORDINATOR_BASE = "/coordinator";
const GET_SUPERVISORS = `${COORDINATOR_BASE}/supervisors`;
const GET_STUDENTS = `${COORDINATOR_BASE}/students`;

export default {
  getSupervisors() {
    return apiClient.get<{ supervisors: User[] }>(GET_SUPERVISORS);
  },

  getStudents() {
    return apiClient.get<{ students: User[] }>(GET_STUDENTS);
  },
};
