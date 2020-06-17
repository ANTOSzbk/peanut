ALTER TABLE "public"."reactionMessagesDev" ADD COLUMN "guild" text;
ALTER TABLE "public"."reactionMessagesDev" ALTER COLUMN "guild" DROP NOT NULL;
