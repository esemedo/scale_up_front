import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Category } from "./ListingWorkplace"
import { useState,useEffect } from "react"
import axios from "axios"
import { Label } from "../ui/label"
import { ButtonUpdateCategory } from "./ButtonUpdateWorkplace"

interface TypeCardInterface{
    TypeCard?:string;
    IdCard?:number|null;
}

export function ElementFormSelect({TypeCard="category", IdCard}:TypeCardInterface) {
    const [cardSubject, setCardSubject] = useState<Subjects>();
    const [cardCategory, setCardCategory] = useState<Category>();
    useEffect(() => {
      
        if (TypeCard === "subject") {
            if(IdCard!==null&&IdCard!==cardSubject?.id){
                const apiEndPoint = `http://localhost:3000/api/subject/${IdCard}`;
                const getCard = async () => {
                    const { data: res } = await axios.get(apiEndPoint);
                    setCardSubject(res);
                    
                };
                getCard();
            }
        } else if (TypeCard === "category") {
            if(IdCard!==null&&IdCard!==cardCategory?.id){
                const apiEndPointCardCategory = `http://localhost:3000/api/category/${IdCard}`;
                const getCard = async () => {
                    const { data: res } = await axios.get(apiEndPointCardCategory);
                    setCardCategory(res);
                    
                };
                getCard();
            }
        }
    }, [TypeCard, IdCard, cardSubject, cardCategory]); 

    
    if (TypeCard === "category") {
        return (
          <>
            {cardCategory !==undefined && (
              <Card className={cn("w-[780px] h-[635px] mt-11", )}>
                <CardHeader>
                  <CardTitle>Description de categorie</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center space-x-4 rounded-md border p-4">
                    <p className="text-sm text-muted-foreground">
                      {cardCategory?.name}
                    </p>
                  </div>
                </CardContent>
                <ButtonUpdateCategory name={cardCategory?.name} id={cardCategory?.id}/>
              </Card>
            )}
            {cardCategory===undefined && (

              <Card className={cn("w-[780px] h-[635px] mt-11")} >
                <CardHeader>
                  <CardTitle>Description de categorie</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center space-x-4 rounded-md border p-4">
                    <Label className="text-sm text-muted-foreground">
                      Name: (selectionner une categorie)
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        );
      } else if (TypeCard === "subject") {
        return (
          <>
            {cardSubject!==undefined && (
              <Card className={cn("w-[780px] h-[635px] mt-11")}>
                <CardHeader>
                  <CardTitle>Description de matière/module</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center space-x-4 rounded-md border p-4">
                    <Label className="text-sm text-muted-foreground">
                      Nom: {cardSubject.name}
                    </Label>
                    <br />
                    <ReturnCategory categoryId={cardSubject.categoryId} />
                    <br />
                    <Label className="text-sm text-muted-foreground">
                      Level: {cardSubject.level}
                    </Label>
                  </div>
                </CardContent>
                <ButtonUpdateSubject id={cardSubject.id} name={cardSubject.name} level={cardSubject.level} categoryId={cardSubject.categoryId}/>

              </Card>
            )}
          </>
        );
    }
}  