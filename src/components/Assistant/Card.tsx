import { zodResolver } from '@hookform/resolvers/zod'
import React, {  useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { formSchemaDei } from '../Absence/FormSchema'
import { z } from 'zod'
import axios from 'axios'
import InputInfoDei from './Input'
import SelectComponent from './SelectComponentLabel'
import { PRIORITY, SACHA_STATUS } from '../../lib/constants'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from '../ui/use-toast'


const isPdfFile = (file: { type: string }) => {
    return file.type === 'application/pdf';
  };
  
function CardDei({dei, disabled, session, update}: DeiProps) {
    const [selectedFile, setSelectedFile] = useState<File |null>(null)
    const {toast} = useToast()
    const handleFileChange = (e:  any) => {
        const file = e.target.files[0]
        const isPdf =isPdfFile(file)
        if(file &&isPdf){
            setSelectedFile(file);
        }
        if(!isPdf){
            toast({
                variant: "destructive",
                title: "Un bon de commande est attendu !",          
                description: "Veuillez entrer un fichier PDF."   
            })
        }
      };
    const form = useForm<z.infer<typeof formSchemaDei>>({
        resolver: zodResolver(formSchemaDei),
        defaultValues: {
            sashaStatus : `${dei.sashaStatus}`,
            status : dei.status,
            totalPrice : dei.totalPrice,
            hourlyPrice : dei.hourlyPrice,
            dueDate : dei.dueDate.split("T")[0],
            priority: `${dei.priority}`,
            id: dei.id,
        },
    })
    const updateDei = async(data: Object) =>{
        try {
            const result = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/dei/${dei.id}/update`, data, {headers:{Authorization: `Bearer ${session?.accessToken}`}})
            toast({
                variant: "successful",
                title: result.data.message ?? "La tâche a été mis à jour !",
              })
            
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Oh là là ! Quelque chose s'est mal passé.",
                description:axios.isAxiosError(error)?  error.response?.data?.error ??
                "Une erreur s'est produite lors de la mis à jour de la tâche.": "Une erreur inattendue s'est produite.",
              })
        }finally{
            update()
        }
    }
    const onSubmit = async (data: z.infer<typeof formSchemaDei>)=>{
        switch (dei.sashaStatus) {
            case 0:
                const updatedData : {sashaStatus?: number, priority?: number} = {}
                if(data.sashaStatus === '1'){
                    updatedData["sashaStatus"] = parseInt(data.sashaStatus)
                }
                if (data.priority !== `${dei.priority}`){
                    updatedData["priority"] = parseInt(data.priority)
                }
                if (Object.keys(updatedData).length > 0){
                        updateDei(updatedData)
                }
                break;
            case 2:
                const formData = new FormData();
                let canUpdate = false
                if(data.sashaStatus === '3' && selectedFile instanceof File){
                    formData.append('file', selectedFile);
                    formData.append('sashaStatus', data.sashaStatus);
                    canUpdate = true
                }else{
                    toast({
                        variant: "destructive",
                        title:"N'oubliez pas le bon de commande et de sélectionnez le bon statut.",          
                    })
                }
                if (data.priority !== `${dei.priority}`){
                    formData.append('priority', data.priority);
                    canUpdate= true
                }
                if(canUpdate === true ){
                    updateDei(formData)
                }
                    
            default:
                break;
        }
    }

  return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-around h-full'>
        <h1 className="text-3xl font-bold text-[#41494e]">Tâche n°{dei?.id}</h1>
        <div className="flex justify-between gap-2">
            <InputInfoDei form={form} label="Date d'écheance" property='dueDate' type='date' readOnly={disabled.dueDate} />
            <SelectComponent form={form} placeholder="Sélectionner une priorité" options={PRIORITY} label="Priorité" property='priority' disabled={disabled.priority} />
        
        </div>
            <SelectComponent form={form} placeholder="Sélectionner un statut" options={dei.sashaStatus >= 2 ?SACHA_STATUS: SACHA_STATUS.filter(status => SACHA_STATUS.indexOf(status) !== 2)} label="Statut SACHA" property='sashaStatus' disabled={disabled.sashaStatus} />
        <div className="field-groupe flex flex-row gap-2">
            <InputInfoDei form={form} label="Tarif horaire en €" property='hourlyPrice' type='text' readOnly={disabled.hourlyPrice} />
            <InputInfoDei form={form} label="Prix total en €" property='totalPrice' type='text' readOnly={disabled.totalPrice} />
        </div>
        <Label htmlFor="purchaseOrder">Bon de commande</Label>
        {dei.sashaStatus == 3 ? 
            <Card className='w-4/5 h-24'>
                <CardContent>
                    {dei.purchaseOrder.map((purchaseOrder, index) => <Badge key={index}>{purchaseOrder.fileUrl ?? ""}</Badge>)}
                </CardContent>   
            </Card>
            : 
                <Input id='purchaseOrder' type='file' onChange={handleFileChange} accept='application/pdf' disabled={disabled.purchaseOrder} />
        }

        {(dei.sashaStatus == 0 || dei.sashaStatus == 2) && <Button type='submit' >Mettre à jour</Button>}
        </form>
      </FormProvider>
  )
}

export default CardDei
