interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  footer?: React.ReactNode;
}

// 복잡한 구조의 Props를 받아서 카드 형태의 UI를 렌더링하는 컴포넌트
export default function Card({
  title,
  description,
  imageUrl,
  footer,
}: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

