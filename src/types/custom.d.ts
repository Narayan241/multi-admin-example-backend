declare namespace Express {
  export interface Request {
    currentUser?: typeof User;
    accessToken?: string;
  }
  export interface Response {
    success: (data: any, message?: string) => void;
    error: (err: any, context?: Record<string, any>) => void;
  }
}
