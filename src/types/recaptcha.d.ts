declare module 'react-google-recaptcha' {
  import { Component } from 'react';

  interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    size?: 'normal' | 'compact';
    className?: string;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {}
}
