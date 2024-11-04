import React, { useEffect, useState } from "react";
import { InsightCard, LineChart } from "../../components/insights";
import { IoInformationCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const Insights = () => {
  const profileId = useSelector((state) => state.profile.profileId);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAnalytics() {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/analytics", {
        profile_id: profileId,
        from_date: "21-05-2023",
        to_data: "06-10-2023",
      });
      if (response.status === 200) {
        setLoading(false);
        const { profile_views, link_views, connections } = response?.data;
        setAnalytics([
          { id: 1, title: "Profile Views", value: profile_views },
          { id: 2, title: "Link Views", value: link_views },
          { id: 3, title: "Connections", value: connections },
        ]);
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
  }, []);

  return (
    <section className="">
      <div className="grid grid-cols-4  gap-6">
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

        <div className="rounded-2xl h-36 w-full p-4 bg-primary">
          <div className="flex flex-col gap-3">
            <div className="flex items-center  gap-2">
              <p className="font-inter font-semibold text-lg">Value</p>
              <IoInformationCircleOutline className="size-5" title="test" />
            </div>
            <div className="font-inter font-medium text-2xl">0</div>
          </div>
        </div>

        <div className="rounded-2xl h-[500px] w-full p-4 bg-primary col-span-3 row-span-6 ">
          <div className="flex flex-col items-start justify-start gap-3">
            <p className="font-inter font-semibold text-lg">Recent Activity</p>
            <LineChart />
          </div>
        </div>
        <div className="rounded-2xl h-56 w-full p-4 bg-primary  row-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center  gap-2">
              <p className="font-inter font-semibold text-lg">
                Recent Activity
              </p>
              <IoInformationCircleOutline className="size-5" title="test" />
            </div>
            <div className="font-inter font-medium text-2xl">0</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
