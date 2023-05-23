alter table "public"."months" alter column "id" set default nextval('users_id_seq'::regclass);
