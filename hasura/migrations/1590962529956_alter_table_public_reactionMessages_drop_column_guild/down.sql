ALTER TABLE "public"."reactionMessages" ADD COLUMN "guild" text;
ALTER TABLE "public"."reactionMessages" ALTER COLUMN "guild" DROP NOT NULL;
