import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function useVerifyAccess(roles: string, session: Session|null , status: string) {
    useEffect(() => {
        if (status === "unauthenticated") {
        signIn("keycloak", {
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        }); 
        }
        if(session){
        if(!session?.user.roles.includes(roles)){  
            redirect('/')
        }
        }
    }, [session])
}

export default useVerifyAccess
