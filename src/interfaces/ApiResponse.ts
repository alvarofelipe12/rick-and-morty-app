// API response interfaces
export interface ApiResponse<T> {
  info: PaginationInfo;
  results: T[];
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}