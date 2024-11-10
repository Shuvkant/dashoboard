import { GraphQLFormattedError } from "../../node_modules/graphql/index.d.ts";

type Error={
  message:string;
  statusCode:string;
}

const customFetch = async (url: stirng, options: RequestInit) => {
  const accessToken = localStorage.getItem("access-token");
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options, 
    headers:{
      ...headers,
      Authorization:headers?Authorization || `Bearer ${accessToken}`,
        "Content-type":"application/json",
      "Apollo-Require-Preflight":"true", 

    }
  })
};
 
const getGraphQlErrors=(body:Record <"errors" , GraphQLFormattedError[] || undefined>):Error| null=>{
 if(!body){
    return {
      message :'Unknown error',
      statusCode:"Internal_Server_Error"
    }
  } 
if("errors" in body){
  const errors=body?.errors

  const messages=errors?.map((error)=>error?.message)?.join("");
  const code =errors?.[0]?.extensions?.code;
  

  return {
    message: messages ||JSON.stringify(errors), 
    statusCode: code || 500
  }
}
}

const fetchWrapper= async (url:string, options: RequestInit)=>{
  const response=await customFetch(url,options);
 
  const responseClone=response.clone();

  const errors=getGraphQlErrors(body);

  if(error){
    throw error;
  }
  return response

}
