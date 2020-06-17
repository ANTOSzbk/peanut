CREATE TABLE "public"."settingsDev"("guild" text NOT NULL, "settings" jsonb NOT NULL DEFAULT jsonb_build_object(), PRIMARY KEY ("guild") , UNIQUE ("guild"));
