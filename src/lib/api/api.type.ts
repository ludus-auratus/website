import { Session } from "next-auth";

export type ApiResponseBody<TData = unknown, TError = string> =
  | {
      success: true;
      data: TData;
      error?: never;
    }
  | {
      success: false;
      data?: never;
      error: TError;
    };

export interface DetailedSession extends Session {
  user: Session["user"] & {};
}
