export const formatStringToCash = (amount: string) => {
  // Remove any non-digit characters
  const digitsOnly = amount.replace(/\D/g, '');

  // If the input is empty or invalid, return an empty string
  if (!digitsOnly) {
    return '';
  }

  // Format as currency
  const formatted = (parseInt(digitsOnly) / 100).toFixed(2);

  // Add commas
  const parts = formatted.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const formatNumberToCash = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
