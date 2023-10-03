import { useEffect, useState } from 'react'
import { useExtension } from './useExtension'
import { VaultRequestType } from './useInitiateRequest'
import { errorDescriptionMessageMap, errorMessageMap } from '../types'

export default function useCompleteRequest({
  presentationDefinition,
  callbackUrl,
  doVerification = true,
  useVerifyVpMutation,
}: VaultRequestType) {
  const { client } = useExtension()

  const [error, setError] = useState<string>()
  const [errorDescription, setErrorDescription] = useState<string>()
  const [vpToken, setVpToken] = useState<any>()
  const [presentationSubmission, setPresentationSubmission] = useState<any>()

  const { mutate, ...mutation } = (useVerifyVpMutation && useVerifyVpMutation()) || {}

  useEffect(() => {
    if (window.location.href.indexOf(callbackUrl) == -1) return

    try {
      const response = client.completeAuth(window.location.href)

      if ('error' in response) {
        setError(errorMessageMap[response.error] || 'Unexpected error')
        setErrorDescription(
          (response.errorDescription && errorDescriptionMessageMap[response.errorDescription]) || undefined,
        )
        return
      } else {
        setVpToken(response.vpToken)
        setPresentationSubmission(response.presentationSubmission)
      }
    } catch (err: any) {
      setError(err.messsage || 'Unexpected error')
    }
  }, [client, setVpToken, setPresentationSubmission])

  useEffect(() => {
    if (doVerification && mutation && mutation.error) {
      setVpToken(undefined)
      setPresentationSubmission(undefined)
      setError('Could not verify your data')
      setErrorDescription(mutation.error.message)
    }
  }, [mutation.error])

  useEffect(() => {
    if (vpToken && doVerification && mutate) {
      // VP verification
      mutate({
        verifiablePresentation: vpToken,
        presentationSubmission,
        presentationDefinition,
      })
    }
  }, [vpToken, presentationSubmission, mutate])

  return {
    vpToken,
    presentationSubmission,
    error,
    errorDescription,
    isLoading: doVerification ? mutation.isIdle || mutation.isLoading : false,
    isCompliant: doVerification ? Boolean(mutation.data?.isCompliant) : true,
  }
}
