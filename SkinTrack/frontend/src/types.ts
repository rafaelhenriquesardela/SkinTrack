export type SkinType = 'oleosa' | 'seca' | 'mista' | 'normal';
export type Concern = 'acne' | 'manchas' | 'hidratacao' | 'ressecamento';
export type RoutinePreference = 'completa' | 'so-noite' | 'minimalista';

export interface RoutineItem {
  momento: 'manhã' | 'noite';
  produtos: string[];
}

export interface SkinProfile {
  skinType: SkinType;
  age: number;
  concerns: Concern[];
  routinePreference: RoutinePreference;
}

export interface User {
  id: string;
  name: string;
  email: string;
  skinProfile: SkinProfile;
  routine: RoutineItem[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignupResponse {
  message: string;
  email: string;
}
