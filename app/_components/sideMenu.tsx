"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import {  SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";



const SideMenu = () => {

    const { data, status } = useSession();
 
    const handleLoginClick =  () =>  signIn("google")
        
    

    const handleLogoutClick = () => signOut()

    return ( 
        <>

                    <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                        <SheetTitle>
                            Menu
                        </SheetTitle>
                    </SheetHeader>

                    {data?.user ? (
                        <div className="flex justify-between px-5 py-6 item-center">

                            <div className="flex items-center gap-3 px5 py-6">
                                <Avatar>
                                    <AvatarImage src={data.user?.image ?? ""} />
                                </Avatar>

                                <h2 className="font-bold">{data.user.name}</h2>
                                
                            </div>

                            <Button variant='secondary' size='icon'>
                                <LogOutIcon onClick={handleLogoutClick}/>
                            </Button>

                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 px-5 py-6 ">

                            <div className="flex items-center gap-2">
                                <UserIcon size={25}/>
                                <h2 className="font-bold">Olá, faça seu login!</h2>
                            </div>

                            <Button className="w-full justify-start" variant="secondary" onClick={handleLoginClick}>
                                <LogInIcon className="mr-2" size={20}/>
                                Fazer login
                            </Button>

                        </div>
                    )}

                        <div className="flex flex-col gap-3 px-5">
                            
                            <Button variant='outline' className="justify-start w-full" asChild>
                                <Link href="/">
                                    <HomeIcon size={18} className="mr-2" />
                                    Início
                                </Link>
                            </Button>

                            {data?.user && (
                                <Button variant='outline' className="justify-start w-full" asChild>
                                    <Link href="/bookings">
                                        <CalendarIcon size={18} className="mr-2" />
                                        Agendamentos
                                    </Link>
                                </Button>
                            )}

                        </div>


        </>
     );
}
 
export default SideMenu;