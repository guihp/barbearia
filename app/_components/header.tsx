"use client"

import Image from "next/image" 
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import SideMenu from "./sideMenu";


const Header = () => {

    return ( 
        <header>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row">
                    <Image src="/logo.png" alt="logo" height={18} width={360} />

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <MenuIcon size={18}/>
                            </Button>
                        </SheetTrigger>
                    

                        <SheetContent className="p-0">
                            <SideMenu/>
                        </SheetContent>
                    </Sheet>
                </CardContent>
            </Card> 
        </header>
 );
}
 
export default Header;