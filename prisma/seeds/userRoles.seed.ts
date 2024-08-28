import * as fs from 'fs';
import * as csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserRole {
    id: number
    userId: number
    roleId: number
}

const readCSV = (filePath: string): Promise<UserRole[]> => {
    return new Promise((resolve, reject) => {
        const userRoles: UserRole[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: UserRole) => {
                const userRole: UserRole = {
                    id: Number(data.id),
                    userId: Number(data.userId),
                    roleId: Number(data.roleId)
                };
                await prisma.userRoles.upsert({ where: { id: userRole.id }, update: userRole, create: userRole });
            })
            .on('end', () => {
                resolve(userRoles);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

async function main(): Promise<void> {
    const csvFilePath = `${__dirname}/seedFile/userRole.csv`;

    try {
        await readCSV(csvFilePath);
    } catch (error) {
        console.error('Error reading CSV file:', error);
    } finally {
        await prisma.$disconnect()
    }
};

main();