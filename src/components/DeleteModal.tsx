"use client";

import { useState } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  foodName: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  foodName,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to delete food:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "var(--font-source-sans)",
            fontWeight: 700,
            fontSize: "34px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#FF9A0E",
          }}
        >
          Delete Meal
        </h2>
        <p className="text-foreground mb-6 text-center">
          Are you sure you want to delete <strong>{foodName}</strong>? This
          action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            data-test-id="food-confirm-delete-btn"
            className="food-btn flex-1 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{
              background: "linear-gradient(90deg, #FFBA26 0%, #FF9A0E 100%)",
              borderRadius: "11.9px",
              paddingTop: "17.85px",
              paddingRight: "40.8px",
              paddingBottom: "17.85px",
              paddingLeft: "40.8px",
              height: "51px",
              fontFamily: "var(--font-source-sans)",
              fontWeight: 700,
              fontSize: "15.3px",
              lineHeight: "100%",
              letterSpacing: "0%",
              boxShadow:
                "0px 14px 32px 0px rgba(255, 178, 14, 0.29), 0px 5px 8px 0px rgba(222, 151, 0, 0.24)",
            }}
          >
            {isDeleting ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Deleting...
              </>
            ) : (
              "Yes"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="food-btn flex-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "transparent",
              border: "1px solid #FFBA26",
              borderRadius: "11.9px",
              paddingTop: "17.85px",
              paddingRight: "40.8px",
              paddingBottom: "17.85px",
              paddingLeft: "40.8px",
              height: "51px",
              fontFamily: "var(--font-source-sans)",
              fontWeight: 700,
              fontSize: "15.3px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#000000",
              textAlign: "center",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
