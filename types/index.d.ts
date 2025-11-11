export interface Food {
  id: string ;
  createdAt?: string | number;

  image?: string;
  logo?: string;

  name?: string;
  rating?: number | string;

  Price?: number | string;

  open?: boolean;
}
