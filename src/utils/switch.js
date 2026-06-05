import i18n from "@/i18n/index.js";

export const statusBadgeClass = (status) => {
  switch (String(status).trim().toLowerCase()) {
    case "pending":
      return "bg-[#FFECB4] text-[#D59E00]";
    case "accepted":
      return "bg-gradient-to-r from-green-100 to-green-200 text-green-800";
    case "completed":
      return "bg-[#B3FFCE] text-[#009D37]";
    case "delivered":
      return "bg-[#B3FFCE] text-[#009D37]";
    case "rejected":
      return "bg-[#FFC1C0] text-[#B50200]";
    case "in_transit":
      return "bg-[#CFE9FF] text-[#0B63B6]";
    case "customs":
      return "bg-[#E7DDFF] text-[#5B21B6]";
    case "cancelled":
      return "bg-[#FFC1C0] text-[#B50200]";
    default:
      return "bg-[#1490FF33] text-[#1490FF]";
  }
};

export const getStatusLabel = (status) => {
  const { t } = i18n.global;
  const key = String(status).trim().toLowerCase();
  return t(`statuses.${key}`);
};

export const orderProgress = (status) => {
  switch (String(status).trim().toLowerCase()) {
    case "pending":
      return 0;
    case "in_transit":
      return 25;
    case "customs":
      return 50;
    case "delivered":
      return 100;
    case "cancelled":
      return 0;
  }
};

export const getTransportTypeIcon = (transportation_type) => {
  switch (String(transportation_type).trim().toLowerCase()) {
    case "air":
      return "plane-icon";
    case "sea":
      return "mingcute_ship_line-icon";
    case "land":
      return "truck_delivery-icon";
    case "rail":
      return "train-icon";
  }
};

export const getTransportTypeLabel = (transportation_type) => {
  const { t } = i18n.global;

  const key = String(transportation_type)
    .trim()
    .toLowerCase();

  return t(`transportationTypes.${key}`);
};


export const notificationBadgeClass = (type) => {
  switch (String(type).trim().toUpperCase()) {
    case "ANNOUNCEMENT":
      return "bg-[#E7DDFF] text-[#5B21B6]"; // 🟣

    case "MESSAGE_CREATED":
      return "bg-[#CFE9FF] text-[#0B63B6]"; // 🔵

    case "ORDER_REQUEST_ACCEPTED":
      return "bg-[#B3FFCE] text-[#009D37]"; // 🟢

    case "ORDER_REQUEST_REJECTED":
      return "bg-[#FFC1C0] text-[#B50200]"; // 🔴

    case "ORDER_CREATED":
      return "bg-[#FFECB4] text-[#D59E00]"; // 🟡

    case "ORDER_STATUS_UPDATED":
      return "bg-[#DDE7FF] text-[#1E40AF]"; // 🔷

    case "ORDER_CHECKPOINT_ARRIVED":
      return "bg-[#CFFAFE] text-[#0E7490]"; // 🩵

    case "ORDER_DELIVERED":
      return "bg-[#A7F3D0] text-[#047857]"; // ✅

    default:
      return "bg-[#1490FF33] text-[#1490FF]";
  }
};

export const getNotificationLink = (item) => {
  switch (String(item?.event.content_type).trim().toLowerCase()) {
    case "order":
      return `/order/${item?.event.object_id}`;
    case "orderrequest":
      return `/order/requests/detail/${item?.event.object_id}`;
    default:
      return "#";
  }
};