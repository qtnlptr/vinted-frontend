import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;
  const options = {
    title: title,
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm title={title} price={options.amount} />
    </Elements>
  );
};
export default Payment;
