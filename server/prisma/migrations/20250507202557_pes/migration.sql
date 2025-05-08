/*
  Warnings:

  - You are about to drop the column `createdAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `movie_actors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actorId` on the `movie_actors` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `movie_actors` table. All the data in the column will be lost.
  - The primary key for the `movie_directors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `directorId` on the `movie_directors` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `movie_directors` table. All the data in the column will be lost.
  - The primary key for the `user_bookmarks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user_bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `user_bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_bookmarks` table. All the data in the column will be lost.
  - The primary key for the `user_likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user_likes` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `user_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_likes` table. All the data in the column will be lost.
  - The primary key for the `user_watched` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `movieId` on the `user_watched` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_watched` table. All the data in the column will be lost.
  - You are about to drop the column `watchedAt` on the `user_watched` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `movie_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actor_id` to the `movie_actors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `movie_actors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director_id` to the `movie_directors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `movie_directors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `user_bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `user_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `user_watched` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_watched` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'SUPPORT', 'MODERATOR', 'USER', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('CREDENTIALS', 'GOOGLE', 'APPLE');

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_movieId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "movie_actors" DROP CONSTRAINT "movie_actors_actorId_fkey";

-- DropForeignKey
ALTER TABLE "movie_actors" DROP CONSTRAINT "movie_actors_movieId_fkey";

-- DropForeignKey
ALTER TABLE "movie_directors" DROP CONSTRAINT "movie_directors_directorId_fkey";

-- DropForeignKey
ALTER TABLE "movie_directors" DROP CONSTRAINT "movie_directors_movieId_fkey";

-- DropForeignKey
ALTER TABLE "user_bookmarks" DROP CONSTRAINT "user_bookmarks_movieId_fkey";

-- DropForeignKey
ALTER TABLE "user_bookmarks" DROP CONSTRAINT "user_bookmarks_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_movieId_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_watched" DROP CONSTRAINT "user_watched_movieId_fkey";

-- DropForeignKey
ALTER TABLE "user_watched" DROP CONSTRAINT "user_watched_userId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "movieId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "movie_actors" DROP CONSTRAINT "movie_actors_pkey",
DROP COLUMN "actorId",
DROP COLUMN "movieId",
ADD COLUMN     "actor_id" TEXT NOT NULL,
ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD CONSTRAINT "movie_actors_pkey" PRIMARY KEY ("movie_id", "actor_id");

-- AlterTable
ALTER TABLE "movie_directors" DROP CONSTRAINT "movie_directors_pkey",
DROP COLUMN "directorId",
DROP COLUMN "movieId",
ADD COLUMN     "director_id" TEXT NOT NULL,
ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD CONSTRAINT "movie_directors_pkey" PRIMARY KEY ("movie_id", "director_id");

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_bookmarks" DROP CONSTRAINT "user_bookmarks_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "movieId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_bookmarks_pkey" PRIMARY KEY ("user_id", "movie_id");

-- AlterTable
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "movieId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_likes_pkey" PRIMARY KEY ("user_id", "movie_id");

-- AlterTable
ALTER TABLE "user_watched" DROP CONSTRAINT "user_watched_pkey",
DROP COLUMN "movieId",
DROP COLUMN "userId",
DROP COLUMN "watchedAt",
ADD COLUMN     "movie_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "watched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "user_watched_pkey" PRIMARY KEY ("user_id", "movie_id");

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "auth_providers";

-- DropEnum
DROP TYPE "user_role";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "auth_providers" "AuthProvider"[] DEFAULT ARRAY['CREDENTIALS']::"AuthProvider"[],
    "refresh_token" TEXT,
    "email_verified" TIMESTAMP(3),
    "email_verification_token" TEXT,
    "email_verification_expires" TIMESTAMP(3),
    "password_reset_token" TEXT,
    "password_reset_expires" TIMESTAMP(3),
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_watched" ADD CONSTRAINT "user_watched_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_watched" ADD CONSTRAINT "user_watched_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_actors" ADD CONSTRAINT "movie_actors_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_directors" ADD CONSTRAINT "movie_directors_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_directors" ADD CONSTRAINT "movie_directors_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "directors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
