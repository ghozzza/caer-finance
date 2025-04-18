import LPFactoryForm from './LPFactoryForm'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  // Read all records
  const lp = await prisma.lP_Factory.findMany();
  console.log("All records:", lp);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold mb-8">LP Factory Records</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
          <LPFactoryForm />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Records</h2>
          <div className="space-y-4">
            {lp?.map((record) => (
              <div key={record.id} className="p-4 border rounded-lg shadow-sm">
                <p><span className="font-medium">Sender:</span> {record.sender}</p>
                <p><span className="font-medium">Collateral Token:</span> {record.collateralToken}</p>
                <p><span className="font-medium">Borrow Token:</span> {record.borrowToken}</p>
                <p><span className="font-medium">LP Address:</span> {record.lpAddress}</p>
                <p><span className="font-medium">LTV:</span> {record.ltv}</p>
                <p><span className="font-medium">Created At:</span> {new Date(record.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
