"use client";
import { useRouter } from "next/navigation";
const SuccessPage = () => {
  const router = useRouter();
  const homeHandler = () => {
    router.push("/");
  };
  return (
    <div className="text-center mx-auto max-w-[480px] mt-12">
      <div className="relative inline-block mb-8">
        {/* Check Icon with Confetti Background */}
        <div className="relative z-10 bg-[url('/check-confetti.svg')] bg-center bg-no-repeat bg-cover w-[152px] h-[152px]"></div>
        <div
          className="absolute top-0 left-0 bg-[url('/confeti_square.gif')] bg-center bg-no-repeat bg-cover w-[152px] h-[152px]"
          style={{ backgroundSize: "97%" }}
        ></div>
      </div>

      <p className="text-3xl font-bold mb-6">
        Fantastic! Your form was submitted correctly.
      </p>

      <p className="text-base leading-6 mb-4">
        Your Data is successfully stored in our system you will shortly recieve
        a confirmation email
      </p>

      <p className="text-base leading-6">You'll hear from us soon.</p>
      <button
        type="button"
        onClick={homeHandler}
        className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-200 mt-8 cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessPage;
