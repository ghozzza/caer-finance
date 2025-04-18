create table LP_Factory (
  id uuid primary key default gen_random_uuid(),
  sender text,
  collateralToken text,
  borrowToken text,
  lpAddress text,
  ltv integer,
  created_at timestamptz default now()
);
