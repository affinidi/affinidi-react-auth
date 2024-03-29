import { useState } from 'react'

const useAffinidiLogin = ({ authInitUrl = '/api/affinidi-auth/init' } = {}) => {
  const [isLoading, setIsLoading] = useState(false)

  async function getAuthUrl() {
    try {
      setIsLoading(true)
      const res = await fetch(authInitUrl, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      return data
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getAuthUrl,
    isLoading,
  }
}

export default useAffinidiLogin
