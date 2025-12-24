import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Wallet, ArrowUpCircle, ArrowDownCircle, Search } from 'lucide-react';

interface UserExpense {
  refNo: number;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description: string;
}

const ExpenseDashboard = () => {
  const [expenses, setExpenses] = useState<UserExpense[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'EXPENSE',
    description: ''
  });

  // Get logged-in user from localStorage (set during Login)
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch('http://localhost:8080/expense/all',{method:"GET", credentials: "include"});
    const data = await res.json();
    setExpenses(data);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      user: { id: loggedInUser.id } // Sending User object as required by your Entity
    };

    const res = await fetch('http://localhost:8080/expense/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    if (res.ok) {
      fetchExpenses();
      setShowModal(false);
      setFormData({ title: '', amount: '', type: 'EXPENSE', description: '' });
    }
  };

  const deleteExpense = async (id: number) => {
    await fetch(`http://localhost:8080/expense/delete/${id}`, { method: 'DELETE', 
        credentials: "include"
    }
        
    );
    setExpenses(expenses.filter(exp => exp.refNo !== id));
  };

  const totalBalance = expenses.reduce((acc, curr) => 
    curr.type === 'INCOME' ? acc + curr.amount : acc - curr.amount, 0
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Area */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Financial Overview</h1>
            <p className="text-slate-500 font-medium">Welcome back, {loggedInUser.userName}!</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add Transaction
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Balance" amount={totalBalance} icon={<Wallet />} color="bg-indigo-600 text-white" />
          <StatCard title="Total Income" amount={expenses.filter(e => e.type === 'INCOME').reduce((a, b) => a + b.amount, 0)} icon={<ArrowUpCircle />} color="bg-white text-emerald-600 border border-slate-100" />
          <StatCard title="Total Expenses" amount={expenses.filter(e => e.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0)} icon={<ArrowDownCircle />} color="bg-white text-rose-600 border border-slate-100" />
        </div>

        <div className="bg-white rounded-3xl shadow-xs border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <div className="flex gap-2">
               <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none" />
               </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {expenses.map((expense) => (
                  <tr key={expense.refNo} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-700">{expense.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${expense.type === 'INCOME' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {expense.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-mono font-bold ${expense.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {expense.type === 'INCOME' ? '+' : '-'}${expense.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">{expense.description}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteExpense(expense.refNo)} className="p-2 text-slate-300 hover:text-rose-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl scale-in">
            <h2 className="text-2xl font-black mb-6">New Entry</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none outline-indigo-500" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none outline-indigo-500" />
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none outline-indigo-500 font-bold">
                  <option value="EXPENSE">Expense</option>
                  <option value="INCOME">Income</option>
                </select>
              </div>
              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none outline-indigo-500 min-h-[100px]" />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 font-bold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, amount, icon, color }: any) => (
  <div className={`p-6 rounded-3xl shadow-xs transition-transform hover:scale-[1.02] ${color}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-white/20 rounded-2xl">{icon}</div>
      <span className="font-bold opacity-80 uppercase text-xs tracking-widest">{title}</span>
    </div>
    <div className="text-3xl font-black leading-none">${amount.toLocaleString()}</div>
  </div>
);

export default ExpenseDashboard;