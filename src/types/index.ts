import { CSSProperties, MouseEventHandler } from 'react'

export type AffinidiLoginTypeProps = {
  logInHandler?: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading?: boolean
  containerStyles?: CSSProperties | undefined
  buttonStyles?: CSSProperties | undefined
}
