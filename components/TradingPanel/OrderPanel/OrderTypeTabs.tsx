import React from "react";

export type OrderType = "market" | "limit" | "tpsl";

interface OrderTypeTabsProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
}

const OrderTypeTabs: React.FC<OrderTypeTabsProps> = ({
  orderType,
  setOrderType,
}) => {
  return (
    <div className="flex w-full pt-4 pb-4 border-t border-b">
      {(["market", "limit", "tpsl"] as OrderType[]).map((type) => (
        <button
          key={type}
          onClick={() => setOrderType(type)}
          className={`flex-1 py-3 text-md font-semibold rounded-md capitalize transition-colors ${
            orderType === type
              ? "border text-white bg-background/90"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          {type === "tpsl" ? "TP/SL" : type}
        </button>
      ))}
    </div>
  );
};

export default OrderTypeTabs;
