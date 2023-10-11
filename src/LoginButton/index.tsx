import React from "react";
import * as S from './index.styled'
import { AffinidiLoginTypeProps } from "../types";
import useAffinidiLogin from "../hooks/useAffinidiLogin";

const AffinidiLoginButton = (props: AffinidiLoginTypeProps) => {

  const { isLoading, getAuthUrl } = useAffinidiLogin({ authInitUrl: props.authInitUrl });

  async function logInHandler() {
    const data = await getAuthUrl();
    window.location.href = data.authorizationUrl;
  }

  return (
    <S.Wrapper className="affinidi-login-div" style={{ ...props.containerStyles }}>
      <S.Button onClick={props.logInHandler || logInHandler} disabled={props.isLoading || isLoading} style={{ ...props.buttonStyles }}>
        <S.Img alt="logo affinidi" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAExUlEQVRoge2ZT2iURxjGf+/styZmq1WjiSQbkSYYCwVrRNCDUJUehEqhQrSHilpq1UsvxYMglUov0ksp2CoE+8eDUPDQQy/9Z/9SWoyeihW1rckGjTVWaVw3uztPD18SNcluvk2yyR7ywMB++80z87zzzbzvvDMwi1lMCjZF7cSgJQH354SPNQNwpR/IR2+iPgEkwBSdE+QnaEBDDbi1YBswrQGWA7VA1WCFDNAH/IXsPOgHyP4GN/sLt9l4CGeHgPsRRcQQV4MShbfi3B7ENqAZVGzAmoBVwIvhY/waljyL9x3Qc2lUbWfzEAlQIpIUA7C7LprwZCOu8TjmLiAOYmrGiop/pCMNlaeQ3sTcBVzyBDQmR1T02KCwKCVEPoIBja9gdILtxzS3pCk6yhgDUzXSXsw6oWnXxBsLUcSANfFw1PkEUx1MQvgwBtswwLQE06nwawAoN4E+rMAaaJmP9Z5GtvXRfssCsRe3bCH+eg/UgKsFRe+wgBdqrAV7BpSZIpnjIGULNv+0Pt395e+ZP47chuUxyI5HMiA9DeKioe5lHavfoY5SeRG9UPlhyuWk/J4l23O7S+FVjAFeeCQMHWvYoaaovIoxICbnAQxbnPP5w1F5g16oqRnT+0CM8vqcsaHufPqfX1ur69aB8oB2xlccXp69fDSPJQs4GjmM7tAAx6ugLdOneKQW8Nl7w4/mgqq5S597Pnv56KCfLDCmsi4H9Qmkl6ZF6Jgihn6EIV4SSMxZtEo2b4Pwd4qxMw6CdcCKMsuMDDMDPLGqhRZPbhH0U2zX73BuU9EaMwBJYI6q2tXj1g2QNoasmbJhaA6NFhAkmkIvKc8ohxnWnhsgTgGfMxPe56GSgXhi2QtIm4b/kydINPZS3fYeDy7moOFxA4WB+ipm6izdoSPe594yLPwWEmbu76f3uZZzGy1XiFcxgSzvc/HhpTi8G1XNpeMsLMarGAMmiooxIOaC7MOEZ2hm2/2VBygaCAJIvkZ4ojBDixige2Dg30sb4k+2An5o/uOz96rPbdl8ENzoRRyu9L4AYzewfgZUD0IgyPZfJ75g5cNhNEeuP1XPg853sIbRNANkPQFm3yKtn1SyPhk8vpV4bJRz/V1hADBHgQmSdnj/TaG3MwWzMA5kbl8Yt66D3C/A5fLLigZJgCOfuaNs1xcGT1BsfB3c7Mfs7LQpHInhSRNuJcwMzBjou2j670fDLSjGrgrzAU8HZs8yUwkN5F18fivQDCCfy6RvfPc9kA+3DGNtGMKEZlpVFsPS9vzbde1Z1W/Pqa49dzIqr2ICWd68AxC6FbjY0ai8Ek+nywdnOIUbuYM9Z6wrKq9iDJAFgUFH7xn7qBReAQOm/2gx3fvzjXTqq6+BtaUcLRbIB1rmY5nToK1TK7SQFPdZeLibeAO3qJTD3asFFvGVe6huG2Yfhh2oPAXAOIm/3o5L3g19vi+JX8QLnc/iu/Yj7UTWOzV5/yNtyG4h7cJ3vz74LphAH4rgRlOfItpAHyBLTy75F8jS4E4gtUHq40k0BkSOA90pfOoA8qsxjiG7iizaScZQPdk1sHeRb8N37YPUiCgqhyByCREr9zXrn8g6y3nNOoUX3YtrYM6gAdN30V2KyFnMYgz8D4yD44VCwb0lAAAAAElFTkSuQmCC" crossOrigin="anonymous" />
        Affinidi Login
      </S.Button>
    </S.Wrapper>
  );
};

export default AffinidiLoginButton;
