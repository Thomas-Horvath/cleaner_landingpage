export type NavigationItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

export type CtaAction = {
  href: string;
  label: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type PriceItem = {
  title: string;
  price: string;
  description: string;
  bullets: string[];
};

export type ReferenceItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type BookingSlotLabel = 'morning' | 'afternoon' | 'evening';
export type BookingStatus = 'free' | 'pending' | 'confirmed';
export type BackendBookingStatus = 'pending' | 'confirmed' | 'cancelled';

export type BookingSlotApiItem = {
  id: number;
  booking_id: number;
  booking_date: string;
  slot: BookingSlotLabel;
  status: BackendBookingStatus;
  customer_name: string;
  service_type: string | null;
};

export type BookingSlotState = {
  bookingDate: string;
  slot: BookingSlotLabel;
  status: BookingStatus;
  customerName?: string;
  serviceType?: string | null;
};

export type BookingFormPayload = {
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string;
  message: string;
  booking_date: string;
  slot: BookingSlotLabel;
  website?: string;
  form_started_at?: number;
};

export type AdminLoginPayload = {
  username: string;
  password: string;
};

export type AdminSessionData = {
  username: string;
  display_name: string | null;
  logged_in_at: string | null;
};

export type AdminBookingSlot = {
  id: number;
  booking_date: string;
  slot: BookingSlotLabel;
};

export type AdminBookingItem = {
  id: number;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string | null;
  message: string | null;
  status: BackendBookingStatus;
  created_at: string;
  updated_at: string;
  slots: AdminBookingSlot[];
};

export type AdminBookingSummary = {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
};

export type AdminSlotAvailabilityItem = {
  id: number;
  booking_id: number;
  booking_date: string;
  slot: BookingSlotLabel;
  status: BackendBookingStatus;
  customer_name: string;
  service_type: string | null;
};
