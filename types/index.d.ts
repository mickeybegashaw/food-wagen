export interface Food {
  id: string;
  createdAt?: string | number;

  image?: string;
  logo?: string;

  name?: string;
  rating?: string;

  Price?: number | string;

  open?: boolean;
}

export interface FormData {
  foodName: string;
  foodRating: string;
  foodImage: string;
  restaurantName: string;
  restaurantImage: string;
  restaurantStatus: "open" | "closed";
}


interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "success" | "error" | "info"; 
  autoClose?: boolean; 
  duration?: number; 
}