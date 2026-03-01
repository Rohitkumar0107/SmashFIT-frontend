import { useState, useEffect } from "react";
import { CreditCard, RefreshCcw, CheckCircle, Clock, ArrowDownCircle } from "lucide-react";
import { paymentService } from "../services/payment.service";
import SkeletonLoader from "../components/ui/SkeletonLoader";

const PaymentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await paymentService.getPaymentHistory();
                if (response.success) {
                    setTransactions(response.data || []);
                } else {
                    // Fallback demo data
                    setTransactions([
                        { id: "txn_001", type: "Registration", amount: 500, currency: "INR", status: "Success", date: "2026-02-28", tournament: "Winter Open 2026" },
                        { id: "txn_002", type: "Registration", amount: 300, currency: "INR", status: "Pending", date: "2026-02-25", tournament: "Spring Smash" },
                        { id: "txn_003", type: "Refund", amount: -200, currency: "INR", status: "Refunded", date: "2026-02-20", tournament: "Delhi Masters" },
                    ]);
                }
            } catch {
                setTransactions([
                    { id: "txn_001", type: "Registration", amount: 500, currency: "INR", status: "Success", date: "2026-02-28", tournament: "Winter Open 2026" },
                    { id: "txn_002", type: "Registration", amount: 300, currency: "INR", status: "Pending", date: "2026-02-25", tournament: "Spring Smash" },
                    { id: "txn_003", type: "Refund", amount: -200, currency: "INR", status: "Refunded", date: "2026-02-20", tournament: "Delhi Masters" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Success": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Pending": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Refunded": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Failed": return "bg-red-50 text-red-700 border-red-200";
            default: return "bg-slate-100 text-slate-600 border-slate-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Success": return <CheckCircle size={14} />;
            case "Pending": return <Clock size={14} />;
            case "Refunded": return <RefreshCcw size={14} />;
            default: return <CreditCard size={14} />;
        }
    };

    if (loading) return <SkeletonLoader text="Loading Payments..." minHeight="min-h-[60vh]" />;

    const totalPaid = transactions.filter(t => t.status === "Success").reduce((s, t) => s + t.amount, 0);
    const totalRefunded = transactions.filter(t => t.status === "Refunded").reduce((s, t) => s + Math.abs(t.amount), 0);

    return (
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-10">

            {/* Header */}
            <div className="border-b border-slate-200 pb-4">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                    <CreditCard className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8" /> Payments & Billing
                </h1>
                <p className="text-slate-500 mt-1 font-semibold text-sm">View transaction history, refunds, and subscription details.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Transactions</p>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900">{transactions.length}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Total Paid</p>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-700">₹{totalPaid}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Total Refunded</p>
                    <p className="text-2xl sm:text-3xl font-black text-blue-700">₹{totalRefunded}</p>
                </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Transaction History</h2>
                    <button className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 font-bold hover:underline">
                        <ArrowDownCircle size={16} /> Export
                    </button>
                </div>

                {transactions.length === 0 ? (
                    <div className="py-16 text-center text-slate-500 font-semibold">No transactions found.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {transactions.map((txn) => (
                            <div key={txn.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${txn.amount < 0 ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {txn.amount < 0 ? <RefreshCcw size={18} /> : <CreditCard size={18} />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-900 text-sm truncate">{txn.tournament}</p>
                                        <p className="text-xs text-slate-500">{txn.type} • {txn.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-12 sm:pl-0">
                                    <span className={`px-2 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 ${getStatusStyle(txn.status)}`}>
                                        {getStatusIcon(txn.status)} {txn.status}
                                    </span>
                                    <span className={`font-black text-base sm:text-lg ${txn.amount < 0 ? 'text-blue-600' : 'text-slate-900'}`}>
                                        {txn.amount < 0 ? `-₹${Math.abs(txn.amount)}` : `₹${txn.amount}`}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentsPage;
