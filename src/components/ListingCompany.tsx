'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import DeleteACategory from './DeleteACategory';
import FormUpdateCategory from './FormUpdateCategory';


interface Category {
    id:number
    name: string;
}


const ListingCategory = () => {
  const [categorys, setCategorys] = useState<Category[]>([]);

  const apiEndPoint = "http://localhost:3000/cat/category";
  useEffect(() => {
    const getCategorys = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setCategorys(res);
    };
    getCategorys();
  }, []);

  
  if (categorys.length === 0) return <h2> there are no category in the Database </h2>;
  return (
    <>
      <div className="container">
        <h2> there are {categorys.length} categorie in the Database </h2>
        
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((category) => (
              <tr key={category.id}>
                <td> {category.name} </td>
                <td>
                  <FormUpdateCategory categoryId={category.id} name={category.name}/>
                </td>
                <td>
                    <DeleteACategory categoryId={category.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListingCategory;