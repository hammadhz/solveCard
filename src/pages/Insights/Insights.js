import React, { useEffect, useState } from "react";
import { InsightCard, LineChart } from "../../components/insights";
import { IoInformationCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const Insights = () => {
  const profileId = useSelector((state) => state.profile.profileId);
  const [analytics, setAnalytics] = useState([]);
  const [platformViews, setPlatformViews] = useState([]);
  const [topPlatform, setTopPlatform] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getAnalytics() {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/analytics", {
        profile_id: profileId,
        // from_date: "21-05-2023",
        // to_data: "06-10-2023",
      });
      if (response.status === 200) {
        setLoading(false);
        const { profile_views, link_views, connections, platform_views, top_platform } = response?.data;
        setAnalytics([
          { id: 1, title: "Profile Views", value: profile_views },
          { id: 2, title: "Link Views", value: link_views },
          { id: 3, title: "Connections", value: connections },
        ]);
        setPlatformViews(platform_views);
        setTopPlatform(top_platform);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    getAnalytics();
  }, [profileId]);

  return (
    <section className="">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div className="lg:col-span-2 grid lg:grid-cols-3 grid-cols-1 gap-4">
          {loading ? (
              <>
                {[1, 2, 3].map((id) => (
                    <div
                        key={id}
                        className="rounded-2xl h-36 w-full p-4 bg-gray-200 animate-pulse"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <p className="font-inter font-semibold text-lg">
                            Loading...
                          </p>
                          <IoInformationCircleOutline className="size-5" />
                        </div>
                        <div className="font-inter font-medium text-2xl">...</div>
                      </div>
                    </div>
                ))}
              </>
          ) : (
              <>
                {analytics?.map((result) => (
                    <InsightCard key={result.id} data={result} />
                ))}
              </>
          )}
        </div>

        <div className="rounded-2xl w-full p-4 bg-primary">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="font-inter font-semibold text-lg">Platform Views</p>
            </div>
            <div className="space-y-4">
              {platformViews.length > 0 ? (
                  platformViews.map((platform) => (
                      <div key={platform.title} className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center gap-2">
                          <img src={`${process.env.REACT_APP_SERVER}${platform.icon}`}
                               alt={platform.title} className="w-10 h-10" />
                          <p className="font-inter font-medium">{platform.title}</p>
                        </div>
                        <p className="font-inter text-sm text-gray-600">{platform.clicks} clicks</p>
                      </div>
                  ))
              ) : (
                  <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow">
                    <p className="font-inter text-sm text-gray-600">No platform views available</p>
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl w-full p-4 bg-primary">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="font-inter font-semibold text-lg">Top Platform</p>
            </div>
            <div className="space-y-4">
              {topPlatform ? (
                  <div key={topPlatform.title} className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow">
                    <div className="flex items-center gap-2">
                      <img src={`${process.env.REACT_APP_SERVER}${topPlatform.icon}`}
                           alt={topPlatform.title} className="w-10 h-10" />
                      <p className="font-inter font-medium">{topPlatform.title}</p>
                    </div>
                    <p className="font-inter text-sm text-gray-600">{topPlatform.clicks} clicks</p>
                  </div>
              ) : (
                  <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow">
                    <p className="font-inter text-sm text-gray-600">No top platform available</p>
                  </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Insights;
