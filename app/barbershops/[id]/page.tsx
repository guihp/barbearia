
import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/barbershop-info";

interface BarberShopDetailsProps {
    params: {
        id? : string
    }
}

const BarberShopDetails = async ({ params }: BarberShopDetailsProps) => {
    if(!params.id) {
        return null
    }


    const barbershop = await db.barbershop.findUnique({
        where:{
            id: params.id
        }
    })

    if(!barbershop) {
        return null
    }

    return ( 
        <BarberShopInfo barbershop={barbershop}/>
     );
}
 
export default BarberShopDetails;