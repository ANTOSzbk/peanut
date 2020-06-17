CREATE TABLE "public"."reactionMessagesDev"("guild" text NOT NULL, "message" text NOT NULL, "reactions" jsonb NOT NULL DEFAULT jsonb_build_object(), PRIMARY KEY ("guild") );
