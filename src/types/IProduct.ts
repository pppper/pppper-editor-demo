export type TProductId = number;
export interface IProduct {
  id?: number;
  title?: string;
  price?: number;
  video?: null;
  created_at?: Date;
  updated_at?: Date;
  category_id?: number;
  description?: null;
  image?: string;
  status?: Status;
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
  detail_image1?: null;
  detail_image2?: null;
  main_image?: null;
  item_status?: ItemStatus;
  size_array?: any[];
  detail_images?: string[];
  item_type?: ItemType;
  item_link?: string;
  style_image?: string;
  influencer_show?: boolean;
  liked_at?: null;
  likes_count?: number;
  books_count?: number;
  musinsa_id?: number;
  tag_list?: null;
  brand_title?: BrandTitle;
}

export enum BrandTitle {
  Archivepke = "ARCHIVEPKE",
  Bensimon = "BENSIMON",
  Branded = "BRANDED",
}

export enum ItemStatus {
  Show = "show",
}

export enum ItemType {
  Default = "default",
}

export enum Status {
  Active = "active",
}
