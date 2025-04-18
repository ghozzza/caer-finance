"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createFormLPFactory = async (formData: FormData) => {
    const sender = formData.get('sender') as string;
    const collateralToken = formData.get('collateralToken') as string;
    const borrowToken = formData.get('borrowToken') as string;
    const lpAddress = formData.get('lpAddress') as string;
    const ltv = formData.get('ltv') as string;

    
    try {
        await prisma.lP_Factory.create({
            data: {
                sender: sender,
                collateralToken: collateralToken,
                borrowToken: borrowToken,
                lpAddress: lpAddress,
                ltv: ltv
            }
        })
        console.log(sender, collateralToken, borrowToken, lpAddress, ltv);
        return { success: true, message: "LP Factory created successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to create LP Factory" };
    }

};
