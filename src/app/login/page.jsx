import Login from "./Login"

export default function Page(){

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    return <Login apiUrl={apiUrl} />
}