--! Previous: -
--! Hash: sha1:7e19970c3610165f389480707ed12422b25d446e

drop schema if exists public cascade;
create schema public;

drop table if exists public.stations;
create table public.stations (
  id serial primary key,
  planet_name text
);
