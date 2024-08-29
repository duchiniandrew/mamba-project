-- CreateTable
CREATE TABLE "GroupRoles" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "GroupRoles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupRoles" ADD CONSTRAINT "GroupRoles_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRoles" ADD CONSTRAINT "GroupRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
