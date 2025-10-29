-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "mid" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("mid")
);

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
