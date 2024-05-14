
import request from "../config"

// ----------------> Instance Worker <-------------------------------------
export interface PostData{
    age: string | number,
    email: string,
    first_name: string,
    gender: string,
    last_name: string,
    password: string,
    phone_number: string,
    id?: string,
}

export interface UpdateData extends PostData{
    access_token?: string,
    refresh_token?: string
}

interface getParams{
    page:number;
    limit:number;
}



interface Worker{
    post : (data:PostData)=> any,
    delete : (id:string)=> any,
    get : (params:getParams)=> any,
    update : (data:UpdateData)=> any,
}

// ---------> Interface Store Worker <--------------------
export interface StoreWorker {
    isLoader:boolean;
    data:any[];
    totlCount:number;
    getData: (params:getParams)=> Promise <any>;
    postData: (data:PostData)=> Promise <any>;
    deleteData: (id:string)=> Promise <any>;
    updateData: (data:UpdateData)=> Promise <any>;
}




// ----------------> Instance Worker <----------------------------
export const worker:Worker = {
    post: (data)=> request.post("/worker" , data),
    delete: (id)=> request.delete(`/worker/${id}`),
    get: (params)=> request.get(`/workers?page=${params.page}&limit=${params.limit}`),
    update: (data)=> request.put(`/worker`, data)
}