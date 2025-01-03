interface CustomMarkerProps {
  price: number;
  type: string;
}

const formatPrice = (price: number, type: string) => {
  const formattedPrice = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return type === "rent" ? `${formattedPrice}/month` : formattedPrice;
};

export default function CustomMarker({ price, type }: CustomMarkerProps) {
  const priceText = formatPrice(price, type);

  return `
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="50" viewBox="0 0 120 50">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.2"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="120" height="50" rx="10" ry="10" fill="#fff" stroke="#4285F4" stroke-width="2" filter="url(#shadow)"/>
        <text x="10" y="30" font-size="16" font-family="Arial" fill="#333" dominant-baseline="middle">
          ${priceText}
        </text>
        <path d="M60 50 C 40 50, 40 60, 60 60 C 80 60, 80 50, 60 50 Z" fill="#4285F4" />
      </svg>
    `;
}
