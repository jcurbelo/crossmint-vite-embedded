import "./App.css";
import {
  CrossmintCheckoutProvider,
  CrossmintEmbeddedCheckout,
  CrossmintProvider,
  useCrossmintCheckout,
} from "@crossmint/client-sdk-react-ui";

const clientApiKey = import.meta.env.VITE_CLIENT_API_KEY;
const collectionId = import.meta.env.VITE_COLLECTION_ID;

function App() {
  return (
    <div className="container">
      <CrossmintProvider apiKey={clientApiKey}>
        <CrossmintCheckoutProvider>
          <Checkout />
        </CrossmintCheckoutProvider>
      </CrossmintProvider>
    </div>
  );
}

function Checkout() {
  const { order } = useCrossmintCheckout();

  if (order?.phase === "completed") {
    return <div>NFT Delivered</div>;
  }

  return (
    <CrossmintEmbeddedCheckout
      lineItems={{
        collectionLocator: `crossmint:${collectionId}`,
        callData: {
          totalPrice: "0.03",
        },
      }}
      payment={{
        crypto: {
          enabled: true,
        },
        fiat: {
          enabled: true,
        },
      }}
    />
  );
}

export default App;
