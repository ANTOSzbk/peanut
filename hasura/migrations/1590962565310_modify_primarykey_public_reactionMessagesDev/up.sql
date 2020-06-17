alter table "public"."reactionMessagesDev" drop constraint "reactionMessagesDev_pkey";
alter table "public"."reactionMessagesDev"
    add constraint "reactionMessagesDev_pkey" 
    primary key ( "message" );
