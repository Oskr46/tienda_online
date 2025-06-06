PGDMP                      }            empresa    17.5    17.4     7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            :           1262    16398    empresa    DATABASE     ~   CREATE DATABASE empresa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
    DROP DATABASE empresa;
                     postgres    false            �            1259    24591 
   commentary    TABLE     �   CREATE TABLE public.commentary (
    "idCommentary" integer NOT NULL,
    "nameCommentary" text NOT NULL,
    "emailCommentary" text NOT NULL,
    "textCommentary" text NOT NULL,
    valoration integer NOT NULL,
    "idProduct" integer NOT NULL
);
    DROP TABLE public.commentary;
       public         heap r       postgres    false            �            1259    24590    commentary_idCommentary_seq    SEQUENCE     �   CREATE SEQUENCE public."commentary_idCommentary_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."commentary_idCommentary_seq";
       public               postgres    false    222            ;           0    0    commentary_idCommentary_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."commentary_idCommentary_seq" OWNED BY public.commentary."idCommentary";
          public               postgres    false    221            �            1259    16405    products    TABLE       CREATE TABLE public.products (
    "idProduct" integer NOT NULL,
    "nameProduct" text NOT NULL,
    "priceProduct" integer NOT NULL,
    "urlImg" text NOT NULL,
    "maxStockProduct" integer DEFAULT 0,
    "minStockProduct" integer DEFAULT 0,
    "stockProduct" integer DEFAULT 0
);
    DROP TABLE public.products;
       public         heap r       postgres    false            �            1259    16410    products_idProduct_seq    SEQUENCE     �   CREATE SEQUENCE public."products_idProduct_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."products_idProduct_seq";
       public               postgres    false    217            <           0    0    products_idProduct_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."products_idProduct_seq" OWNED BY public.products."idProduct";
          public               postgres    false    218            �            1259    16411    user    TABLE     �   CREATE TABLE public."user" (
    "idUser" integer NOT NULL,
    "fullNameUser" text NOT NULL,
    "userName" text NOT NULL,
    password text NOT NULL,
    "typeUser" integer DEFAULT 1 NOT NULL
);
    DROP TABLE public."user";
       public         heap r       postgres    false            �            1259    16417    user_idUser_seq    SEQUENCE     �   CREATE SEQUENCE public."user_idUser_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."user_idUser_seq";
       public               postgres    false    219            =           0    0    user_idUser_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."user_idUser_seq" OWNED BY public."user"."idUser";
          public               postgres    false    220            �           2604    24594    commentary idCommentary    DEFAULT     �   ALTER TABLE ONLY public.commentary ALTER COLUMN "idCommentary" SET DEFAULT nextval('public."commentary_idCommentary_seq"'::regclass);
 H   ALTER TABLE public.commentary ALTER COLUMN "idCommentary" DROP DEFAULT;
       public               postgres    false    222    221    222            �           2604    16419    products idProduct    DEFAULT     |   ALTER TABLE ONLY public.products ALTER COLUMN "idProduct" SET DEFAULT nextval('public."products_idProduct_seq"'::regclass);
 C   ALTER TABLE public.products ALTER COLUMN "idProduct" DROP DEFAULT;
       public               postgres    false    218    217            �           2604    16420    user idUser    DEFAULT     p   ALTER TABLE ONLY public."user" ALTER COLUMN "idUser" SET DEFAULT nextval('public."user_idUser_seq"'::regclass);
 >   ALTER TABLE public."user" ALTER COLUMN "idUser" DROP DEFAULT;
       public               postgres    false    220    219            4          0    24591 
   commentary 
   TABLE DATA           �   COPY public.commentary ("idCommentary", "nameCommentary", "emailCommentary", "textCommentary", valoration, "idProduct") FROM stdin;
    public               postgres    false    222   a       /          0    16405    products 
   TABLE DATA           �   COPY public.products ("idProduct", "nameProduct", "priceProduct", "urlImg", "maxStockProduct", "minStockProduct", "stockProduct") FROM stdin;
    public               postgres    false    217   ~       1          0    16411    user 
   TABLE DATA           \   COPY public."user" ("idUser", "fullNameUser", "userName", password, "typeUser") FROM stdin;
    public               postgres    false    219   �       >           0    0    commentary_idCommentary_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."commentary_idCommentary_seq"', 5, true);
          public               postgres    false    221            ?           0    0    products_idProduct_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."products_idProduct_seq"', 36, true);
          public               postgres    false    218            @           0    0    user_idUser_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."user_idUser_seq"', 9, true);
          public               postgres    false    220            �           2606    24598    commentary commentary_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.commentary
    ADD CONSTRAINT commentary_pkey PRIMARY KEY ("idCommentary");
 D   ALTER TABLE ONLY public.commentary DROP CONSTRAINT commentary_pkey;
       public                 postgres    false    222            �           2606    16424    products products_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("idProduct");
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    217            �           2606    16426    user user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("idUser");
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public                 postgres    false    219            �           2606    24599 $   commentary commentary_idProduct_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.commentary
    ADD CONSTRAINT "commentary_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES public.products("idProduct");
 P   ALTER TABLE ONLY public.commentary DROP CONSTRAINT "commentary_idProduct_fkey";
       public               postgres    false    222    217    4760            4      x������ � �      /      x������ � �      1   �   x�5�͎�0�5}
��8�e� Q&�l�T�R@~E�^3�{r��\M��iĀ\	�bP1Ҋ��4tz7y��"+	&��H��k�:�Q��χr@��1z=S�о��](LZ�c�P��F:SP �G���eG���i�>�F̪�L�b��	������W?X����}N>ߍ���k�T��4.	�ڎ�?�����#�L�V(1߾=��x�#�:��^=j3�ou1rR��~d �:�\     