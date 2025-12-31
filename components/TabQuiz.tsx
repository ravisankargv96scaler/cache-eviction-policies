import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const QUESTIONS = [
    {
        id: 1,
        text: "Which policy is best for general-purpose caching where recently accessed items are likely to be accessed again?",
        options: ["FIFO", "LRU", "LIFO", "Random"],
        correct: 1 // Index
    },
    {
        id: 2,
        text: "Which policy behaves exactly like a stack of plates (Last-In, First-Out)?",
        options: ["LRU", "MRU", "LIFO", "LFU"],
        correct: 2
    },
    {
        id: 3,
        text: "In LFU (Least Frequently Used), what specifically determines which item is evicted?",
        options: ["Time since last access", "Order of insertion", "Total usage count", "Memory size"],
        correct: 2
    }
];

export const TabQuiz: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (qIndex: number, optIndex: number) => {
        if (submitted) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = optIndex;
        setAnswers(newAnswers);
    };

    const score = answers.reduce((acc, curr, idx) => curr === QUESTIONS[idx].correct ? acc + 1 : acc, 0);

    return (
        <div className="flex flex-col items-center space-y-8 w-full max-w-3xl mx-auto p-4 mb-20">
            <h3 className="text-2xl font-bold text-blue-400">Knowledge Check</h3>
            
            <div className="w-full space-y-6">
                {QUESTIONS.map((q, qIdx) => (
                    <div key={q.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h4 className="font-semibold text-lg text-white mb-4">{q.id}. {q.text}</h4>
                        <div className="space-y-2">
                            {q.options.map((opt, oIdx) => {
                                const isSelected = answers[qIdx] === oIdx;
                                const isCorrect = q.correct === oIdx;
                                let btnClass = "w-full text-left p-3 rounded-lg border transition-all ";
                                
                                if (submitted) {
                                    if (isCorrect) btnClass += "bg-green-900/40 border-green-500 text-green-300";
                                    else if (isSelected) btnClass += "bg-red-900/40 border-red-500 text-red-300";
                                    else btnClass += "border-slate-700 opacity-50";
                                } else {
                                    if (isSelected) btnClass += "bg-blue-600 border-blue-500 text-white";
                                    else btnClass += "bg-slate-900 border-slate-700 hover:bg-slate-700 text-slate-300";
                                }

                                return (
                                    <button 
                                        key={oIdx}
                                        onClick={() => handleSelect(qIdx, oIdx)}
                                        className={btnClass}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{opt}</span>
                                            {submitted && isCorrect && <CheckCircle size={18} className="text-green-500"/>}
                                            {submitted && isSelected && !isCorrect && <XCircle size={18} className="text-red-500"/>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {!submitted ? (
                <button 
                    onClick={() => setSubmitted(true)}
                    disabled={answers.includes(-1)}
                    className="bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition-transform hover:scale-105"
                >
                    Submit Answers
                </button>
            ) : (
                <div className="text-center p-6 bg-slate-800 rounded-xl border border-slate-600">
                    <p className="text-slate-400 text-sm uppercase tracking-widest">Final Score</p>
                    <div className="text-5xl font-black text-white mb-2">{score} / 3</div>
                    <button onClick={() => { setSubmitted(false); setAnswers([-1,-1,-1]); }} className="text-blue-400 underline mt-2">Try Again</button>
                </div>
            )}
        </div>
    );
};