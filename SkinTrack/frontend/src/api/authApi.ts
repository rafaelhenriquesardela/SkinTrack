import { http } from './http';
import { AuthResponse, Concern, RoutinePreference, SignupResponse, SkinType, User } from '../types';

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  skinType: SkinType;
  age: number;
  concerns: Concern[];
  routinePreference: RoutinePreference;
}

export const signup = async (payload: SignupPayload) => {
  const { data } = await http.post<SignupResponse>('/signup', payload);
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await http.post<AuthResponse>('/login', { email, password });
  return data;
};

export const getMe = async () => {
  const { data } = await http.get<{ user: User }>('/dashboard');
  return data.user;
};

export const regenerateRoutine = async (payload: Omit<SignupPayload, 'name' | 'email' | 'password'>) => {
  const { data } = await http.put<{ user: User }>('/quiz/regenerate', payload);
  return data.user;
};
