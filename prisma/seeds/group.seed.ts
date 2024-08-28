import * as fs from 'fs';
import * as csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Group {
    id: number
    name: string;
}

function readCSV(filePath: string): Promise<Group[]> {
    return new Promise((resolve, reject) => {
        const groups: Group[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: Group) => {
                const group: Group = { id: Number(data.id), name: data.name, };
                groups.push(group);
                await prisma.groups.upsert({ where: { id: group.id }, update: group, create: group });
            })
            .on('end', () => {
                resolve(groups);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

async function main(): Promise<void> {
    const csvFilePath = `${__dirname}/seedFile/group.csv`;

    try {
        await readCSV(csvFilePath);
    } catch (error) {
        console.error('Error reading CSV file:', error);
    } finally {
        await prisma.$disconnect()
    }
};

main();