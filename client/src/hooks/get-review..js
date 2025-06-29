const { default: axiosInstance } = require("@/lib/axios.config");
const { useState, useEffect } = require("react");

const useReviews = (groupId) => {
  const [reviews, setReviews] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);

  const [avgRating, setAvgRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/reviews?group=${groupId}&limit=900000`
        );
        if (res.success) {
          setReviews(res.data.data);
          setTotalReviews(res.data.data.length);

          // calculate avg rating
          const totalRating = res.data.data.reduce(
            (acc, review) => acc + (review.rating || 0),
            0
          );

          const avgRating =
            res.data.data.length > 0 ? totalRating / res.data.data.length : 0;

          setAvgRating(Number(avgRating.toFixed(1)));
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error when fetching reviews", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [groupId]);

  return {
    reviews,
    totalReviews,
    avgRating,
    loading,
    success,
    error,
  };
};

export default useReviews;
