#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB') THEN
            CREATE DATABASE "$POSTGRES_DB";
            GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_USER";
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'litellm') THEN
            CREATE DATABASE "litellm";
            GRANT ALL PRIVILEGES ON DATABASE "litellm" TO "$POSTGRES_USER";
        END IF;
    END
EOSQL