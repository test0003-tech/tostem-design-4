'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, Calendar, Clock, ArrowRight, Share2, Twitter, Linkedin, Link2, Mail, Tag, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/lib/tostem-data';

function navigateTo(slug: string) { window.location.hash = `/${slug}`; }

const blogCategories = ['All', 'Windows', 'Guide', 'Innovation', 'Education', 'Energy'];

const popularTopics = [
  { label: 'Aluminium Windows', slug: 'aluminium-windows' },
  { label: 'Soundproofing', slug: 'soundproofing' },
  { label: 'Energy Efficiency', slug: 'energy-efficiency' },
  { label: 'Pre-Engineered Systems', slug: 'pre-engineered-systems' },
  { label: 'Japanese Innovation', slug: 'japanese-innovation' },
  { label: 'Window Selection Guide', slug: 'window-selection' },
  { label: 'Thermal Insulation', slug: 'thermal-insulation' },
  { label: 'Interior Design', slug: 'interior-design' },
];

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);
  const displayedRemaining = remainingPosts.slice(0, visibleCount - 1);
  const hasMore = remainingPosts.length > visibleCount - 1;

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(POSTS_PER_PAGE);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  }, [email]);

  const handleShare = useCallback((platform: string, postTitle: string) => {
    // Simulate share action
    void platform;
    void postTitle;
  }, []);

  return (
    <div className="pt-[88px] lg:pt-[132px]">
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden bg-tostem-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-dark via-tostem-dark/80 to-tostem-blue/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Home className="w-3 h-3" />
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="hover:text-white">Home</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">Blog</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">Blog & Insights</h1>
              <p className="text-white/60">Expert insights, guides, and the latest trends in aluminium windows and doors.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-[88px] lg:top-[132px] z-30 bg-white border-b shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-tostem-blue text-white shadow-sm'
                    : 'bg-tostem-light-gray text-tostem-dark hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Featured Post */}
              {featuredPost && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 mb-8 cursor-pointer"
                  onClick={() => navigateTo(featuredPost.id)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 aspect-[16/9] md:aspect-auto relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${featuredPost.image})` }}
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-tostem-blue text-white text-[11px] px-3 py-1">Featured</Badge>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <Badge className="bg-tostem-light-gray text-tostem-dark text-[10px] hover:bg-tostem-light-gray">{featuredPost.category}</Badge>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(featuredPost.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-tostem-dark mb-3 group-hover:text-tostem-blue transition-colors leading-tight">{featuredPost.title}</h2>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-tostem-blue font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read Article <ArrowRight className="w-4 h-4" />
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleShare('twitter', featuredPost.title); }}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-tostem-blue transition-colors"
                            aria-label="Share on Twitter"
                          >
                            <Twitter className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleShare('linkedin', featuredPost.title); }}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-tostem-blue transition-colors"
                            aria-label="Share on LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleShare('copy', featuredPost.title); }}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-tostem-blue transition-colors"
                            aria-label="Copy link"
                          >
                            <Link2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Post Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                  {displayedRemaining.map((post, i) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer"
                      onClick={() => navigateTo(post.id)}
                    >
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${post.image})` }}
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-tostem-blue text-white text-[10px]">{post.category}</Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-bold text-tostem-dark mb-2 group-hover:text-tostem-blue transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                          <span className="text-tostem-blue font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleShare('twitter', post.title); }}
                              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-tostem-blue transition-colors"
                              aria-label="Share"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleShare('copy', post.title); }}
                              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-tostem-blue transition-colors"
                              aria-label="Copy link"
                            >
                              <Link2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-tostem-blue text-tostem-blue hover:bg-tostem-blue hover:text-white rounded-full px-8"
                    onClick={handleLoadMore}
                  >
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-[180px] space-y-8">
                {/* Popular Topics */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-tostem-dark mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-tostem-blue" />
                    Popular Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTopics.map((topic) => (
                      <button
                        key={topic.slug}
                        onClick={() => navigateTo(topic.slug)}
                        className="text-xs bg-tostem-light-gray text-tostem-dark px-3 py-1.5 rounded-full hover:bg-tostem-blue hover:text-white transition-colors"
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-tostem-dark rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-tostem-blue" />
                    <h3 className="text-lg font-bold text-white">Newsletter</h3>
                  </div>
                  <p className="text-sm text-white/60 mb-4">Get the latest articles and insights delivered to your inbox.</p>
                  {subscribed ? (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Thanks for subscribing!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:border-tostem-blue"
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full bg-tostem-blue hover:bg-tostem-blue/90 text-white rounded-full"
                      >
                        Subscribe
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-tostem-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tostem-blue/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-tostem-blue/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">Want expert advice?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">Our team of specialists is ready to help you choose the perfect windows and doors for your project.</p>
            <Button
              size="lg"
              className="bg-tostem-blue hover:bg-tostem-blue/90 text-white rounded-full px-8"
              onClick={() => navigateTo('contact')}
            >
              Contact Us <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
