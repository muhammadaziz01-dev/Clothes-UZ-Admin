import request from "../config"

// ----------------> Instance Product <-------------------------------------
export interface PostData{
    age_max: number,
    age_min: number,
    category_id: string,
    color: boolean,
    cost: number,
    count: number,
    description: string,
    discount:number,
    for_gender: string,
    made_in: string,
    product_name: string,
    size: number
}

export interface UpdateData extends PostData{
    product_id: string,
}

interface getParams{
    page:number;
    limit:number;
    name?:string;
}



interface Product{
    post : (data:PostData)=> any,
    delete : (id:string)=> any,
    get : (params:getParams)=> any,
    update : (data:UpdateData)=> any,
}

// ---------> Interface Store Product <--------------------
export interface StoreProduct {
    isLoader:boolean;
    data:any[];
    totlCount:number;
    getProduct: (params:getParams)=> Promise <any>;
    postProduct: (data:PostData)=> Promise <any>;
    deleteProduct: (id:string)=> Promise <any>;
    updateProduct: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance Product <----------------------------
export const product:Product = {
    post: (data)=> request.post("/product" , data),
    delete: (id)=> request.delete(`/product/${id}`),
    get: (params)=> request.get(`/products`, {params}),
    update: (data)=> request.put(`/product`, data)
}