import React, { useState } from 'react';
import { CheckCircle2, ThumbsUp, Plus, Quote, X, MessageSquareHeart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ReviewSection: React.FC = () => {
  const { reviews, addReview } = useCart();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Write Review Form State
  const [authorName, setAuthorName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    addReview({
      author: authorName,
      title: reviewTitle || 'Exceptional Quality & Fit',
      comment: reviewComment,
      verifiedBuyer: true
    });

    setIsWriteModalOpen(false);
    setAuthorName('');
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <section id="reviews-section" className="py-24 bg-[#fafafa] text-zinc-900 relative overflow-hidden border-t border-zinc-200">
      
      {/* Background Decorative Accent */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-zinc-800 font-mono text-xs tracking-widest uppercase mb-3 font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              CUSTOMER EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 uppercase">
              CLIENT REVIEWS
            </h2>
            <p className="text-zinc-500 text-sm max-w-md mt-2 font-normal">
              Authentic feedback from verified customers across Pakistan.
            </p>
          </div>

          {/* Action Button */}
          <button
            id="write-review-open-btn"
            onClick={() => setIsWriteModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-6 py-3.5 rounded-full font-bold text-xs font-mono tracking-wider transition-all active:scale-95 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Pure Reviews Grid - Clean, Aesthetic & Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="bg-white border border-zinc-200 hover:border-zinc-400 rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm hover:shadow-md relative group"
            >
              {/* Quote Mark Accent */}
              <div className="absolute top-6 right-6 text-zinc-200 group-hover:text-zinc-300 transition-colors pointer-events-none">
                <Quote className="w-8 h-8 rotate-180 fill-zinc-100 stroke-zinc-300" />
              </div>

              <div className="space-y-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-mono font-bold text-sm text-zinc-900 shrink-0 shadow-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-950">
                      <span>{rev.author}</span>
                      {rev.verifiedBuyer !== false && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Customer" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 block">{rev.date}</span>
                  </div>
                </div>

                {/* Review Title & Comment */}
                <div className="space-y-2 pt-1">
                  <h3 className="font-bold text-zinc-950 text-base leading-snug">
                    "{rev.title}"
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                </div>
              </div>

              {/* Footer Thumbs / Helpful */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="text-zinc-400 text-[11px]">
                  Verified Purchase
                </span>

                <button
                  id={`review-helpful-${rev.id}`}
                  className="flex items-center gap-1.5 hover:text-black transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{rev.helpfulCount || 1} Helpful</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-zinc-900">
            
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                  FEEDBACK
                </span>
                <h3 className="text-xl font-bold text-zinc-950">Share Your Experience</h3>
              </div>
              <button
                id="close-write-review-btn"
                onClick={() => setIsWriteModalOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              <div>
                <label className="block text-xs font-mono text-zinc-700 mb-1.5 font-medium">
                  YOUR FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilal Ahmed"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs p-3 rounded-xl focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-700 mb-1.5 font-medium">
                  REVIEW TITLE
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incredible fabric drape and premium feel"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs p-3 rounded-xl focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-700 mb-1.5 font-medium">
                  YOUR REVIEW
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your thoughts about the comfort, weight, tailoring, and styling..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs p-3 rounded-xl focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-review-btn"
                  className="w-full bg-black text-white hover:bg-zinc-800 py-3.5 rounded-xl font-bold font-mono text-xs tracking-wider transition-colors shadow-md"
                >
                  SUBMIT REVIEW
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
