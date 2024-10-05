-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL DEFAULT '',
    "media" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "media" TEXT,
    "parentCommentId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_postedInCommunities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_postUpvoters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_postDownvoters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_childrenComments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_commentUpvoters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_commentDownvoters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_postedInCommunities_AB_unique" ON "_postedInCommunities"("A", "B");

-- CreateIndex
CREATE INDEX "_postedInCommunities_B_index" ON "_postedInCommunities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_postUpvoters_AB_unique" ON "_postUpvoters"("A", "B");

-- CreateIndex
CREATE INDEX "_postUpvoters_B_index" ON "_postUpvoters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_postDownvoters_AB_unique" ON "_postDownvoters"("A", "B");

-- CreateIndex
CREATE INDEX "_postDownvoters_B_index" ON "_postDownvoters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_childrenComments_AB_unique" ON "_childrenComments"("A", "B");

-- CreateIndex
CREATE INDEX "_childrenComments_B_index" ON "_childrenComments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_commentUpvoters_AB_unique" ON "_commentUpvoters"("A", "B");

-- CreateIndex
CREATE INDEX "_commentUpvoters_B_index" ON "_commentUpvoters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_commentDownvoters_AB_unique" ON "_commentDownvoters"("A", "B");

-- CreateIndex
CREATE INDEX "_commentDownvoters_B_index" ON "_commentDownvoters"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postedInCommunities" ADD CONSTRAINT "_postedInCommunities_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postedInCommunities" ADD CONSTRAINT "_postedInCommunities_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postUpvoters" ADD CONSTRAINT "_postUpvoters_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postUpvoters" ADD CONSTRAINT "_postUpvoters_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postDownvoters" ADD CONSTRAINT "_postDownvoters_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postDownvoters" ADD CONSTRAINT "_postDownvoters_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_childrenComments" ADD CONSTRAINT "_childrenComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_childrenComments" ADD CONSTRAINT "_childrenComments_B_fkey" FOREIGN KEY ("B") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentUpvoters" ADD CONSTRAINT "_commentUpvoters_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentUpvoters" ADD CONSTRAINT "_commentUpvoters_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentDownvoters" ADD CONSTRAINT "_commentDownvoters_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentDownvoters" ADD CONSTRAINT "_commentDownvoters_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
