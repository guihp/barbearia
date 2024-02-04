"use client"

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop, Service } from "@prisma/client";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { useState, useMemo } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/save-booking";
import { Loader2 } from "lucide-react";

interface ServiceItemProps {
    barbershop: Barbershop;
    service: Service;
    isAuthenticated?: boolean;
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {

    const { data } = useSession()

    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(false)

    function handleDateClick (date: Date | undefined) {
        setDate(date)
        setHour(undefined)
    }

    function handleHourClick (time: string) {
        setHour(time)
    }

    const handleBookingClick = () => {
        if (!isAuthenticated) {
          return signIn("google");
        }
    }

    const handleBookingSubmit = async () => {

        setIsLoading(true)

        try {
            if(!hour || !date || !data?.user){
                return
            }

            // fazendo com que a hora fique desse jeito "09: 45"  ["09" : "45" ]
            const dateHour = Number(hour.split(':')[0])
            const dateMinutes = Number(hour.split(':')[1]) 
            const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

            await saveBooking({
                serviceId: service.id,
                barbershopId: barbershop.id,
                date: newDate,
                userId: (data.user as any).id,
            });

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : []
    }, [date])

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
                                }).format(Number(service.price))}
                                </p>

                               
                                <Sheet>

                                    <SheetTrigger asChild>
                                        <Button variant="secondary" onClick={handleBookingClick}>
                                            Reservar
                                        </Button>
                                    </SheetTrigger>

                                    <SheetContent className="p-0">
                                        <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                            <SheetTitle>Fazer Reserva</SheetTitle>
                                        </SheetHeader>

                                            <div className="py-6">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={handleDateClick}
                                                    locale={ptBR}
                                                    fromDate={new Date()}
                                                    styles={{
                                                        head_cell: {
                                                            width: "100%",
                                                            textTransform: 'capitalize',
                                                        },
                                                        cell: {
                                                            width: '100%'
                                                        },
                                                        button:{
                                                            width: "100%"
                                                        },
                                                        nav_button_previous:{
                                                            width: "32px",
                                                            height: '32px'
                                                        },
                                                        nav_button_next:{
                                                            width: "32px",
                                                            height: '32px'
                                                        },
                                                        caption: {
                                                            textTransform: 'capitalize',
                                                        }
                                                    }}
                                                  />
                                            </div>

                                        {/* vai mostrar a lista de de horarios so quando tiver data selecionada */}

                                         {date && (
                                            <div className="flex py-6 px-5 border-t border-solid border-secondary overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3">
                                               {timeList.map((time) => (
                                                    <Button variant={hour === time ? "default" : "outline"} onClick={() => handleHourClick(time)} className="rounded-full" key={time}> {time} </Button>
                                               ))} 
                                            </div>
                                         )}

                                         <div className="py-6 px-5 border-t border-solid border-secondary">
                                            <Card>
                                                <CardContent className="p-3 gap-3 flex flex-col">

                                                    <div className="flex justify-between">

                                                        <h2 className="font-bold">{service.name}</h2>
                                                        <h3 className="font-bold text-sm">
                                                            {Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                            }).format(Number(service.price))}
                                                        </h3>

                                                    </div>

                                                    {date && (
                                                          <div className="flex justify-between">
                                                            <p className="text-gray-400 text-sm">Data</p>
                                                            <p className="text-sm ">{format(date, "dd 'de' MMMM", {
                                                                locale: ptBR,
                                                            })}</p>
                                                          </div>
                                                    )}

                                                    {hour && (
                                                          <div className="flex justify-between">
                                                            <p className="text-gray-400 text-sm">Horário</p>
                                                            <p className="text-sm ">{hour} </p>
                                                          </div>
                                                    )}
                                                    
                                                    {hour && (
                                                          <div className="flex justify-between">
                                                            <p className="text-gray-400 text-sm">Barberaria</p>
                                                            <p className="text-sm ">{barbershop.name} </p>
                                                          </div>
                                                    )}

                                                </CardContent>
                                            </Card>

                                         </div>

                                         
                                         <SheetFooter className="px-5">
                                                <Button onClick={handleBookingSubmit} disabled={!hour || !date || isLoading}>
                                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />  }
                                                    Confirmar Reserva
                                                </Button>
                                         </SheetFooter>

                                    </SheetContent>    


                                </Sheet>
                        </div>
                    </div>

                </div>
                    
            </CardContent>
        </Card>

     );
}
 
export default ServiceItem;