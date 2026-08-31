import React from 'react';
import { Instagram, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const CommunityGallery: React.FC = () => {
  const { openQuickView } = useCart();

  const communityPosts = [
    {
      id: 'post-1',
      author: '@noir.archive',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop',
      caption: 'Double pleats & chunky sole stack in Berlin.',
      likes: '1.4k',
      linkedProductId: 'prod-trouser-01'
    },
    {
      id: 'post-2',
      author: '@asad.streetwear',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
      caption: '300 GSM chalk white tee. The drape is unreal.',
      likes: '2.8k',
      linkedProductId: 'prod-tee-01'
    },
    {
      id: 'post-3',
      author: '@tokyo.minimal',
      image: 'https://images.unsplash.com/photo-1625910513413-5b870c538743?q=80&w=800&auto=format&fit=crop',
      caption: 'Waffle knit polo layered with pleated bottoms.',
      likes: '940',
      linkedProductId: 'prod-polo-01'
    },
    {
      id: 'post-4',
      author: '@studio.drape',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
      caption: 'Japanese ripstop cargo trousers on set.',
      likes: '3.1k',
      linkedProductId: 'prod-trouser-02'
    }
  ];

  const handlePostClick = (prodId: string) => {
    const p = PRODUCTS.find((item) => item.id === prodId);
    if (p) openQuickView(p);
  };

  return (
    <section className="py-20 bg-white text-zinc-900 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-1 font-semibold">
              <Instagram className="w-3.5 h-3.5 text-black" />
              #MONOCHROMESTUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-zinc-950 uppercase">
              TAGGED IN THE WILD
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-600 max-w-sm">
            Tag @monochromestudio in your fit photos on Instagram & TikTok to be featured in the global archive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.linkedProductId)}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Top Handle & Likes */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {post.author}
                </span>
                <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  {post.likes}
                </span>
              </div>

              {/* Bottom Caption & Shop Tag */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <p className="text-xs text-zinc-200 line-clamp-2">
                  "{post.caption}"
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-white pt-1 border-t border-white/20">
                  <span className="font-bold underline underline-offset-4">TAP TO SHOP LOOK</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
