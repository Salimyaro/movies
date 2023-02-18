export type CreateMovieReqBody = {
  title: string;
  year: number;
  format: string;
  actors: string[];
};

export type CreateMovieBody = {
  title: string;
  year: number;
  format: string;
  id?: number;
};

export type GetMoviesQuery = {
  actor?: string;
  title?: string;
  sort?: "id" | "title" | "year";
  order?: "ASC" | "DESC";
  limit?: string;
  offset?: string;
};
