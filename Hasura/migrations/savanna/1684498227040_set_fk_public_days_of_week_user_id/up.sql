alter table "public"."days_of_week"
  add constraint "days_of_week_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
