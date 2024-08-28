import * as fs from 'fs';
import * as csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserGroup {
    id: number
    userId: number
    groupId: number
}

const readCSV = (filePath: string): Promise<UserGroup[]> => {
    return new Promise((resolve, reject) => {
        const userGroup: UserGroup[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: UserGroup) => {
                const userGroup: UserGroup = {
                    id: Number(data.id),
                    userId: Number(data.userId),
                    groupId: Number(data.groupId)
                };
                await prisma.userGroups.upsert({ where: { id: userGroup.id }, update: userGroup, create: userGroup });
            })
            .on('end', () => {
                resolve(userGroup);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

async function main(): Promise<void> {
    const csvFilePath = `${__dirname}/seedFile/userGroup.csv`;

    try {
        await readCSV(csvFilePath);
    } catch (error) {
        console.error('Error reading CSV file:', error);
    } finally {
        await prisma.$disconnect()
    }
};

main();