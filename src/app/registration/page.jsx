import Reg from "./Reg";

export default function Page(){

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    return <Reg apiUrl={apiUrl} />
}