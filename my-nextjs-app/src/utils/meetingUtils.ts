// Generate time slots between 9:00 and 16:00 every 30 minutes
export const generateTimeSlots = (): string[] => {
  const slots = [];
  for (let hour = 9; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 16 && minute === 30) break; // Don't include 16:30
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

// Get minimum date (today)
export const getMinDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Get maximum date (3 months from today)
export const getMaxDate = (): string => {
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  return maxDate.toISOString().split('T')[0];
};

// Validate meeting time
export const isValidMeetingTime = (time: string): boolean => {
  const timeSlots = generateTimeSlots();
  return timeSlots.includes(time);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time for display
export const formatTime = (timeString: string): string => {
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(minute));
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

