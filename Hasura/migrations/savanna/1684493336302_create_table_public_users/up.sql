CREATE TABLE "public"."users" ("id" serial NOT NULL, "name" text NOT NULL, "created_at" timestamptz NOT NULL, "phone_no" numeric NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
