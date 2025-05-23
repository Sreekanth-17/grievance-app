import { useState } from 'react';
import './HeartPattern.css';

const GrievanceForm = ({ onLogout }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    mood: '',
    severity: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://grievance-app.onrender.com/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Grievance submitted! 💌");
  };

  return (
    <div className="heart-pattern min-h-screen flex flex-col items-center justify-center px-4">
      <button
        onClick={onLogout}
        className="self-end mr-10 mb-4 px-4 py-2 bg-purple-300 hover:bg-purple-400 rounded-lg text-purple-900 font-semibold transition"
      >
        Logout
      </button>

      {/* New heading above the form */}
      <h1
        className="mb-6 text-center text-purple-800 font-extrabold text-3xl sm:text-4xl max-w-xl px-4 leading-tight drop-shadow-md"
        style={{ userSelect: 'none' }}
      >
        Enter Your Grievances Here — We’re All Ears!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xl w-full max-w-sm text-purple-700"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Submit a Grievance
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full mb-4 p-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <textarea
          placeholder="What’s bothering you?"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full mb-4 p-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 h-24 transition"
        />

        <select
          value={form.mood}
          onChange={(e) => setForm({ ...form, mood: e.target.value })}
          className="w-full mb-4 p-3 rounded-xl border border-purple-300 bg-white"
        >
          <option value="">💜 Mood</option>
          <option>😊 Happy</option>
          <option>😢 Sad</option>
          <option>😤 Angry</option>
          <option>🥺 Sensitive</option>
          <option>😈 Horny</option>
        </select>

        <select
          value={form.severity}
          onChange={(e) => setForm({ ...form, severity: e.target.value })}
          className="w-full mb-6 p-3 rounded-xl border border-purple-300 bg-white"
        >
          <option value="">What would you like to do?</option>
          <option>A lavender hug would help 🌿</option>
          <option>A chocolate will do for now 🍫</option>
          <option>This is serious 🫣</option>
          <option>Just venting 🤬</option>
          <option>A steamy makeout session 🥵</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-xl transition shadow-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GrievanceForm;
