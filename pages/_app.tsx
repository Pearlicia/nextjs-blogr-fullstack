import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"

const App = ({ Component, pageProps: { session, ...pageProps },}: AppProps) => {
  return (
    <SessionProvider session={session}>
       <Component {...pageProps} />
     </SessionProvider>
    );
};

export default App;



// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }