export const trackBuyMeCoffeeClick = () => {
  // If you have analytics set up, track the event
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Support',
      event_label: 'Buy Me a Coffee'
    });
  }
};