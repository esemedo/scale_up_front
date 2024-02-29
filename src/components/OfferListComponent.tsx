'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Offer {
    id: number,
    needId: number
}

export default function OfferListComponent() {

    const [offers, setOffers] = useState<Offer[]>([]);

    async function getOffers() {
        await fetch('http://localhost:3000/api/getOffers')
          .then(response => response.json())
          .then(json => setOffers(json))
          .catch(error => console.error(error));
    }

    function getPath(offer: Offer): string {
        return `/offers/subject/${offer.id}/${offer.needId}`
    }

    useEffect(() => {
        getOffers()
      }, []);

    return(
        <>
            <div className="bg-slate-50 shadow-md p-6 w-1/3 h-full mx-2 rounded-md">
                <p>Contrats :</p>
                {offers.map((offer, index) => {
                        return(
                            <>
                                <Link key={index} href={getPath(offer)} className="p-2 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500">Contrat n°{offer.id}</Link>
                            </>
                        )
                    })}
            </div>
        </>
    )
}