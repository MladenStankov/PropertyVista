import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { emailVerify } from '../apis/auth.api'

const EmailVerify = () => {  
  const { token } = useParams<{ token?: string }>()

  const {isLoading, error} = useQuery({
    queryKey: ['email', token],
    queryFn: () => emailVerify({token})
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error</div>
  }

  return(
    <div>
      Success
    </div>
  )

}

export default EmailVerify