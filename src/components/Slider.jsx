import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import Spinner from "./Spinner";

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));

      const querySnap = await getDocs(q);

      let listingsFromQuery = [];

      querySnap.forEach((doc) => {
        return listingsFromQuery.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listingsFromQuery);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
        >
          {listings.map(({ data, id }) => {
            return (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`category/${data.type}/${id}`)}
              >
                <div
                  className="swiperSlideDiv"
                  style={{
                    background: `url(${data.imgURLs[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  <p className="swiperSlideText">{data.name}</p>
                  <p className="swiperSlidePrice">
                    $
                    {data.discountedPrice
                      ? data.discountedPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : data.regularPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {data.type === "rent" && " / Month"}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    )
  );
}

export default Slider;
