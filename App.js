import MainContainer from "./screens/MainContainer";
import Provider from "./context/Provider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { REACT_APP_PAYPAL_CLIENT_ID } from '@env'

export default function App() {
console.log(REACT_APP_PAYPAL_CLIENT_ID)
  return (
    <PayPalScriptProvider options={{ clientId: REACT_APP_PAYPAL_CLIENT_ID, buyerCountry: "BR"}}>
      <Provider>
        <MainContainer />
      </Provider>
    </PayPalScriptProvider>
  );
}
 