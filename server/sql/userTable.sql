-- Create enum type for user_role
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'USER','OWNER','SUPPORT','MODERATOR','UNVERIFIED');
CREATE TYPE "auth_providers" AS ENUM ('CREDENTIALS', 'GOOGLE', 'APPLE');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE "users"
(
    id                         UUID PRIMARY KEY            DEFAULT uuid_generate_v4(),
    name                       VARCHAR(99)        NOT NULL,
    email                      VARCHAR(99) UNIQUE NOT NULL,
    password                   VARCHAR(100),
    auth_provider              "auth_providers"   NOT NULL DEFAULT 'CREDENTIALS',
    refresh_token              TEXT,
    role                       "user_role"        NOT NULL DEFAULT 'USER',
    email_verified             TIMESTAMPTZ,
    email_verification_token   VARCHAR(100),
    email_verification_expires TIMESTAMPTZ,
    password_reset_token       VARCHAR(100),
    password_reset_expires     TIMESTAMPTZ,
    image                      TEXT,
    created_at                 TIMESTAMPTZ        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                 TIMESTAMPTZ        NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add index for email (automatically created by UNIQUE constraint)
-- Optionally create a trigger to update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE
    ON "users"
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();