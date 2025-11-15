interface EmptyStateProps {
  message?: string;
  description?: string;
}

export default function EmptyState({
  message = "No items available",
  description = "Try adding some food items to get started",
}: EmptyStateProps) {
  return (
    <div className="empty-state-message flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">🍽️</div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">{message}</h3>
      <p className="text-gray-medium max-w-md">{description}</p>
    </div>
  );
}
