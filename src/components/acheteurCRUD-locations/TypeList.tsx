import {Card} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ListingCategory from "./ListingCategory"
import { ListingSubject } from "./ListingSubject"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"

interface TypeListProps{
    SelectElement?: (valeur?: number) => void;
    TypeElement?:(valeur?:string)=>void;
}

export const TypeList:React.FC<TypeListProps> = ({ SelectElement, TypeElement }) => 
{
    const [categorySelect,setCategorySelect]=useState<string>('category');

    const handleReturnSelectElement = (element?:number,typeElement?:string)=>{
        SelectElement && SelectElement(element);
        TypeElement && TypeElement(typeElement);
    }

    const handleCategorySelect = (categoryId?: number) => {
        if(categorySelect=="category"){
            handleReturnSelectElement(categoryId,categorySelect)
        }
    };

    const handleSubjectSelect = (subjectId: number) => {
        if(categorySelect=="subject"){
            handleReturnSelectElement(subjectId,categorySelect)
        }
    };

    const handleTabsTriggerClick = (value: string) => {
        setCategorySelect(value); 
      };

  return (
    <Tabs defaultValue="category" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="subject"  onClick={() => handleTabsTriggerClick('subject')}>Matière/Module</TabsTrigger>
        <TabsTrigger value="category" onClick={() => handleTabsTriggerClick('category')}>Catégorie</TabsTrigger>
        <TabsTrigger value="place" onClick={() => handleTabsTriggerClick('place')}>{`Lieu d'enseignement`}</TabsTrigger>
      </TabsList>
      <TabsContent value="subject">
        <Card>
          <ListingSubject onSubjectSelect={handleSubjectSelect}/>
        </Card>
      </TabsContent>
      <TabsContent value="category">
        <Card>
        <ListingCategory onCategorySelect={handleCategorySelect} />
        </Card>
      </TabsContent>
      <TabsContent value="place">
        <Card>
        <Label>{`on doit attendre la story 2 du baklog 2 ou on fait l'ajout des lieux d'enseignements`}</Label>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
