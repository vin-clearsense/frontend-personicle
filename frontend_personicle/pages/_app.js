import '../styles/globals.css'
import {Provider} from "next-auth/client"
import { Container } from "react-bootstrap";
import TimelineChart from "./TimelineChart";
import useGoogleCharts from './useGoogleCharts'

function MyApp({ Component, pageProps }) {
  const google = useGoogleCharts();
  
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
      <>
      <Container className="mt-3">
        <h1>With Hooks</h1>
        <TimelineChart google={google} />
      </Container>
    </>
    </Provider>

  );
}

export default MyApp;