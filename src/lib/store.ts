import { create } from 'zustand';

interface SiteState {
  // Navigation
  activeNav: string | null;
  setActiveNav: (nav: string | null) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // Active dropdown
  activeDropdown: string | null;
  setActiveDropdown: (dropdown: string | null) => void;

  // Modal state
  modalOpen: boolean;
  modalType: 'quotation' | 'brochure' | 'contact' | null;
  openModal: (type: 'quotation' | 'brochure' | 'contact') => void;
  closeModal: () => void;

  // Current section/page
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // Scrolled state
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  // Navigation
  activeNav: null,
  setActiveNav: (nav) => set({ activeNav: nav }),

  // Mobile menu
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  // Active dropdown
  activeDropdown: null,
  setActiveDropdown: (dropdown) => set({ activeDropdown: dropdown }),

  // Modal state
  modalOpen: false,
  modalType: null,
  openModal: (type) => set({ modalOpen: true, modalType: type }),
  closeModal: () => set({ modalOpen: false, modalType: null }),

  // Current section
  currentSection: 'home',
  setCurrentSection: (section) => set({ currentSection: section }),

  // Scrolled state
  isScrolled: false,
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
}));
