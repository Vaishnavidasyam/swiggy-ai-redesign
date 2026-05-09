import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import {
  CheckCircle2,
  Clock3,
  Bike,
  Home,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import api from "../api";

import socket from "../socket";

import DeliveryMap from "../components/DeliveryMap";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [liveStatus, setLiveStatus] = useState("Order placed");

  const [progress, setProgress] = useState(25);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/orders/${id}`);

        setOrder(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    load();

    socket.emit("join-order-room", id);

    socket.on("order-status-update", (data) => {
      setLiveStatus(data.status);

      if (data.status.includes("Preparing")) {
        setProgress(45);
      }

      if (data.status.includes("delivery")) {
        setProgress(80);
      }

      if (data.status.includes("Delivered")) {
        setProgress(100);
      }
    });

    /* PUSH NOTIFICATION */

    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("Your order is out for delivery 🚀");
      }
    }, 10000);

    return () => {
      socket.off("order-status-update");
    };
  }, [id]);

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="pb-28">
      {/* SUCCESS */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="px-4 pt-10 text-center"
      >
        <div className="bg-green-100 h-28 w-28 rounded-full mx-auto flex items-center justify-center shadow-xl">
          <CheckCircle2 size={60} className="text-green-600" />
        </div>

        <h1 className="text-4xl font-black mt-6">Order Confirmed 🎉</h1>

        <p className="text-gray-500 mt-3">Your delicious food is on the way</p>
      </motion.div>

      {/* LIVE STATUS */}

      <div className="px-4 mt-8">
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-[32px] p-6 text-white shadow-2xl overflow-hidden relative">
          {/* GLOW */}

          <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl" />

          <p className="text-orange-100 text-sm relative z-10">
            Live Order Status
          </p>

          <h2 className="text-3xl font-black mt-2 relative z-10">
            {liveStatus}
          </h2>

          <p className="mt-4 text-orange-100 relative z-10">ETA: 28 mins</p>

          {/* PROGRESS */}

          <div className="mt-6 relative z-10">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="h-full bg-white rounded-full"
              />
            </div>

            <div className="flex justify-between text-xs mt-2 text-orange-100">
              <span>Placed</span>

              <span>Preparing</span>

              <span>Delivery</span>

              <span>Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAP */}

      <div className="px-4 mt-8">
        <DeliveryMap />
      </div>

      {/* DELIVERY PARTNER */}

      <div className="px-4 mt-8">
        <div className="bg-white rounded-[32px] p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img
                src="/images/rider.jpg"
                alt="rider"
                className="h-16 w-16 rounded-2xl object-cover"
              />

              <div>
                <h3 className="font-black text-lg">Rahul Kumar</h3>

                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  4.9 Rating
                </div>
              </div>
            </div>

            <button className="bg-orange-100 text-orange-600 h-14 w-14 rounded-2xl flex items-center justify-center">
              <Phone size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* DELIVERY OTP */}

      <div className="px-4 mt-8">
        <div className="bg-white rounded-[32px] p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 h-14 w-14 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="text-green-600" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Delivery OTP</p>

              <h2 className="text-3xl font-black tracking-[10px]">4821</h2>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}

      <div className="px-4 mt-10">
        <h2 className="font-black text-2xl mb-6">Tracking Timeline</h2>

        <div className="space-y-6">
          <TrackStep icon={<CheckCircle2 />} title="Order Confirmed" done />

          <TrackStep
            icon={<Clock3 />}
            title="Preparing Food"
            done={progress >= 45}
          />

          <TrackStep
            icon={<Bike />}
            title="Out for Delivery"
            done={progress >= 80}
          />

          <TrackStep icon={<Home />} title="Delivered" done={progress >= 100} />
        </div>
      </div>

      {/* ORDER ITEMS */}

      <div className="px-4 mt-10">
        <div className="bg-white rounded-[32px] p-5 shadow-xl">
          <h2 className="font-black text-2xl mb-5">Order Items</h2>

          <div className="space-y-5">
            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{item.name}</p>

                  <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                </div>

                <p className="font-black text-lg">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOME */}

      <div className="px-4 mt-10">
        <Link to="/">
          <button className="w-full bg-orange-500 text-white py-5 rounded-[28px] font-black text-lg shadow-2xl">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

function TrackStep({ icon, title, done }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="flex gap-4"
    >
      <div
        className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-md ${
          done ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-black text-lg">{title}</h3>

        <p className="text-gray-500 text-sm">
          {done ? "Completed" : "Pending"}
        </p>
      </div>
    </motion.div>
  );
}
