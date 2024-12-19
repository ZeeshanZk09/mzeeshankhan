   // src/types/emailjs-browser.d.ts
   declare module '@emailjs/browser' {
    export function send(
      serviceID: string,
      templateID: string,
      templateParams: Record<string, unknown>,
      userID: string
    ): Promise<EmailJSResponseStatus>;
  }