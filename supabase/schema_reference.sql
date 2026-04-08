-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.claim (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  location text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  email text NOT NULL,
  CONSTRAINT claim_pkey PRIMARY KEY (id)
);
CREATE TABLE public.claim_form (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  note text,
  claim_types ARRAY,
  fields jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT claim_form_pkey PRIMARY KEY (id)
);
CREATE TABLE public.content_block (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['card'::text, 'link'::text, 'steps'::text, 'list'::text, 'expandedCardsGroup'::text, 'blogEntry'::text, 'map'::text])),
  position integer NOT NULL,
  data jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  parent_id uuid,
  CONSTRAINT content_block_pkey PRIMARY KEY (id),
  CONSTRAINT content_block_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.section(id),
  CONSTRAINT content_block_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.content_block(id)
);
CREATE TABLE public.office (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  phone text,
  email text,
  schedule text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  coordinates ARRAY NOT NULL,
  CONSTRAINT office_pkey PRIMARY KEY (id)
);
CREATE TABLE public.office_section (
  office_id uuid NOT NULL,
  section_id uuid NOT NULL,
  CONSTRAINT office_section_pkey PRIMARY KEY (office_id, section_id),
  CONSTRAINT office_section_office_id_fkey FOREIGN KEY (office_id) REFERENCES public.office(id),
  CONSTRAINT office_section_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.section(id)
);
CREATE TABLE public.profile (
  id uuid NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['admin'::text, 'editor'::text])),
  full_name text,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profile_pkey PRIMARY KEY (id)
);
CREATE TABLE public.section (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  icon text NOT NULL,
  position smallint NOT NULL UNIQUE,
  CONSTRAINT section_pkey PRIMARY KEY (id)
);