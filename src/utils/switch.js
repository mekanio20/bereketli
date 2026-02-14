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
  switch (String(status).trim().toLowerCase()) {
    case "pending":
      return "Garaşylýar";
    case "accepted":
      return "Tassyklanan";
    case "completed":
      return "Tamamlanan";
    case "in_transit":
      return "Transitda";
    case "customs":
      return "Gümrükde";
    case "delivered":
      return "Eltip berildi";
    case "cancelled":
      return "Ýatyrldy";
    case "rejected":
      return "Ret edilen";
  }
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
  switch (String(transportation_type).trim().toLowerCase()) {
    case "air":
      return "Uçar";
    case "sea":
      return "Deňiz";
    case "land":
      return "Ýol";
    case "rail":
      return "Demir ýol";
  }
};
