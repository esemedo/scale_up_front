"use client";

import { useState, FormEvent } from "react";
import jsPDF from "jspdf";

interface Devis {
  client: string;
  address: string;
  date: string;
  service: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const Home = () => {
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [devis, setDevis] = useState<Devis | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const total = quantity * unitPrice;
    setDevis({
      client,
      address,
      date,
      service,
      description,
      quantity,
      unitPrice,
      total,
    });
  };

  const generatePDF = () => {
    if (!devis) return;

    const doc = new jsPDF();
    doc.text(`Client: ${devis.client}`, 10, 10);
    doc.text(`Address: ${devis.address}`, 10, 20);
    doc.text(`Date: ${devis.date}`, 10, 30);
    doc.text(`Service: ${devis.service}`, 10, 40);
    doc.text(`Description: ${devis.description}`, 10, 50);
    doc.text(`Quantity: ${devis.quantity}`, 10, 60);
    doc.text(`Unit Price: ${devis.unitPrice} €`, 10, 70);
    doc.text(`Total: ${devis.total} €`, 10, 80);
    doc.save("devis.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Créer un Devis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Client:</label>
            <input
              type="text"
              className="rounded border border-gray-300 p-2"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Adresse :</label>
            <input
              type="text"
              className="rounded border border-gray-300 p-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Date:</label>
            <input
              type="date"
              className="rounded border border-gray-300 p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Service:</label>
            <input
              type="text"
              className="rounded border border-gray-300 p-2"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Description:</label>
            <textarea
              className="rounded border border-gray-300 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Quantité :</label>
            <input
              type="number"
              className="rounded border border-gray-300 p-2"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Prix :</label>
            <input
              type="number"
              className="rounded border border-gray-300 p-2"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Créer Devis
          </button>
        </form>

        {devis && (
          <div className="mt-6">
            <h2 className="mb-4 text-xl font-bold">Devis</h2>
            <p className="mb-2">
              <span className="font-semibold">Client:</span> {devis.client}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Adresse:</span> {devis.address}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date:</span> {devis.date}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Service:</span> {devis.service}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {devis.description}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Quantité:</span> {devis.quantity}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Prix:</span> {devis.unitPrice} €
            </p>
            <p className="mb-4">
              <span className="font-semibold">Total:</span> {devis.total} €
            </p>
            <button
              onClick={generatePDF}
              className="w-full rounded bg-green-500 py-2 text-white hover:bg-green-600"
            >
              Exporter en PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
