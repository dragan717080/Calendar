export interface AuthStore {
  authToken: string | null;
  error: string | null;
  email: string | null;
  setAuthToken: (authToken: string | null) => void;
  setError: (error: string | null) => void;
  setEmail: (email: string | null) => void;
}
