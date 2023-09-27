import { presentationDefinitions } from "../utils/presentation-definitions";
import useInitiateRequest, { VaultRequestType } from "./useInitiateRequest";
import useCompleteRequest from "./useCompleteRequest";
import { useEffect, useState } from "react";

type EmailTypeProps = {
  email: string;
};

export default function useInitiateEmailRequest({
  callbackUrl,
  doVerification,
  useVerifyVpMutation,
}: VaultRequestType) {
  const [data, setData] = useState<EmailTypeProps>();

  //Creating request using PEX
  const vaultRequest: VaultRequestType = {
    presentationDefinition: presentationDefinitions.emailVc,
    callbackUrl,
    doVerification,
    useVerifyVpMutation,
  };

  //Initalizing request
  const { isInitializing, isExtensionInstalled, handleInitiate } =
    useInitiateRequest(vaultRequest);

  //Completing the request
  const { vpToken, error, errorDescription, isLoading, isCompliant } =
    useCompleteRequest(vaultRequest);

  useEffect(() => {
    if (vpToken && !isLoading && isCompliant) {
      //received vp token and its valid
      const emailVC = vpToken.verifiableCredential.find(
        (vc: any) => vc.type.indexOf("Email") > -1
      );

      if (emailVC) {
        const credentialSubject = Array.isArray(emailVC.credentialSubject)
          ? emailVC.credentialSubject[0]
          : emailVC.credentialSubject;
        setData((state) => ({ ...state, ...credentialSubject }));
      }
    }
  }, [vpToken, isLoading, isCompliant]);

  return {
    isInitializing,
    isExtensionInstalled,
    handleInitiate,
    isLoading: vpToken && isLoading,
    error,
    errorDescription,
    profileData: data,
  };
}
