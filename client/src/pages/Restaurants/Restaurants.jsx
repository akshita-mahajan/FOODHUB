import "./Restaurants.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { restaurants } from "../../data/restaurantData";
import {
  FiSearch,
  FiHeart,
  FiX,
} from "react-icons/fi";

function Restaurants() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState("All");

  /* =========================
     RESTAURANT WISHLIST
  ========================== */

  const [wishlist, setWishlist] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem(
          "foodhub_restaurant_wishlist"
        )
      ) || []
    );
  });

  const filters = [
    "All",
    "Indian",
    "Italian",
    "Fast Food",
    "Free Delivery",
    "Top Rated",
  ];

  /* =========================
     FILTER RESTAURANTS
  ========================== */

  const filteredRestaurants = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return restaurants.filter((item) => {
      const searchMatch =
        !searchValue ||
        item.name
          .toLowerCase()
          .includes(searchValue) ||
        item.cuisine
          .toLowerCase()
          .includes(searchValue) ||
        item.type
          .toLowerCase()
          .includes(searchValue);

      const filterMatch =
        activeFilter === "All" ||
        item.type === activeFilter ||
        (activeFilter === "Free Delivery" &&
          item.delivery
            .toLowerCase()
            .includes("free")) ||
        (activeFilter === "Top Rated" &&
          item.rating >= 4.8);

      return searchMatch && filterMatch;
    });
  }, [search, activeFilter]);

  /* =========================
     CLEAR SEARCH
  ========================== */

  const clearSearch = () => {
    setSearch("");
  };

  /* =========================
     TOGGLE RESTAURANT WISHLIST
  ========================== */

  const toggleWishlist = (restaurant) => {
    const alreadySaved = wishlist.some(
      (item) => item.id === restaurant.id
    );

    let updatedWishlist;

    if (alreadySaved) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== restaurant.id
      );
    } else {
      updatedWishlist = [
        ...wishlist,
        restaurant,
      ];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "foodhub_restaurant_wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  /* =========================
     CHECK WISHLIST
  ========================== */

  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  return (
    <main className="restaurants-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="restaurants-hero">

        <span>
          PREMIUM RESTAURANTS
        </span>

        <h1>
          Order from the best places near you.
        </h1>

        <p>
          Discover top-rated restaurants, exclusive
          discounts, quick delivery, and premium
          FoodHub partners.
        </p>

        {/* SEARCH */}

        <div className="restaurant-search">

          <FiSearch />

          <input
            type="text"
            placeholder="Search restaurants, cuisines..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}

        </div>

      </section>

      {/* =========================
          FILTERS
      ========================== */}

      <section className="restaurant-filters">

        {filters.map((item) => (

          <button
            key={item}
            type="button"
            className={
              activeFilter === item
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(item)
            }
          >
            {item}
          </button>

        ))}

      </section>

      {/* =========================
          RESTAURANTS
      ========================== */}

      <section className="restaurants-content">

        <div className="restaurants-heading">

          <span>
            TOP PICKS
          </span>

          <h2>
            {search
              ? `Results for "${search}"`
              : "Popular restaurants near you"}
          </h2>

        </div>

        {filteredRestaurants.length > 0 ? (

          <div className="restaurants-grid">

            {filteredRestaurants.map((item) => {

              const saved =
                isWishlisted(item.id);

              return (
                <article
                  className="restaurant-card"
                  key={item.id}
                  onClick={() =>
                    navigate(
                      `/restaurants/${item.id}`
                    )
                  }
                >

                  <div className="restaurant-img">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    {/* HEART */}

                    <button
                      type="button"
                      className={`heart-btn ${
                        saved
                          ? "heart-active"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      aria-label={
                        saved
                          ? `Remove ${item.name} from favorites`
                          : `Add ${item.name} to favorites`
                      }
                    >
                      <FiHeart
                        fill={
                          saved
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <span className="offer-badge">
                      {item.offer}
                    </span>

                  </div>

                  <div className="restaurant-content">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.cuisine}
                    </p>

                    <div className="restaurant-meta">

                      <span>
                        ⭐ {item.rating}
                      </span>

                      <span>
                        ⏱ {item.time}
                      </span>

                      <span>
                        {item.delivery}
                      </span>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        ) : (

          /* =========================
             NO RESULTS
          ========================== */

          <div className="restaurants-empty">

            <div className="empty-icon">
              <FiSearch />
            </div>

            <h3>
              No restaurants found
            </h3>

            <p>
              We couldn't find any restaurants
              matching
              {search && (
                <strong>
                  {" "}
                  "{search}"
                </strong>
              )}
              .
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
            >
              Clear Search & Filters
            </button>

          </div>

        )}

      </section>

    </main>
  );
}

export default Restaurants;