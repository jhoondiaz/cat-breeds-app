export interface CatBreed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  image?: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
  images?: CatImage[];
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatBreedSearchParams {
  limit?: number;
  page?: number;
  attach_breed?: number;
}