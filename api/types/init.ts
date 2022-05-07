export default interface SignInProps {
  username: string;
  password: string;
}

export interface SignUpProps extends SignInProps {
  passwordConfirmation: string;
}
