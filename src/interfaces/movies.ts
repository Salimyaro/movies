type Format = "DVD" | "VHS" | "Blu-ray" | string; // string for Import Movies TXT parser

export type CreateMovieReqBody = {
  title: string;
  year: number;
  format: Format;
  actors: string[];
};

export type CreateMovieBody = {
  title: string;
  year: number;
  format: Format;
  id?: number;
};

export type GetMoviesQuery = {
  actor?: string;
  title?: string;
  sort?: "id" | "title" | "year";
  order?: "ASC" | "DESC";
  limit?: number;
  offset?: number;
};
