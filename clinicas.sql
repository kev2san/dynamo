--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.21
-- Dumped by pg_dump version 13.1

-- Started on 2021-03-15 06:29:44 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2420 (class 1262 OID 16402)
-- Name: clinicas; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE clinicas WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE clinicas OWNER TO postgres;

\connect clinicas

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 185 (class 1259 OID 16403)
-- Name: tb_clinicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_clinicas (
    id_clinica integer NOT NULL,
    c_ubicacion character varying(500),
    c_comuna character varying(250),
    b_estado boolean,
    c_nombre_clinica character varying(500)
);


ALTER TABLE public.tb_clinicas OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16406)
-- Name: tb_clinicas_id_clinica_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_clinicas_id_clinica_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_clinicas_id_clinica_seq OWNER TO postgres;

--
-- TOC entry 2421 (class 0 OID 0)
-- Dependencies: 186
-- Name: tb_clinicas_id_clinica_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_clinicas_id_clinica_seq OWNED BY public.tb_clinicas.id_clinica;


--
-- TOC entry 190 (class 1259 OID 16427)
-- Name: tb_ocupaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_ocupaciones (
    id_ocupacion integer NOT NULL,
    c_descripcion character varying,
    b_estado boolean
);


ALTER TABLE public.tb_ocupaciones OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16425)
-- Name: tb_ocupacion_id_ocupacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_ocupacion_id_ocupacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_ocupacion_id_ocupacion_seq OWNER TO postgres;

--
-- TOC entry 2422 (class 0 OID 0)
-- Dependencies: 189
-- Name: tb_ocupacion_id_ocupacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_ocupacion_id_ocupacion_seq OWNED BY public.tb_ocupaciones.id_ocupacion;


--
-- TOC entry 188 (class 1259 OID 16419)
-- Name: tb_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_usuarios (
    id_usuario integer NOT NULL,
    c_usuario character varying(50),
    c_contrasena character varying(250),
    b_estado boolean,
    c_nombres character varying(200),
    c_apellidos character varying(200),
    i_id_ocupacion integer,
    t_fecha_creacion time without time zone DEFAULT now(),
    i_id_clinica integer
);


ALTER TABLE public.tb_usuarios OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16417)
-- Name: tb_usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_usuarios_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 2423 (class 0 OID 0)
-- Dependencies: 187
-- Name: tb_usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_usuarios_id_usuario_seq OWNED BY public.tb_usuarios.id_usuario;


--
-- TOC entry 2282 (class 2604 OID 16408)
-- Name: tb_clinicas id_clinica; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_clinicas ALTER COLUMN id_clinica SET DEFAULT nextval('public.tb_clinicas_id_clinica_seq'::regclass);


--
-- TOC entry 2285 (class 2604 OID 16430)
-- Name: tb_ocupaciones id_ocupacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ocupaciones ALTER COLUMN id_ocupacion SET DEFAULT nextval('public.tb_ocupacion_id_ocupacion_seq'::regclass);


--
-- TOC entry 2283 (class 2604 OID 16422)
-- Name: tb_usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.tb_usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 2409 (class 0 OID 16403)
-- Dependencies: 185
-- Data for Name: tb_clinicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_clinicas (id_clinica, c_ubicacion, c_comuna, b_estado, c_nombre_clinica) VALUES (6, 'Av. Sta. María 1810', 'Providencia', false, 'Clinica Indisa');
INSERT INTO public.tb_clinicas (id_clinica, c_ubicacion, c_comuna, b_estado, c_nombre_clinica) VALUES (5, 'Av. Santa María 0500', 'Providencia', false, 'Clinica Santa Maria');


--
-- TOC entry 2414 (class 0 OID 16427)
-- Dependencies: 190
-- Data for Name: tb_ocupaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_ocupaciones (id_ocupacion, c_descripcion, b_estado) VALUES (1, 'Doctor(a)', true);
INSERT INTO public.tb_ocupaciones (id_ocupacion, c_descripcion, b_estado) VALUES (2, 'Enfermera(o)', true);
INSERT INTO public.tb_ocupaciones (id_ocupacion, c_descripcion, b_estado) VALUES (3, 'Anestesista', true);
INSERT INTO public.tb_ocupaciones (id_ocupacion, c_descripcion, b_estado) VALUES (4, 'Secretaria', true);
INSERT INTO public.tb_ocupaciones (id_ocupacion, c_descripcion, b_estado) VALUES (5, 'Aseo', true);
INSERT INTO public.tb_ocupaciones (id_ocupacion, c_descripcion, b_estado) VALUES (6, 'Admistrador', true);
INSERT INTO public.tb_ocupaciones (id_ocupacion, c_descripcion, b_estado) VALUES (7, 'TM', true);


--
-- TOC entry 2412 (class 0 OID 16419)
-- Dependencies: 188
-- Data for Name: tb_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_usuarios (id_usuario, c_usuario, c_contrasena, b_estado, c_nombres, c_apellidos, i_id_ocupacion, t_fecha_creacion, i_id_clinica) VALUES (1, 'admin', 'admin', true, 'admin', 'admin', 0, '06:32:48.255505', 0);


--
-- TOC entry 2424 (class 0 OID 0)
-- Dependencies: 186
-- Name: tb_clinicas_id_clinica_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_clinicas_id_clinica_seq', 6, true);


--
-- TOC entry 2425 (class 0 OID 0)
-- Dependencies: 189
-- Name: tb_ocupacion_id_ocupacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_ocupacion_id_ocupacion_seq', 6, true);


--
-- TOC entry 2426 (class 0 OID 0)
-- Dependencies: 187
-- Name: tb_usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_usuarios_id_usuario_seq', 8, true);


--
-- TOC entry 2287 (class 2606 OID 16416)
-- Name: tb_clinicas tb_clinicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_clinicas
    ADD CONSTRAINT tb_clinicas_pkey PRIMARY KEY (id_clinica);


--
-- TOC entry 2291 (class 2606 OID 16435)
-- Name: tb_ocupaciones tb_ocupacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_ocupaciones
    ADD CONSTRAINT tb_ocupacion_pkey PRIMARY KEY (id_ocupacion);


--
-- TOC entry 2289 (class 2606 OID 16424)
-- Name: tb_usuarios tb_usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id_usuario);


-- Completed on 2021-03-15 06:29:44 -03

--
-- PostgreSQL database dump complete
--

