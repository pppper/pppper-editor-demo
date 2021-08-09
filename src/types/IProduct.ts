export type TProductId = number;
export interface IProduct {
  id: TProductId;
  title: string;
  price?: number;
  video?: null;
  created_at?: Date;
  updated_at?: Date;
  category_id?: number;
  description?: null;
  image: IImage;
  status?: string;
  reviews_average?: string;
  reviews_count?: null;
  view_count?: number;
  zipcode?: null;
  address1?: null;
  address2?: null;
  start_at?: null;
  end_at?: null;
  _type?: null;
  lat?: null;
  lng?: null;
  brand_id?: number;
  competitor_price?: number;
  shipping?: number;
  admin_user_id?: null;
  video_link?: null;
  detail_image1?: IImage;
  detail_image2?: IImage;
  main_image?: null;
  item_status?: string;
  size_array?: any[];
  detail_images?: IImage[];
  item_type?: string;
  item_link?: string;
  style_image?: IImage;
  influencer_show?: boolean;
  liked_at?: null;
  likes_count?: number;
  books_count?: number;
  musinsa_id?: number;
  tag_list?: string[];
}

interface IImage {
  url: null | string;
  thumb?: Banner;
  square?: Banner;
  banner?: Banner;
  small_banner?: Banner;
}

interface Banner {
  url?: null | string;
}
