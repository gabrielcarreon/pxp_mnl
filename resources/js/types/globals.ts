export type PaginationType<TData> = {
  current_page: number;
  data: TData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
};

export type PaginationLinks = {
  active: boolean;
  label: string;
  page?: number;
  url?: string;
};

export type DataTableConfig = {
  route: string;
  search?: SearchConfig;
  pagination?: PaginationConfig;
  key?: {
    [key: string]: unknown;
  };
  params?: {
    [key: string]: unknown;
  };
  options?: {
    [key: string]: unknown;
  };
  table?: (table: any) => void;
};

export type PaginationConfig = {
  render: boolean;
  styles?: {
    wrapper?: string;
  };
};

export type SearchConfig = {
  render: boolean;
  styles?: {
    wrapper?: string;
  };
};

export type Media = {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
};

export type Team = {
  file_url: any;
  id?: number;
  created_at?: string;
  updated_at?: string;
  team_name: string;
  abbr: string;
  coach_name: string;
  team_code: string;
  slug: string;
  home_arena: string;
  year_founded: string;
  is_active: number;
  deleted_at?: null | string;
  media?: Media[];
};

export type Season = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  slug: string;
  season_name: string;
  year: number;
  start_date: string;
  end_date: string;
  status: string;
  deleted_at?: null | string;
};

export type Game = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  home_team_id: number;
  away_team_id: number;
  game_date_at: string;
  venue: string;
  season_id: number;
  game_code: string;
  slug: string;
  starts_at: string;
  ends_at: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'postponed' | 'cancelled';
  home_score: number;
  away_score: number;
  winner_team_id: number;
  official_minutes: number;
  deleted_at?: null | string;
  home_team: Team;
  away_team: Team;
};

export type Category = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  parent_id?: Category['id'];
  name: string;
  slug: string;
  description: string;
  status: string;
  deleted_at?: string;
};

export type Warehouse = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  location: string;
  status: string;
  deleted_at?: string;
  is_default: boolean;
};

export type Video = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  title: string;
  description: string;
  category: string;
  game_id?: number;
  team_id?: number;
  player_id?: number;
  duration_in_seconds: number;
  views: number;
  likes: number;
  user_id: number;
  status: string;
  deleted_at?: string;
};

export type Comment = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  model_type: string;
  model_id: number;
  user_type: string;
  user_id: number;
  parent_id: number | null;
  comment: string;
  status: 'flagged' | 'hidden' | 'active';
  deleted_at?: string;
};

export type Voucher = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  type: 'voucher' | 'promo_code';
  code: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: string;
  min_purchase: string;
  max_discount: string;
  usable_starts_at: string;
  usable_ends_at: string;
  is_public: number;
  claimable_starts_at: string;
  claimable_ends_at: string;
  total_claim_limit: number;
  total_claimed_count: number;
  claimable_per_user: number;
  usage_limit: number;
  per_user_limit: number;
  status: 'active' | 'expired' | 'inactive' | 'draft';
  created_by_user_id: number;
  deleted_at?: string;
};

export type VoucherClaim = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  voucher_id: number;
  claimed_by_user_type: string;
  claimed_by_user_id: number;
  claimed_at: string;
  claim_source: 'manual' | 'event' | 'referral' | 'promo_code';
  status: 'claimed' | 'used' | 'expired' | 'revoked';
  deleted_at?: string;
};
