export enum Method {
  CreateSession = "createsession",
}

export enum Platform {
  SmitePC = "SMITE_PC",
}

export interface SessionResponse {
  ret_msg: string;
  session_id: string;
  timestamp: string;
}