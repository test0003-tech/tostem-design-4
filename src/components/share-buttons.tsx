'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, MessageCircle, Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ShareButtonsProps {
  title: string;
  className?: string;
}

export default function ShareButtons({ title, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${title} from Tostem India!`;

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    }
  }, [title, shareText, shareUrl]);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
      onClick: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
      },
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#1565d8] text-white',
      onClick: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      },
    },
    {
      name: 'X',
      icon: Twitter,
      color: 'bg-[#14171A] hover:bg-[#000] text-white',
      onClick: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      },
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-[#094d94] text-white',
      onClick: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
      },
    },
    {
      name: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Link2,
      color: copied
        ? 'bg-emerald-500 text-white'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
      onClick: handleCopyLink,
    },
  ];

  // On mobile, use Web Share API if available
  const isMobile = typeof window !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const canNativeShare = typeof window !== 'undefined' && !!navigator.share;

  if (isMobile && canNativeShare) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tostem-blue/10 text-tostem-blue hover:bg-tostem-blue/20 transition-colors text-sm font-medium"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Share2 className="w-4 h-4 text-tostem-text-muted mr-1 hidden sm:block" />
      {shareOptions.map((option) => {
        const Icon = option.icon;
        return (
          <Tooltip key={option.name}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={option.onClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${option.color}`}
                aria-label={option.name}
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {option.name}
            </TooltipContent>
          </Tooltip>
        );
      })}

      {/* Copied feedback toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
          >
            Link copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
