'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, BarChart3, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

const COOKIE_CONSENT_KEY = 'tostem-cookie-consent';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

function getStoredConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  // Check localStorage on mount
  useEffect(() => {
    const hasConsented = getStoredConsent();
    if (!hasConsented) {
      // Small delay so the page loads first
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = useCallback(() => {
    try {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({ essential: true, analytics: true, marketing: true, timestamp: Date.now() })
      );
    } catch { /* ignore */ }
    setVisible(false);
  }, []);

  const savePreferences = useCallback(() => {
    try {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({ ...preferences, timestamp: Date.now() })
      );
    } catch { /* ignore */ }
    setVisible(false);
    setPreferencesOpen(false);
  }, [preferences]);

  const cookieCategories = [
    {
      id: 'essential' as const,
      icon: Shield,
      title: 'Essential',
      description: 'Required for the website to function properly. These cannot be disabled.',
      alwaysOn: true,
    },
    {
      id: 'analytics' as const,
      icon: BarChart3,
      title: 'Analytics',
      description: 'Help us understand how visitors interact with our website so we can improve the experience.',
      alwaysOn: false,
    },
    {
      id: 'marketing' as const,
      icon: Megaphone,
      title: 'Marketing',
      description: 'Used to deliver relevant advertisements and track the effectiveness of our campaigns.',
      alwaysOn: false,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[45]"
          >
            <div className="bg-tostem-dark/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 sm:py-4">
              <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Cookie className="w-4 h-4 text-tostem-blue flex-shrink-0" />
                  <p className="text-xs text-white/70 leading-relaxed">
                    We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreferencesOpen(true)}
                    className="text-white/60 hover:text-white hover:bg-white/10 text-xs h-8"
                  >
                    Manage Preferences
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="bg-tostem-blue hover:bg-tostem-blue-light text-white text-xs h-8 px-4"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent className="sm:max-w-lg" showCloseButton>
          <DialogHeader>
            <DialogTitle className="text-tostem-dark">Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie settings. Essential cookies are always active as they are necessary for the website to function.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {cookieCategories.map((category) => {
              const Icon = category.icon;
              const isChecked = preferences[category.id];
              return (
                <div
                  key={category.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                    isChecked
                      ? 'border-tostem-blue/20 bg-tostem-blue/5'
                      : 'border-gray-200 bg-gray-50/50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isChecked ? 'bg-tostem-blue/10' : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-4 h-4 ${isChecked ? 'text-tostem-blue' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-medium text-tostem-dark">{category.title}</h4>
                      {category.alwaysOn ? (
                        <span className="text-[10px] font-medium text-tostem-blue bg-tostem-blue/10 px-2 py-0.5 rounded-full">
                          Always On
                        </span>
                      ) : (
                        <Switch
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({ ...prev, [category.id]: checked }))
                          }
                          className="data-[state=checked]:bg-tostem-blue"
                        />
                      )}
                    </div>
                    <p className="text-xs text-tostem-text-muted mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="border-tostem-dark/20 text-tostem-dark hover:bg-tostem-light-gray">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={savePreferences}
              className="bg-tostem-blue hover:bg-tostem-blue-light text-white"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
