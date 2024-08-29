import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../../src/user/dto/request/createUser.dto';

const prisma = new PrismaClient();

interface User {
    email: string;
    password: string;
    name: string;
}

const readCSV = (filePath: string): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        const users: User[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data: User) => {
                const hashedPassword = await bcrypt.hashSync(data.password, process.env["HASH"]);
                const user: CreateUserDto = {
                    email: data.email,
                    name: data.name,
                    password: hashedPassword,
                };
                await prisma.users.upsert({ where: { email: user.email }, update: user, create: user });
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
    const csvFilePath = `${__dirname}/seedFile/user.csv`;

    try {
        await readCSV(csvFilePath);
    } catch (error) {
        console.error('Error reading CSV file:', error);
    } finally {
        await prisma.$disconnect()
    }
};

main();