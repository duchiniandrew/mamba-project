import * as fs from 'fs';
import * as csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GroupRole {
    id: number
    groupId: number
    roleId: number
}

const readCSV = (filePath: string): Promise<GroupRole[]> => {
    return new Promise((resolve, reject) => {
        const groupRoles: GroupRole[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: GroupRole) => {
                const groupRole: GroupRole = {
                    id: Number(data.id),
                    groupId: Number(data.groupId),
                    roleId: Number(data.roleId)
                };
                await prisma.groupRoles.upsert({ where: { id: groupRole.id }, update: groupRole, create: groupRole });
            })
            .on('end', () => {
                resolve(groupRoles);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

async function main(): Promise<void> {
    const csvFilePath = `${__dirname}/seedFile/groupRole.csv`;

    try {
        await readCSV(csvFilePath);
    } catch (error) {
        console.error('Error reading CSV file:', error);
    } finally {
        await prisma.$disconnect()
    }
};

main();