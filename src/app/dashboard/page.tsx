'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CardsGrey from "@/components/CardsGrey/CardsUser"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  

export default function dashboard() {
    const router = useRouter();

    return (
        <div className={"flex flex-row"}>
            <div className={"flex flex-col"}>
                <div className="flex flex-col items-center w-full">
            <Button className="bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold py-2 px-4 rounded w-48 mb-4" variant="outline">
                Modifier les taux horaires 
            </Button>
            
            <div className="flex flex-row gap-8 w-full px-4 justify-center">
                <Card className="w-1/2 bg-white shadow-md rounded-lg overflow-hidden">
                <CardsGrey />

                    <CardContent className="p-4">
                    </CardContent>
                    <CardFooter className="p-2">
                    </CardFooter>
                </Card>

                <Card className="w-1/2 bg-white shadow-md rounded-lg overflow-hidden">
                    <CardHeader>
                    </CardHeader>
                    <CardContent className="p-4">
                    
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choisir une option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Priorité</SelectItem>
                                <SelectItem value="dark">Date</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        
                        </Select>
                        <Checkbox/>
                    </CardContent>
                    <CardFooter className="p-2">
                    </CardFooter>
                </Card>
                        
                <Card className="w-1/2 bg-white shadow-md rounded-lg overflow-hidden">
                    <CardHeader>
                        {/* Contenu du CardHeader */}
                    </CardHeader>
                    <CardContent className="p-4">
                        
                         
                    </CardContent>
                    <CardFooter className="p-2">
                        {/* Contenu du CardFooter */}
                    </CardFooter>
                </Card>
                </div>
   
                        <div className={"flex flex-col"}>
                       

                        </div>
                    </div>
            </div>
        </div>
    );
}