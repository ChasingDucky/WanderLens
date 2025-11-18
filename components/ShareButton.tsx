'use client';

import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Share2 className="w-4 h-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">Share</span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-2 space-y-1">
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-900">Share on Twitter</span>
              </a>

              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Share on Facebook</span>
              </a>

              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
                <span className="text-sm font-medium text-gray-900">Share on LinkedIn</span>
              </a>

              <div className="border-t border-gray-200 my-1" />

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
