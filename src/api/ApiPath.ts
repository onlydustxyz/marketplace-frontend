export const BASE_API_V1 = (path: string) => `/api/v1/${path}`;

export const API_PATH = {
  SAMPLES: BASE_API_V1("samples"),
  SAMPLE_BY_ID: (id: string) => BASE_API_V1(`samples/${id}`),
};
