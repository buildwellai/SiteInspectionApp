create table blocks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  type text not null check (type in ('ApartmentBlock', 'DetachedHouses', 'SemiDetachedHouses', 'TerracedHouses', 'CommercialUnits')),
  quantity integer not null default 1,
  start_date date not null,
  substructure_date date not null,
  superstructure_date date not null,
  completion_date date not null,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create trigger set_timestamp
before update on blocks
for each row
execute procedure trigger_set_timestamp();