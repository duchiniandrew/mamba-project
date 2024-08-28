import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Category, PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

interface Campaign {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    category: Category;
    status: Status;
    userId: number
}

const readCSV = (filePath: string): Promise<Campaign[]> => {
    return new Promise((resolve, reject) => {
        const users: Campaign[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: Campaign) => {
                const campaign: Campaign = {
                    id: Number(data.id),
                    name: data.name,
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                    category: data.category,
                    status: data.status,
                    userId: Number(data.userId)
                }
                await prisma.campaigns.upsert({ where: { id: campaign.id }, update: campaign, create: campaign });
            })
            .on('end', () => {
                resolve(users);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

async function main(): Promise<void> {
    const csvFilePath = `${__dirname}/seedFile/campaign.csv`;

    try {
        await readCSV(csvFilePath);
    } catch (error) {
        console.error('Error reading CSV file:', error);
    } finally {
        await prisma.$disconnect()
    }
};

main();