export default function StockBadge({ quantity }: { quantity: number }) {
  if (quantity <= 0) {
    return <span className="text-xs font-medium text-red-500">Немає в наявності</span>;
  }
  if (quantity <= 5) {
    return <span className="text-xs font-medium text-amber-500">Залишилось {quantity} шт.</span>;
  }
  return <span className="text-xs font-medium text-green-600">В наявності</span>;
}
