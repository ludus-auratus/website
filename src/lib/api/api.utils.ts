import { ApiResponseBody } from "./api.type";

function validadeContentType(req: Request, expected: string) {
  const contentType = req.headers.get("Content-Type");
  return contentType !== expected ? createErrorResponse(400, "Invalid content type") : null;
}

export function validateJsonContentType(req: Request) {
  return validadeContentType(req, "application/json");
}

export function validateFormDataContentType(req: Request) {
  return validadeContentType(req, "multipart/form-data");
}

export function createSucessResponse<T>(data: T, status: number = 200) {
  const body: ApiResponseBody = { success: true, data };
  return new Response(JSON.stringify(body), { status });
}

export function createErrorResponse(status: number, message: string) {
  const body: ApiResponseBody = { success: false, error: message };
  return new Response(JSON.stringify(body), { status });
}
