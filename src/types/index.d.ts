declare namespace FetchedDataTypes {
  type TProductId = number;
  interface IProduct {
    id: TProductId;
    title: string;
    price: number;
    video: null;
    created_at: Date;
    updated_at: Date;
    category_id: number;
    description: null;
    image: DetailImage1;
    status: string;
    reviews_average: string;
    reviews_count: null;
    view_count: number;
    zipcode: null;
    address1: null;
    address2: null;
    start_at: null;
    end_at: null;
    _type: null;
    lat: null;
    lng: null;
    brand_id: number;
    competitor_price: number;
    shipping: number;
    admin_user_id: null;
    video_link: null;
    detail_image1: DetailImage1;
    detail_image2: DetailImage1;
    main_image: null;
    item_status: string;
    size_array: any[];
    detail_images: DetailImage1[];
    item_type: string;
    item_link: string;
    style_image: DetailImage1;
    influencer_show: boolean;
    liked_at: null;
    likes_count: number;
    books_count: number;
    musinsa_id: number;
    tag_list: string[];
  }

  interface DetailImage1 {
    url: null | string;
    thumb: Banner;
    square: Banner;
    banner: Banner;
    small_banner: Banner;
  }

  interface Banner {
    url: null | string;
  }
}
