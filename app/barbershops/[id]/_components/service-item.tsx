"use client"

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

interface ServiceItemProps {
    service: Service,
    isAuthenticated?: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {

    const handleBookingClick = () => {
        if (!isAuthenticated) {
          return signIn("google");
        }
    }
    return ( 

        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                         <Image src={service.imageUrl} fill alt={service.name} style={{ objectFit: "contain" }} className="rounded-lg"/>
                    </div>

                    <div className="flex flex-col w-full ">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="text-primary text-sm font-bold">{Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                }).format(Number(service.price))}</p>
                            <Button className="" variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                        </div>
                    </div>

                </div>
                    
            </CardContent>
        </Card>

     );
}
 
export default ServiceItem;