import React, { createContext, useContext, useState, useCallback } from 'react';
import { TableBooking, SeatingArea, DiningOccasion } from '@/types/booking';
import { generateBookingCode } from '@/lib/utils/formatters';
import { useToast } from './ToastContext';

interface BookingContextValue {
  bookingDraft: Partial<TableBooking>;
  confirmedBookings: TableBooking[];
  activeConfirmation: TableBooking | null;
  updateDraft: (fields: Partial<TableBooking>) => void;
  confirmBooking: (details: Omit<TableBooking, 'id' | 'confirmationCode' | 'createdAt' | 'status'>) => TableBooking;
  clearDraft: () => void;
  dismissConfirmation: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

const BOOKING_STORAGE_KEY = 'aureffle_bookings_v1';

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingDraft, setBookingDraft] = useState<Partial<TableBooking>>({
    guestsCount: 2,
    seatingArea: 'main-salon' as SeatingArea,
    occasion: 'casual' as DiningOccasion,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days ahead default
    timeSlot: '18:30',
  });

  const [confirmedBookings, setConfirmedBookings] = useState<TableBooking[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKING_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeConfirmation, setActiveConfirmation] = useState<TableBooking | null>(null);
  const { success } = useToast();

  const updateDraft = useCallback((fields: Partial<TableBooking>) => {
    setBookingDraft((prev) => ({ ...prev, ...fields }));
  }, []);

  const clearDraft = useCallback(() => {
    setBookingDraft({
      guestsCount: 2,
      seatingArea: 'main-salon',
      occasion: 'casual',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '18:30',
    });
  }, []);

  const confirmBooking = useCallback(
    (details: Omit<TableBooking, 'id' | 'confirmationCode' | 'createdAt' | 'status'>): TableBooking => {
      const confirmationCode = generateBookingCode();
      const newBooking: TableBooking = {
        ...details,
        id: `book_${Date.now()}`,
        confirmationCode,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      const updated = [newBooking, ...confirmedBookings];
      setConfirmedBookings(updated);
      setActiveConfirmation(newBooking);

      try {
        localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }

      success('Table Reserved Successfully', `Confirmation Code: ${confirmationCode}`);
      return newBooking;
    },
    [confirmedBookings, success]
  );

  const dismissConfirmation = useCallback(() => {
    setActiveConfirmation(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookingDraft,
        confirmedBookings,
        activeConfirmation,
        updateDraft,
        confirmBooking,
        clearDraft,
        dismissConfirmation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
