import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);
const Payment = () => {
  const [isBought, setIsBought] = useState(false);
  const location = useLocation();
  const { title, price } = location.state;
  const options = {
    title: title,
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };
  return (
    <section className="payment">
      <div className="container">
        <div className="ticket">
          <div className={isBought ? "invisible" : "payment-details"}>
            <p>Résumé de la commande - {title}</p>
            <div>
              <p>Commande</p>
              <p>{price} €</p>
            </div>
            <div>
              <p>Frais protection acheteurs</p>
              <p>0.50 €</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>1.00 €</p>
            </div>
            <div className="divider"></div>
            <div className="total-payment">
              <p>Total</p>
              <p>{price + 0.5 + 1.0} €</p>
            </div>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir{" "}
              <span>{title}</span>. Vous allez payer{" "}
              <span>{price + 0.5 + 1.0} € </span>
              (frais de protection et frais de port inclus).
            </p>
          </div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              title={title}
              price={options.amount}
              isBought={isBought}
              setIsBought={setIsBought}
            />
          </Elements>
        </div>
      </div>
    </section>
  );
};
export default Payment;
