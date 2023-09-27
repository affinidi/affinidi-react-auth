import {useState, useEffect} from 'react'
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

const useAffinidiProfile = ({
  redirectTo = '/',
  authCompleteUrl = '/api/affinidi-auth/complete'
} = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState<string | undefined>(undefined)
  const [state, setState] = useState<string | null>(null)

  useEffect(() => {
    const urlObject = new URL(window.location.href)
    const params = new URLSearchParams(urlObject.search)
    const code = params.get('code')
    const error = params.get('error')
    if (code) {
      setCode(code)
      setState(params.get('state'))
    } else if (error) {
      setStorgageData({error: `${(error as any).message}`})
    }
  }, [])

  useEffect(() => {
    if (!code) {
      return
    }

    const getProfile = async ({code, state}: {code: string; state: string | null | undefined}) => {
      setIsLoading(true)
      const res = await fetch(authCompleteUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({code, state})
      })

      const response = await res.json()
      if (response.error) {
        setStorgageData({
          error: `${response.error}-${response.error_description}`
        })
      } else {
        setStorgageData({profile: response.user})
      }
      setIsLoading(false)
      console.log(response)
      window.location.href = redirectTo
    }

    getProfile({code, state})
  }, [code, state])

  async function handleLogout() {
    clearStorgageData()
  }

  return {
    handleLogout,
    isLoading,
    ...getStorgageData()
  }
}

export default useAffinidiProfile
