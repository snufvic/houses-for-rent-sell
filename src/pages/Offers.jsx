import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, "listings");

        // create query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // execute query
        const querySnap = await getDocs(q);
        const fetchedListings = [];
        querySnap.forEach((doc) => {
          return fetchedListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(fetchedListings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);
  return (
    <div className="m-3 m-lg-5">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <main>
          <ul className="p-0">
            {listings.map((listing) => {
              return (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              );
            })}
          </ul>
        </main>
      ) : (
        <p>No current offers</p>
      )}
    </div>
  );
}

export default Offers;
