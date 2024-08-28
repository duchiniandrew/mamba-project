import * as fs from 'fs';
import * as csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Role {
    id: number
    name: string;
}

function readCSV(filePath: string): Promise<Role[]> {
    return new Promise((resolve, reject) => {
        const roles: Role[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: Role) => {
                const role: Role = { id: Number(data.id), name: data.name, };
                roles.push(role);
                await prisma.roles.upsert({ where: { id: role.id }, update: role, create: role });
            })
            .on('end', () => {
                resolve(roles);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

async function main(): Promise<void> {
    const csvFilePath = `${__dirname}/seedFile/role.csv`;

    try {
        await readCSV(csvFilePath);
    } catch (error) {
        console.error('Error reading CSV file:', error);
    } finally {
        await prisma.$disconnect()
    }
};

main();