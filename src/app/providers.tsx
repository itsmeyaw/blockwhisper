import React from "react";
import {ThirdwebProvider} from "thirdweb/react";

const Providers = ({children} : {children: React.ReactNode}) => {
    return (
        <ThirdwebProvider>
            {children}
        </ThirdwebProvider>
    )
}

export default Providers
