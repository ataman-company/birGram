// "use client";
// import { Copy, X } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// const MoreModal = ({ onClose, user }) => {
//   const handleCopyHesab = () => {
//     if (!user?.hesab) return;
//     navigator.clipboard
//       .writeText(user.hesab)
//       .then(() => {
//         toast.success("حساب کپی شد!");
//       })
//       .catch(() => {
//         toast.error("خطا در کپی کردن حساب");
//       });
//   };

//   // Sample data for daily & monthly limits

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-4 right-4">
//           <X size={20} className="text-gray-600" />
//         </button>

//         {/* Modal Title */}

//         {/* Tabs for Daily & Monthly */}

//         {/* Transaction List */}
//         <div className="modal-header mt-4 py-4">
//           <h2>آدرس حساب مالی</h2>
//         </div>
//         <div className="modal-body">
//           <p className="text-sm text-gray-500 mb-4">
//             {user.name} {user.family}
//           </p>
//           <div className="border border-blue-400 rounded-lg p-3 bg-blue-50 flex justify-between items-center">
//             <p className="font-semibold text-lg text-gray-900">{user.hesab}</p>
//             <button onClick={handleCopyHesab} className="text-blue-600">
//               <Copy className="h-5 w-5" /> {/* Copy icon */}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoreModal;

"use client";
import { Copy, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const MoreModal = ({ onClose, user }) => {
  const handleCopyHesab = () => {
    if (!user?.hesab) return;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(user.hesab)
        .then(() => {
          toast.success("حساب کپی شد!");
        })
        .catch(() => {
          toast.error("خطا در کپی کردن حساب");
        });
    } else {
      // Fallback: create a temporary textarea and use execCommand
      const textarea = document.createElement("textarea");
      textarea.value = user.hesab;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          toast.success("حساب کپی شد!");
        } else {
          toast.error("خطا در کپی کردن حساب");
        }
      } catch (err) {
        toast.error("خطا در کپی کردن حساب");
      }
      document.body.removeChild(textarea);
    }
  };

  // Handles closing when clicking outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose(); // Close the modal when clicking on the backdrop
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick} // Detects clicks outside the modal
    >
      <div
        className="bg-white rounded-xl p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} className="text-gray-600" />
        </button>

        {/* Modal Title */}
        <div className="modal-header mt-4 py-4">
          <h2>آدرس حساب مالی</h2>
        </div>

        {/* User Information */}
        <div className="modal-body">
          <p className="text-sm text-gray-500 mb-4">
            {user.name} {user.family}
          </p>
          <div className="border border-blue-400 rounded-lg p-3 bg-blue-50 flex justify-between items-center">
            <p className="font-semibold text-lg text-gray-900">{user.hesab}</p>
            <button onClick={handleCopyHesab} className="text-blue-600">
              <Copy className="h-5 w-5" /> {/* Copy icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreModal;
