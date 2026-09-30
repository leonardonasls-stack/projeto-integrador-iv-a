-- Configurações do site (linha única)
create table site_settings (
  id int primary key default 1 check (id = 1),
  name text, role text, status_badge text,
  hero_title_prefix text, hero_title_highlight text, hero_description text,
  about_bio text,
  academic_title text, academic_institution text, academic_period text,
  tech_pillar1_title text, tech_pillar1_desc text,
  tech_pillar2_title text, tech_pillar2_desc text,
  email text, github_url text, linkedin_url text,
  projects_title text, projects_subtitle text,
  skills_title text, skills_subtitle text,
  contact_title text, contact_subtitle text,
  footer_text text,
  updated_at timestamptz default now()
);

-- Projetos / repositórios
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  full_description text,
  category text not null
    check (category in ('Frontend','Fullstack','Backend','Mobile','IHC / UX')),
  techs text[] not null default '{}',
  github_url text, demo_url text, image_url text,
  featured boolean not null default false,
  visible boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Categorias e skills
create table skill_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'Layers',
  color text not null default 'indigo',
  position int not null default 0
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references skill_categories(id) on delete cascade,
  name text not null,
  level text not null
    check (level in ('Iniciante','Intermediário','Intermediário+','Avançado')),
  description text,
  position int not null default 0
);

-- Mensagens de contato
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 80),
  email text not null check (char_length(email) <= 200),
  subject text check (char_length(subject) <= 120),
  message text not null check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

-- Políticas RLS
do $$
declare t text;
begin
  foreach t in array array['site_settings','projects','skill_categories','skills']
  loop
    execute format('alter table %I enable row level security', t);
    
    if t = 'projects' then
      execute format('create policy "leitura publica" on %I for select using (visible or auth.uid() = ''bb22c400-e89a-4943-9073-ce81fa4703c2'')', t);
    else
      execute format('create policy "leitura publica" on %I for select using (true)', t);
    end if;

    -- ATENÇÃO: Substitua <SEU-UUID> pelo ID do administrador criado no Supabase Auth
    execute format(
      'create policy "escrita admin" on %I for all
         using (auth.uid() = ''bb22c400-e89a-4943-9073-ce81fa4703c2'')
         with check (auth.uid() = ''bb22c400-e89a-4943-9073-ce81fa4703c2'')', t);
  end loop;
end $$;

-- RLS para Mensagens
alter table messages enable row level security;
create policy "insert publico" on messages for insert with check (true);
create policy "leitura admin"  on messages for select using (auth.uid() = 'bb22c400-e89a-4943-9073-ce81fa4703c2');
create policy "delete admin"   on messages for delete using (auth.uid() = 'bb22c400-e89a-4943-9073-ce81fa4703c2');
