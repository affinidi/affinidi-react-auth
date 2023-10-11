import { CSSProperties, MouseEventHandler } from 'react'

export type AffinidiLoginTypeProps = {
  logInHandler?: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading?: boolean
  containerStyles?: CSSProperties | undefined
  buttonStyles?: CSSProperties | undefined
  authInitUrl?: string
}

export const errorMessageMap: Record<string, string> = {
  invalid_request: 'Invalid authorization request or We could not find any data that meets our criteria.',
  unauthorized_client: 'Unauthorized website',
  access_denied: 'Cancelled',
}

export const errorDescriptionMessageMap: Record<string, string> = {
  invalid_redirect_uri: 'Invalid redirect uri',
  not_logged_into_wallet: 'Not logged into the vault',
  unsupported_dcf_connector_type: 'Unsupported connector type',
  unsupported_concierge_question: 'Unsupported concierge question',
  missing_concierge_data: 'Missing Concierge data, please try again in few minutes',
  request_declined: 'Request has been declined by user',
  user_declined_connecting_missing_connectors: 'User has declined to connect missing connectors',
}
