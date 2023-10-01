import randomstring from 'randomstring'
import { useExtension } from './useExtension'

export type VaultRequestType = {
  presentationDefinition?: any
  callbackUrl: string
  doVerification?: boolean
  useVerifyVpMutation?: Function
}

export default function useInitiateRequest({ presentationDefinition, callbackUrl }: VaultRequestType) {
  const { isInitializing, isExtensionInstalled, client } = useExtension()

  async function handleInitiate() {
    if (!isExtensionInstalled) {
      window.location.href = client.getChromeWebStoreUrl()
      return
    }

    client.initiateAuth({
      nonce: randomstring.generate(),
      state: randomstring.generate(),
      responseDestination: {
        responseMode: 'query',
        redirectUri: `${callbackUrl}`,
      },
      presentationDefinition,
    })
  }

  return {
    isInitializing,
    isExtensionInstalled,
    handleInitiate,
  }
}
