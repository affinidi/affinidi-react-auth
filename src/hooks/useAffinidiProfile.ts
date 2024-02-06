import { useState, useEffect } from 'react'
import { errorDescriptionMessageMap, errorMessageMap } from '../types'
const storageKey = 'affinidi-login'

const getStorgageData = () => {
  const data = window.localStorage.getItem(storageKey)
  return data ? JSON.parse(data) : undefined
}
const setStorgageData = (data: any) => {
  window.localStorage.setItem(storageKey, JSON.stringify(data))
  return data
}
const clearStorgageData = () => {
  window.localStorage.removeItem(storageKey)
}

const useAffinidiProfile = ({ redirectTo = '/', authCompleteUrl = '/api/affinidi-auth/complete' } = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState<string | undefined>(undefined)
  const [state, setState] = useState<string | null>(null)

  useEffect(() => {
    const urlObject = new URL(window.location.href)
    const params = new URLSearchParams(urlObject.search)
    const pCode = params.get('code')
    const perror = params.get('error')
    if (pCode) {
      setCode(pCode)
      setState(params.get('state'))
    } else if (perror) {
      const errorDescription = params.get('error_description') || ''
      setStorgageData({
        error: `${errorMessageMap[perror] || 'Unexpected error'} - ${
          (errorDescription && errorDescriptionMessageMap[errorDescription]) || undefined
        }`,
      })
      window.location.href = redirectTo
    }
  }, [])

  useEffect(() => {
    if (!code) {
      return
    }

    const getProfile = async (params: { code: string; state: string | null }) => {
      setIsLoading(true)
      const res = await fetch(authCompleteUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(params),
      })

      const response = await res.json()
      if (response.error) {
        setStorgageData({
          error: `${response.error}-${response.error_description}`,
        })
      } else {
        setStorgageData({ profile: response.user })
      }
      setIsLoading(false)
      window.location.href = redirectTo
    }
    const params = { code, state }

    getProfile(params)
  }, [code, state])

  async function handleLogout() {
    clearStorgageData()
  }

  return {
    handleLogout,
    isLoading,
    ...getStorgageData(),
  }
}

export default useAffinidiProfile
