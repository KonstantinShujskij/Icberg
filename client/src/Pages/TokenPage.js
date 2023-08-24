import React, { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";


function TokenPage() {
    const [searchParams] = useSearchParams()
    
    useEffect(() => {
        const token = searchParams.get('token')
        const id = searchParams.get('id')

        window.opener.authenticateCallback(token, id)
        window.close()
    }, [searchParams])

    return (
        <div className="token">
            Loading...
        </div>
    );
}

export default TokenPage
