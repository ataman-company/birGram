import { useRouter } from "next/navigation";
import CardRenderer from "./CardRenderer";

const ShoppingCartModal = ({
  onClose,
  giftCarts,
  getCartCountByGiftId,
  onChange,
  totalCount,
}) => {
  const router = useRouter();
  const handleCloseModal = (e) => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleCloseModal}
    >
      {/* Modal content container */}
      <div
        className="
          relative 
          w-11/12 
          max-w-3xl 
          bg-white 
          rounded 
          shadow-lg 
          p-6
          max-h-[80vh]
          overflow-y-auto
        "
        // Prevent closing when clicking inside
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">سبد خرید</h2>

        {/* If no data, display empty message */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {giftCarts.length > 0 ? (
            giftCarts.map((gift) => {
              const currentCount = getCartCountByGiftId(gift.id);

              return (
                <CardRenderer
                  key={gift.id}
                  gift={gift}
                  count={currentCount || 0}
                  onChange={onChange}
                  totalCount={totalCount}
                />
              );
            })
          ) : (
            <p>سبد خرید شما خالی است.</p>
          )}
        </div>

        {/* Close Button */}
        <button
          className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition-colors"
          onClick={handleCloseModal}
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
