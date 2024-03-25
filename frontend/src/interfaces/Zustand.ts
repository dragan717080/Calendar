export interface AuthStore {
  authToken: string | null;
  error: string | null;
  username: string | null;
  setAuthToken: (authToken: string | null) => void;
  setError: (error: string | null) => void;
  setUsername: (username: string | null) => void;
}
