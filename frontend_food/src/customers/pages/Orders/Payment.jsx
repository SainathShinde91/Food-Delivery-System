import React, { useEffect } from "react";
import OrderCard from "../../components/Order/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../../State/Customers/Orders/Action";
import PaymentCard from "../../components/Order/PaymentCard";

const Payment = () => {
  const { order, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt, dispatch, jwt]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">
        Payment History
      </h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {order.orders?.map((order) =>
          order.items?.map((item, index) => {
            const gstRate = 0.18; // 18% GST
            const quantity = item.quantity || 1;
            const basePrice = item.price * quantity;
            const gstAmount = basePrice * gstRate;
            const totalWithGst = basePrice + gstAmount;

            return (
              <PaymentCard
                key={`${order._id}-${item._id || index}`}
                status={order.paymentStatus}
                order={{
                  ...item,
                  quantity,
                  gstAmount,
                  totalWithGst,
                  basePrice,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Payment;
