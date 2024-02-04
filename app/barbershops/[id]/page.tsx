
import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarberShopDetailsProps {
    params: {
        id? : string
    }
}

const BarberShopDetails = async ({ params }: BarberShopDetailsProps) => {
    const session = await getServerSession(authOptions);

    if(!params.id) {
        return null
    }


    const barbershop = await db.barbershop.findUnique({
        where:{
            id: params.id
        },
        include: {
            services: true,
        }
    })

    if(!barbershop) {
        return null
    }

    return ( 
        <div>

            <BarberShopInfo barbershop={barbershop}/>

            <div className="px-5 flex flex-col gap-5 py-6">

                {barbershop.services.map((service =>
                    <ServiceItem key={service.id} barbershop={barbershop} service={service}  isAuthenticated={!!session?.user}/>
                ))}

            </div>

            
        </div>
     );
}
 
export default BarberShopDetails;