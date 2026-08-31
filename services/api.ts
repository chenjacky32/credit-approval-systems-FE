import { LoginDTO, RegisterDTO } from "@/schemas/auth";
import { CreateSubmissionDTO } from "@/schemas/submission";
import axios from "axios";

// Types
export type StatusType = "SUBMIT" | "APPROVE" | "REJECT";
export type SubmissionType = "MOTORCYCLE" | "CAR" | "MULTIPURPOSE";

export interface Submission {
  id: number;
  fullName: string;
  type: SubmissionType;
  amount: number;
  tenor: number;
  monthlyBilling: number;
  submittedAt: string;
  status: StatusType;
}

export interface Meta {
  page: number;
  size: number;
  totalRecord: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface ListResponse<T> {
  status: string;
  message: string;
  meta: Meta;
  data: T[];
}

export interface DetailResponse<T> {
  status: string;
  message: string;
  data: T;
}


// Axios Instance
const Http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // Fallback local mock API
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
Http.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Services
export const submissionService = {
  // Register
  register: async (payload: RegisterDTO) => {
    const { data } = await Http.post("/auth/register", payload);
    return data;
  },

  // Login
  login: async (payload: LoginDTO) => {
    const { data } = await Http.post("/auth/login", payload);
    return data;
  },

  // Get all submissions with pagination & filter
  getList: async (params?: Record<string, any>) => {
    const { data } = await Http.get(`/submission`,{params});
    return data;
  },

  // Get detail
  getDetail: async (id: number | string) => {
    const { data } = await Http.get(`/submission/${id}`);
    return data.data;
  },

  // Create submission
  create: async (payload: CreateSubmissionDTO) => {
    const { data } = await Http.post("/submission", payload);
    return data;
  },

  // Update status
  updateStatus: async (id: number | string, status: StatusType) => {
    const { data } = await Http.patch(`/submission/${id}/status`, { status });
    return data;
  },
};
