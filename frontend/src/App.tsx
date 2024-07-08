import { useEffect, useState } from "react";
import { baseAccount, getProgram, initializeAccount } from "./utils/utils";
import { PublicKey } from "@solana/web3.js";

type review = {
  movieTitle: String;
  review: String;
  rating: number;
  reviewer: PublicKey;
};

function App() {
  const [address, setAddress] = useState<null | String>(null);
  const [reviews, setReviews] = useState<null | review[]>(null);
  const [addReviewOpen, setAddReviewOpen] = useState<boolean>(false);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  async function connectSolanaWallet() {
    if (window.solana) {
      const res = await window.solana.connect();
      setAddress(res.publicKey.toString());
    } else {
      alert("Please install phantom wallet");
    }
  }

  async function getAllReviews() {
    try {
      const program = await getProgram();
      const account = await program.account.reviewAccount.fetch(
        baseAccount.publicKey
      );
      console.log(account);
      setReviews(account.reviews);
    } catch (error) {
      initializeAccount();
    }
  }

  async function addReview() {
    try {
      const program = await getProgram();
      if (address) {
        const tx = await program.methods
          .addReview(movieTitle, review, rating)
          .accountsPartial({
            reviewAccount: baseAccount.publicKey,
            reviewer: address.toString(),
          })
          .rpc();
        console.log(tx);

        getAllReviews();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    connectSolanaWallet();
    getAllReviews();
  }, []);

  if (!address) {
    return (
      <div>
        <h1>Please conect your wallet</h1>

        <button onClick={connectSolanaWallet}>Connect Wallet</button>
      </div>
    );
  }

  return (
    <main>
      <h1>Movie Reviews</h1>
      <h2>{address}</h2>
      <button
        onClick={() => {
          setAddReviewOpen(!addReviewOpen);
        }}
      >
        Add your review
      </button>
      {addReviewOpen && (
        <div>
          <input placeholder="Movie Title" />
          <input placeholder="Review" />
          <input placeholder="Rating" />
          <button onClick={addReview}>Add Review</button>
        </div>
      )}
      <div className="review-box">
        {reviews?.map((review) => {
          return (
            <div className="review">
              <h2>{review.movieTitle}</h2>
              <p>{review.review}</p>
              <p>{review.rating}</p>
            </div>
          );
        })}
      </div>{" "}
    </main>
  );
}

export default App;
