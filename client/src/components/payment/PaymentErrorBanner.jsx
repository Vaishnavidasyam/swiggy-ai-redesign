import { AlertTriangle, RotateCcw } from "lucide-react";

export default function PaymentErrorBanner({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-100 rounded-[24px] p-4 mb-5">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center shrink-0">
          <AlertTriangle size={18} />
        </div>

        <div className="flex-1">
          <h2 className="font-black text-red-600 text-sm">Payment Failed</h2>

          <p className="text-red-500 text-xs mt-1 leading-6">{error}</p>

          <button
            onClick={onRetry}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2"
          >
            <RotateCcw size={14} />
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
}
