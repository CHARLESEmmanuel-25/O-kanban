-- à l'ancienne
CREATE ROLE okanban WITH LOGIN PASSWORD 'okanban';
-- ajout + ou - récent
CREATE USER okanban WITH PASSWORD 'okanban';

CREATE DATABASE okanban OWNER okanban;