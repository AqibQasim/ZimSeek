import SellerForm from "../../components/sellerForm";

function Home() {
  console.log("Firebase API Key:", process.env.FIREBASE_API_KEY);
  console.log("Firebase API Key:", process.env.FIREBASE_AUTH_DOMAIN);
  console.log("Firebase API Key:", process.env.FIREBASE_DATABASE_URL);
  console.log("Firebase API Key:", process.env.FIREBASE_PROJECT_ID);
  console.log("Firebase API Key:", process.env.FIREBASE_STORAGE_BUCKET);
  console.log("Firebase API Key:", process.env.FIREBASE_MESSAGING_SENDER_ID);
  console.log("Firebase API Key:", process.env.FIREBASE_APP_ID);
  console.log("Firebase API Key:", process.env.FIREBASE_MEASUREMENT_ID);

  return <SellerForm />;
}

export default Home;
