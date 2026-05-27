-- ============================================================
-- Qistaniya Restaurant – Supabase SQL Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── CATEGORIES ──────────────────────────────────────────────
create table if not exists public.categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  slug       text not null unique,
  icon       text not null default '🍽️',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ─── MENU ITEMS ──────────────────────────────────────────────
create table if not exists public.menu_items (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  description  text not null default '',
  price        numeric(10,2) not null check (price >= 0),
  category_id  uuid references public.categories(id) on delete set null,
  image_url    text not null default '',
  is_veg       boolean not null default false,
  is_spicy     boolean not null default false,
  is_available boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists idx_menu_items_category on public.menu_items(category_id);
create index if not exists idx_menu_items_available on public.menu_items(is_available);

-- ─── ORDERS ──────────────────────────────────────────────────
create table if not exists public.orders (
  id                   uuid primary key default uuid_generate_v4(),
  customer_name        text not null check (length(trim(customer_name)) >= 1 and length(customer_name) <= 100),
  customer_phone       text not null check (customer_phone ~ '^[0-9\s\+\-]{10,15}$'),
  customer_email       text check (customer_email is null or customer_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  items                jsonb not null default '[]'::jsonb,
  total_amount         numeric(10,2) not null check (total_amount >= 0),
  status               text not null default 'pending'
                         check (status in ('pending','preparing','ready','delivered')),
  special_instructions text check (special_instructions is null or length(special_instructions) <= 500),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created on public.orders(created_at desc);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ─── RESERVATIONS ────────────────────────────────────────────
create table if not exists public.reservations (
  id              uuid primary key default uuid_generate_v4(),
  customer_name   text not null check (length(trim(customer_name)) >= 1 and length(customer_name) <= 100),
  customer_phone  text not null check (customer_phone ~ '^[0-9\s\+\-]{10,15}$'),
  customer_email  text check (customer_email is null or customer_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  date            date not null check (date >= current_date),
  time            text not null,
  guest_count     integer not null check (guest_count >= 1 and guest_count <= 50),
  special_request text check (special_request is null or length(special_request) <= 500),
  status          text not null default 'pending'
                    check (status in ('pending','confirmed','cancelled')),
  created_at      timestamptz not null default now()
);

create index if not exists idx_reservations_date on public.reservations(date);
create index if not exists idx_reservations_status on public.reservations(status);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

-- Categories: public read
alter table public.categories enable row level security;
create policy "categories_public_read"
  on public.categories for select using (true);

-- Menu items: public read
alter table public.menu_items enable row level security;
create policy "menu_items_public_read"
  on public.menu_items for select using (is_available = true);

-- Orders: anyone can insert; only authenticated staff can read/update
alter table public.orders enable row level security;
create policy "orders_anon_insert"
  on public.orders for insert with check (true);
create policy "orders_auth_read"
  on public.orders for select using (auth.role() = 'authenticated');
create policy "orders_auth_update"
  on public.orders for update using (auth.role() = 'authenticated');

-- Reservations: anyone can insert; only staff can read
alter table public.reservations enable row level security;
create policy "reservations_anon_insert"
  on public.reservations for insert with check (true);
create policy "reservations_auth_read"
  on public.reservations for select using (auth.role() = 'authenticated');

-- ─── REALTIME ────────────────────────────────────────────────
-- Enable realtime for orders (for staff dashboard live updates)
alter publication supabase_realtime add table public.orders;

-- ─── SEED DATA ───────────────────────────────────────────────
insert into public.categories (name, slug, icon, sort_order) values
  ('Arabic Specials',  'arabic',    '🌙', 1),
  ('Mughlai Delights', 'mughlai',   '👑', 2),
  ('Tandoor Treasures','tandoor',   '🔥', 3),
  ('Indian Curries',   'indian',    '🍛', 4),
  ('Chinese Fusion',   'chinese',   '🥢', 5),
  ('Desserts',         'desserts',  '🍮', 6),
  ('Beverages',        'beverages', '🥤', 7)
on conflict (slug) do nothing;

-- Insert menu items using category slugs
with cats as (select id, slug from public.categories)
insert into public.menu_items (name, description, price, category_id, image_url, is_veg, is_spicy, sort_order)
select
  item.name, item.description, item.price,
  cats.id, item.image_url, item.is_veg, item.is_spicy, item.sort_order
from cats, (values
  -- Arabic Specials
  ('Mandi Lamb','Slow-cooked whole lamb on fragrant basmati with saffron and Arabic spices',850,'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',false,false,'arabic',1),
  ('Chicken Kabsa','Traditional Saudi rice dish with tender chicken and caramelised onions',580,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',false,false,'arabic',2),
  ('Ouzi Rice','Festive slow-roasted lamb shank over golden saffron rice with pine nuts',780,'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',false,false,'arabic',3),
  ('Hummus Special','Silky smooth hummus topped with olive oil, warm chickpeas and paprika',220,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',true,false,'arabic',4),
  ('Fattoush Salad','Crispy pita, fresh greens, tomatoes, cucumber and sumac dressing',240,'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',true,false,'arabic',5),
  ('Shawarma Plate','Rotisserie chicken shawarma with garlic sauce and pickled turnips',380,'https://images.unsplash.com/photo-1623945027004-5a2e4d1bb7d7?w=800',false,true,'arabic',6),
  ('Mutton Mandi','Slow-roasted mutton leg over fragrant basmati with smoky Arabic broth',920,'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800',false,false,'arabic',7),
  ('Arabic Mixed Grill','Seekh kebab, chicken tikka, lamb chops and kofta with mint chutney',1100,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',false,true,'arabic',8),
  ('Tabouleh','Fine-chopped parsley, bulgur wheat, tomatoes, mint and lemon',200,'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',true,false,'arabic',9),
  ('Lamb Kofta','Spiced minced lamb kofta with tzatziki, warm pita and garden salad',460,'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800',false,true,'arabic',10),
  ('Maqluba','Upside-down rice dish with lamb, roasted aubergine and caramelised onion',620,'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',false,false,'arabic',11),
  ('Chicken Musakhan','Sumac-roasted chicken with caramelised onions on flatbread with almonds',520,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',false,false,'arabic',12),
  ('Baba Ganoush','Fire-roasted aubergine blended with tahini, garlic and lemon',210,'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800',true,false,'arabic',13),
  ('Falafel Platter','Crispy herbed falafel with hummus, fattoush and warm pita',280,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',true,false,'arabic',14),
  ('Harees','Slow-cooked wheat and chicken porridge scented with cardamom and ghee',340,'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800',false,false,'arabic',15),
  -- Mughlai
  ('Murgh Musallam','Whole chicken slow-cooked in a royal Mughal gravy with aromatic spices',880,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',false,true,'mughlai',1),
  ('Dum Biryani','Fragrant basmati sealed with slow-cooked lamb, saffron milk and rose water',520,'https://images.unsplash.com/photo-1563379091339-03246963d651?w=800',false,true,'mughlai',2),
  ('Shahi Paneer','Cottage cheese in a creamy cashew-tomato gravy with whole spices',380,'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',true,false,'mughlai',3),
  ('Nihari','Slow-cooked lamb shank stew with wheat flour and garnished with coriander',580,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',false,true,'mughlai',4),
  ('Lamb Rogan Josh','Classic Kashmiri curry with bone-in lamb in Kashmiri chillies and spices',560,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',false,true,'mughlai',5),
  ('Haleem','Lentil and slow-cooked mutton porridge with caramelised onion and lime',380,'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800',false,true,'mughlai',6),
  ('Qorma','Braised mutton in fragrant yoghurt sauce enriched with almonds and saffron',540,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',false,false,'mughlai',7),
  ('Veg Biryani','Seasonal vegetables slow-cooked with saffron rice and royal Mughal spices',360,'https://images.unsplash.com/photo-1563379091339-03246963d651?w=800',true,false,'mughlai',8),
  ('Paya Shorba','Rich lamb trotter soup slow-cooked overnight with ginger and whole spices',320,'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',false,true,'mughlai',9),
  -- Tandoor
  ('Chicken Tikka','Boneless chicken in yoghurt-spice blend charred in the clay tandoor',380,'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800',false,true,'tandoor',1),
  ('Seekh Kebab','Minced lamb with herbs and spices hand-formed on skewers and grilled',420,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',false,true,'tandoor',2),
  ('Paneer Tikka','Thick-cut cottage cheese in saffron-yoghurt charred to perfection',360,'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',true,false,'tandoor',3),
  ('Lamb Chops','Rack of lamb marinated 24 hours with raw papaya and garam masala',780,'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800',false,true,'tandoor',4),
  ('Tandoori Fish','Whole sea bass in green herb paste cooked in the clay oven',560,'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',false,false,'tandoor',5),
  ('Murgh Malai Tikka','Soft creamy chicken in mild cashew-cream marinade from the tandoor',420,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',false,false,'tandoor',6),
  ('Hara Bhara Kebab','Spinach and potato patties with peas, coriander and mint',280,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',true,false,'tandoor',7),
  ('Galouti Kebab','Lucknawi melt-away kebab with 100 spices on warm roti',460,'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800',false,false,'tandoor',8),
  ('Tandoori Jhinga','Jumbo prawns in yoghurt-ajwain marinade charred in the clay oven',680,'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',false,true,'tandoor',9),
  ('Naan Basket','Assorted naans — plain, butter, garlic and Kashmiri, baked fresh',180,'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800',true,false,'tandoor',10),
  ('Stuffed Kulcha','Fluffy bread stuffed with spiced potato and onion, baked in tandoor',160,'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800',true,false,'tandoor',11),
  -- Indian Curries
  ('Butter Chicken','Classic Delhi-style murgh makhani in velvety tomato-cream sauce',420,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',false,false,'indian',1),
  ('Dal Makhani','Black lentils slow-cooked overnight with butter and cream',320,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',true,false,'indian',2),
  ('Palak Paneer','Cottage cheese cubes in smooth spinach gravy with garlic and ginger',340,'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',true,false,'indian',3),
  ('Mutton Curry','Bone-in goat curry slow-cooked in rich onion-tomato masala',480,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',false,true,'indian',4),
  ('Prawn Masala','Coastal prawns in bold tomato-coconut masala with curry leaves',560,'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',false,true,'indian',5),
  ('Chole Bhature','Spicy Punjabi chickpea curry with deep-fried fluffy bhature',280,'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',true,true,'indian',6),
  ('Fish Curry','Pomfret in tangy Goan-style coconut gravy with kokum and green chillies',480,'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',false,true,'indian',7),
  ('Kadai Paneer','Paneer and peppers in boldly spiced tomato-onion karahi',360,'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',true,true,'indian',8),
  ('Chicken Kali Mirch','Boneless chicken in black pepper cream sauce — fragrant and warming',400,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',false,true,'indian',9),
  ('Lamb Keema Matar','Minced lamb with fresh peas in tomato-onion masala',420,'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',false,true,'indian',10),
  -- Chinese Fusion
  ('Chicken Manchurian','Crispy chicken balls in tangy Indo-Chinese sauce with spring onions',360,'https://images.unsplash.com/photo-1563379091339-03246963d651?w=800',false,true,'chinese',1),
  ('Fried Rice Special','Wok-tossed egg fried rice with prawns, chicken and soy sauce',320,'https://images.unsplash.com/photo-1563379091339-03246963d651?w=800',false,false,'chinese',2),
  ('Veg Spring Rolls','Crispy golden rolls stuffed with shredded vegetables and vermicelli',220,'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',true,false,'chinese',3),
  ('Honey Chilli Potato','Crispy baby potatoes in sweet-spicy honey chilli glaze',260,'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',true,true,'chinese',4),
  ('Kung Pao Chicken','Classic chicken with dried chillies, peanuts and sweet-savoury sauce',380,'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',false,true,'chinese',5),
  ('Chicken Hakka Noodles','Stir-fried egg noodles with chicken, vegetables and soy-chilli sauce',300,'https://images.unsplash.com/photo-1563379091339-03246963d651?w=800',false,true,'chinese',6),
  ('Veg Dim Sum Platter','Steamed and pan-fried dumplings with vegetables and tofu',280,'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',true,false,'chinese',7),
  ('Prawn in Schezwan','Tiger prawns in fiery Schezwan sauce with peppers and garlic',480,'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',false,true,'chinese',8),
  ('Hot & Sour Soup','Classic broth with mushrooms, tofu, vinegar and white pepper',200,'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',true,true,'chinese',9),
  ('Sweet Corn Chicken Soup','Creamy chicken and sweet corn with spring onions and white pepper',190,'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',false,false,'chinese',10),
  -- Desserts
  ('Umm Ali','Egyptian bread pudding with croissant, nuts, raisins and cream',280,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',1),
  ('Kunafa','Arabic crispy shredded pastry with sweet cream cheese and rose water syrup',260,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',2),
  ('Baklava Assortment','Pistachio and walnut filo pastry in honey-lemon syrup',320,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',3),
  ('Gulab Jamun','Soft milk-solid dumplings in cardamom-saffron syrup with rabri',180,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',4),
  ('Phirni','Slow-cooked ground rice pudding with saffron and rose water in clay pots',200,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',5),
  ('Basbousa','Semolina cake in rose water and honey syrup topped with almonds',220,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',6),
  ('Qistaniya Signature Halwa','Legendary slow-cooked wheat halwa with saffron and pure ghee',260,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',7),
  ('Mango Kulfi','Dense Indian ice cream with Alphonso mango and saffron on a stick',160,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',8),
  ('Qatayef','Stuffed Arabic pancakes filled with cream and walnuts, deep-fried',220,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',9),
  ('Muhallabia','Delicate rose water milk pudding with pistachios and dried rose petals',180,'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',true,false,'desserts',10),
  -- Beverages
  ('Arabic Qahwa','Cardamom-infused Arabic coffee served with dates in traditional style',120,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',1),
  ('Saffron Latte','Warm milk with premium saffron, honey and a touch of rose water',180,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',2),
  ('Mango Lassi','Thick Alphonso mango purée blended with yoghurt and cardamom',160,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',3),
  ('Rose Sharbat','Chilled rose syrup with basil seeds, lemon and cardamom',140,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',4),
  ('Jallab','Levantine drink with grape, rose water and pomegranate syrup',150,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',5),
  ('Mint Lemonade','Freshly squeezed lemon with crushed ice and fresh mint',120,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',6),
  ('Masala Chai','Traditional spiced Indian tea with ginger, cardamom and cloves',80,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',7),
  ('Fresh Fruit Juice','Seasonal fresh-pressed juice — orange, watermelon or pomegranate',160,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',8),
  ('Badam Milk','Chilled almond milk with saffron, pistachio and rose water',160,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',9),
  ('Virgin Mojito','Sparkling water with muddled mint, lime wedges and crushed ice',140,'https://images.unsplash.com/photo-1522992319-0365cf27b5eb?w=800',true,false,'beverages',10)
) as item(name, description, price, image_url, is_veg, is_spicy, cat_slug, sort_order)
where cats.slug = item.cat_slug;

-- ─── VERIFY ──────────────────────────────────────────────────
select
  (select count(*) from public.categories)   as categories,
  (select count(*) from public.menu_items)   as menu_items,
  (select count(*) from public.orders)       as orders,
  (select count(*) from public.reservations) as reservations;
