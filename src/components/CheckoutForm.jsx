import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CheckoutForm = ({ title, price, isBought, setIsBought }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();
  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (elements == null) {
        return;
      }
      // Vérification et validation des infos entrées dans les inputs
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Affiche l'erreur en question
        setErrorMessage(submitError.message);
        setIsLoading(false);
        return;
      }
      // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: price,
        }
      );

      const clientSecret = response.data.client_secret;

      // Requête à Stripe pour valider le paiement
      const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements,
        clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });
      // Si une erreur a lieu pendant la confirmation
      if (stripeResponse.error) {
        // On la montre au client
        setErrorMessage(stripeResponse.error.message);
        return;
      }

      // Si on reçois un status succeeded on fais passer completed à true
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
        setIsBought(true);
      }

      // On a fini de charger
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return completed ? (
    <div className="confirmation-message">
      <h2>Merci pour votre achat !</h2>
      <p>Récapitulatif de votre commande : </p>
      <div>
        {title} - {Number(price / 100).toFixed(2)} €
      </div>
      <Link to="/">
        <button className="back-home">Retour à la page d'acceuil</button>
      </Link>
    </div>
  ) : (
    <form className="form-payment" onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="payment-cta"
        type="submit"
        disabled={!stripe || !elements || isLoading}
      >
        Payer
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
