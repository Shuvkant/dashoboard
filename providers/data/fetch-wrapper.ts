import { GraphQLFormattedError } from "../../node_modules/graphql/index.d.ts";

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
 
const getGraphQlErrors=(body:Record <"errors" , GraphQLFormattedError[]|| undefined>):Error| null=>{
 if(!body){
    return {
      message :'Unknown error',
      statusCode:"Internal_Server_Error"
    }
  } 
}
