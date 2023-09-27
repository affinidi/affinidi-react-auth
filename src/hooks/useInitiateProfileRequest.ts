import {presentationDefinitions} from '../utils/presentation-definitions'
import useInitiateRequest, {VaultRequestType} from './useInitiateRequest'
import useCompleteRequest from './useCompleteRequest'
import {useEffect, useState} from 'react'

type ProfileTypeProps = {
  email: string
  givenName?: string
  familyName?: string
  phoneNumber?: string
  birthdate?: string
  gender?: string
  address?: {
    formatted?: string
    postalCode?: string
    locality?: string
    country?: string
  }
}

export default function useInitiateProfileRequest({
  callbackUrl,
  doVerification,
  useVerifyVpMutation
}: VaultRequestType) {
  const [data, setData] = useState<ProfileTypeProps>()

  //Creating request using PEX
  const vaultRequest: VaultRequestType = {
    presentationDefinition: presentationDefinitions.emailAndProfileVC,
    callbackUrl,
    doVerification,
    useVerifyVpMutation
  }

  //Initalizing request
  const {isInitializing, isExtensionInstalled, handleInitiate} = useInitiateRequest(vaultRequest)

  //Completing the request
  const {vpToken, error, errorDescription, isLoading, isCompliant} =
    useCompleteRequest(vaultRequest)

  useEffect(() => {
    if (vpToken && !isLoading && isCompliant) {
      //received vp token and its valid
      const emailVC = vpToken.verifiableCredential.find((vc: any) => vc.type.indexOf('Email') > -1)
      const profileVC = vpToken.verifiableCredential.find(
        (vc: any) => vc.type.indexOf('UserProfile') > -1
      )

      if (emailVC) {
        const credentialSubject = Array.isArray(emailVC.credentialSubject)
          ? emailVC.credentialSubject[0]
          : emailVC.credentialSubject
        setData(state => ({...state, ...credentialSubject}))
      }

      if (profileVC) {
        const credentialSubject = Array.isArray(profileVC.credentialSubject)
          ? profileVC.credentialSubject[0]
          : profileVC.credentialSubject
        //set name, address etc.. from profile VC
        setData(state => ({
          ...state,
          ...credentialSubject
        }))
      }
    }
  }, [vpToken, isLoading, isCompliant])

  return {
    isInitializing,
    isExtensionInstalled,
    handleInitiate,
    isLoading: vpToken && isLoading,
    error,
    errorDescription,
    profileData: data
  }
}
