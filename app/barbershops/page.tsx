import BarberShopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarberShopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {

    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: 'insensitive'
            }
        }
    })

    return ( 
    
        <>
            <Header />

            <div className="px-5 py-6">

                <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{searchParams.search}&quot;</h1>

                <div className="grid grid-cols-2 mt-3 gap-4">
                    {barbershops.map((barbershops) => (
                        <div key={barbershops.id} className="w-full">
                            <BarberShopItem  barbershop={barbershops}/>
                        </div>
                    ))}
                </div>
            </div>
        </>

 );
}
 
export default BarberShopsPage;