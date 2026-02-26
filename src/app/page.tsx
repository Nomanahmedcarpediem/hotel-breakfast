'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// Product data from Hotel Breakfast
const products = [
  {
    id: 1,
    name: "The Crewneck Pullover",
    description: "Cotton-rich fabric sweatshirt with vintage wash and retro vibe. Your new Sunday morning essential.",
    price: 76,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/3262399543692142814_2048.jpg",
    tag: "Bestseller",
    category: "Apparel",
    hoverColor: "hover-color-navy",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#334FB4" },
      { name: "Cream", hex: "#FFF6E1" },
      { name: "Burgundy", hex: "#A42325" }
    ]
  },
  {
    id: 2,
    name: "The Pocket Tee",
    description: "Ring-spun cotton fabric unisex shirt with vintage aesthetic and pocket detail.",
    price: 42,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/1591691027165322782_2048.jpg",
    tag: "Essential",
    category: "Apparel",
    hoverColor: "hover-color-coral",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Sage", hex: "#7A9E7E" }
    ]
  },
  {
    id: 3,
    name: "Do Not Disturb Oversized Tee",
    description: "Men's Heavy Oversized Tee combining casual elegance with trendy oversized fit.",
    price: 64.99,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/8999220662666491318_2048.jpg",
    tag: "New Drop",
    category: "Apparel",
    hoverColor: "hover-color-burgundy",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#FFFFFF" }
    ]
  },
  {
    id: 4,
    name: "Breakfast & Travel Oversized Tee",
    description: "Reflecting individuality and comfort with laid-back aesthetic. Made for wanderers.",
    price: 64.99,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/14932325304822957776_2048.jpg",
    tag: "Limited",
    category: "Apparel",
    hoverColor: "hover-color-sage",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#FFF6E1" },
      { name: "Black", hex: "#1a1a1a" }
    ]
  },
  {
    id: 5,
    name: "The Everyday Tote",
    description: "100% organic cotton twill bag with 6-gallon capacity. OEKO-TEX certified for conscious living.",
    price: 42,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/13733165656261452820_2048.jpg",
    tag: "Sustainable",
    category: "Accessories",
    hoverColor: "hover-color-sage",
    sizes: ["One Size"],
    colors: [
      { name: "Natural", hex: "#F5E6C8" },
      { name: "Black", hex: "#1a1a1a" }
    ]
  },
  {
    id: 6,
    name: "The Organic Cap",
    description: "100% organic cotton baseball cap. Unstructured six-panel design for effortless style.",
    price: 35,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/1875496474666638470_2048.jpg",
    tag: "Organic",
    category: "Accessories",
    hoverColor: "hover-color-navy",
    sizes: ["One Size"],
    colors: [
      { name: "Navy", hex: "#334FB4" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Cream", hex: "#FFF6E1" }
    ]
  },
  {
    id: 7,
    name: "The Denim Dad Hat",
    description: "6-panel unstructured denim hat with pigment-dyed finish. Vintage vibes only.",
    price: 52,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/5580959199368031222_2048.jpg",
    tag: "Fan Favorite",
    category: "Accessories",
    hoverColor: "hover-color-coral",
    sizes: ["One Size"],
    colors: [
      { name: "Denim Blue", hex: "#6B8CAE" },
      { name: "Washed Black", hex: "#3a3a3a" }
    ]
  },
  {
    id: 8,
    name: "The Sun Hat",
    description: "Premium bucket hat for beach, festivals, and outdoor adventures. Sun protection with style.",
    price: 35,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/3163221279104308777_2048.jpg",
    tag: "Summer",
    category: "Accessories",
    hoverColor: "hover-color-burgundy",
    sizes: ["S/M", "L/XL"],
    colors: [
      { name: "Natural", hex: "#F5E6C8" },
      { name: "Black", hex: "#1a1a1a" }
    ]
  },
  {
    id: 9,
    name: "Terracotta Towel",
    description: "Personalized beach towel with polyester mink front and cotton back. 30\"×60\" of luxury.",
    price: 49,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/5885969260573620490_2048.jpg",
    tag: "Hot",
    category: "Beach",
    hoverColor: "hover-color-coral",
    sizes: ["30×60"],
    colors: [
      { name: "Terracotta", hex: "#E07A5F" }
    ]
  },
  {
    id: 10,
    name: "Turf Towel",
    description: "Vibrant colors, multifunctional for beach, gym, and pool use. Stand out everywhere.",
    price: 49,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/14707760509720742550_2048.jpg",
    tag: "Vibrant",
    category: "Beach",
    hoverColor: "hover-color-sage",
    sizes: ["30×60"],
    colors: [
      { name: "Green", hex: "#7A9E7E" }
    ]
  },
  {
    id: 11,
    name: "Sun Towel",
    description: "Mink-cotton blend offering ample space for drying off or relaxing on the sand.",
    price: 49,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/665358233442400327_2048.jpg",
    tag: "Luxe",
    category: "Beach",
    hoverColor: "hover-color-navy",
    sizes: ["30×60"],
    colors: [
      { name: "Sunrise", hex: "#FFB347" }
    ]
  },
  {
    id: 12,
    name: "The Lounge Towel",
    description: "Luxurious beach towel designed for poolside lounging with eye-catching aesthetics.",
    price: 49,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/568868594357841610_2048.jpg",
    tag: "Poolside",
    category: "Beach",
    hoverColor: "hover-color-burgundy",
    sizes: ["30×60"],
    colors: [
      { name: "Ocean Blue", hex: "#334FB4" }
    ]
  },
];

// Lifestyle Bundles
const bundles = [
  {
    id: 101,
    name: "Poolside Essentials",
    description: "Everything you need for the perfect pool day. Includes towel, hat, and tote.",
    items: [products[8], products[5], products[4]], // Terracotta Towel, Organic Cap, Everyday Tote
    originalPrice: 126,
    bundlePrice: 107,
    discount: 15,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/5885969260573620490_2048.jpg",
    tag: "SAVE 15%"
  },
  {
    id: 102,
    name: "Champagne Brunch Kit",
    description: "The complete morning look. Crewneck, cap, and tote for effortless weekend style.",
    items: [products[0], products[6], products[4]], // Crewneck, Denim Dad Hat, Tote
    originalPrice: 170,
    bundlePrice: 145,
    discount: 15,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/3262399543692142814_2048.jpg",
    tag: "BESTSELLER"
  },
  {
    id: 103,
    name: "Beach Bum Bundle",
    description: "Two premium towels and a sun hat. Ready for any beach adventure.",
    items: [products[8], products[10], products[7]], // Terracotta Towel, Sun Towel, Sun Hat
    originalPrice: 133,
    bundlePrice: 113,
    discount: 15,
    image: "https://cdn.shopify.com/s/files/1/0751/4456/0894/files/665358233442400327_2048.jpg",
    tag: "SUMMER FAVE"
  }
];

// Recently purchased notifications data
const recentPurchases = [
  { name: "Sarah", location: "Los Angeles, CA", product: "The Crewneck Pullover", time: "2 min ago" },
  { name: "Marcus", location: "Miami, FL", product: "Terracotta Towel", time: "5 min ago" },
  { name: "Emma", location: "Brooklyn, NY", product: "The Everyday Tote", time: "8 min ago" },
  { name: "Jake", location: "Austin, TX", product: "Do Not Disturb Tee", time: "12 min ago" },
  { name: "Olivia", location: "San Francisco, CA", product: "The Organic Cap", time: "15 min ago" },
  { name: "Liam", location: "Chicago, IL", product: "Beach Bum Bundle", time: "18 min ago" },
  { name: "Sophia", location: "Seattle, WA", product: "The Denim Dad Hat", time: "22 min ago" },
  { name: "Noah", location: "Denver, CO", product: "Poolside Essentials", time: "25 min ago" },
];

const featuredProducts = products.slice(0, 4);
const allCategories = ["All", "Apparel", "Accessories", "Beach"];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Los Angeles, CA",
    quote: "The quality is unmatched. I wear my crewneck every single weekend. It's become my signature look.",
    rating: 5,
    product: "The Crewneck Pullover",
    verified: true
  },
  {
    name: "Marcus T.",
    location: "Miami, FL",
    quote: "These towels are EVERYTHING. Took them to Tulum and got so many compliments. Already ordering more.",
    rating: 5,
    product: "Terracotta Towel",
    verified: true
  },
  {
    name: "Emma K.",
    location: "Brooklyn, NY",
    quote: "Finally a brand that gets it. Champagne IS a morning drink. The aesthetic, the quality, the vibe - chef's kiss.",
    rating: 5,
    product: "The Everyday Tote",
    verified: true
  },
  {
    name: "Jake R.",
    location: "Austin, TX",
    quote: "Got the oversized tee and cap. Haven't taken them off since. This is my new uniform.",
    rating: 5,
    product: "Do Not Disturb Tee",
    verified: true
  }
];

const pressLogos = [
  { name: "Vogue", display: "VOGUE" },
  { name: "GQ", display: "GQ" },
  { name: "Hypebeast", display: "HYPEBEAST" },
  { name: "Highsnobiety", display: "HIGHSNOBIETY" },
  { name: "Complex", display: "COMPLEX" },
];

// Type definitions
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  category: string;
  hoverColor: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleProducts, setVisibleProducts] = useState<Set<number>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Sticky Add to Cart state
  const [stickyProduct, setStickyProduct] = useState<Product | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Recent purchase notifications
  const [notification, setNotification] = useState<typeof recentPurchases[0] | null>(null);
  const [notificationVisible, setNotificationVisible] = useState(false);

  // Video loaded state
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const productId = Number(entry.target.getAttribute('data-product-id'));
          if (entry.isIntersecting) {
            setVisibleProducts(prev => new Set([...prev, productId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeCategory]);

  // Sticky bar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        const rect = shopSection.getBoundingClientRect();
        // Show sticky bar when scrolled past the shop section header
        if (rect.top < -200 && rect.bottom > 100) {
          setShowStickyBar(true);
          // Set to first visible product or first filtered product
          if (!stickyProduct) {
            const filtered = activeCategory === 'All'
              ? products
              : products.filter(p => p.category === activeCategory);
            setStickyProduct(filtered[0]);
          }
        } else {
          setShowStickyBar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory, stickyProduct]);

  // Recent purchase notifications
  useEffect(() => {
    let purchaseIndex = 0;

    const showNotification = () => {
      setNotification(recentPurchases[purchaseIndex]);
      setNotificationVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setNotificationVisible(false);
      }, 4000);

      purchaseIndex = (purchaseIndex + 1) % recentPurchases.length;
    };

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(showNotification, 5000);

    // Then show every 15-25 seconds randomly
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 10000 + 15000;
      setTimeout(showNotification, randomDelay);
    }, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const addToCart = useCallback((product?: Product, size?: string, color?: string) => {
    setCartCount(prev => prev + 1);
    // Close quick view if open
    if (quickViewProduct) {
      setQuickViewProduct(null);
    }
  }, [quickViewProduct]);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]?.name || '');
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    setSelectedSize('');
    setSelectedColor('');
  };

  const setProductRef = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) {
      productRefs.current.set(id, el);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF6E1] grain-overlay">
      {/* Animated cursor follower */}
      <div
        className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-[#334FB4] to-[#E85D4C] opacity-30 pointer-events-none z-[100] mix-blend-multiply hidden lg:block transition-transform duration-100"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: 'scale(1)'
        }}
      />

      {/* Recent Purchase Notification Toast */}
      <div
        className={`fixed bottom-24 left-4 z-[90] transition-all duration-500 ${
          notificationVisible
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        }`}
      >
        {notification && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs border-2 border-[#7A9E7E]/20 animate-bounce-in">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#7A9E7E]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🛒</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1a1a1a]">
                  {notification.name} from {notification.location}
                </p>
                <p className="text-xs text-[#1a1a1a]/60 mt-0.5">
                  just purchased <span className="font-semibold text-[#334FB4]">{notification.product}</span>
                </p>
                <p className="text-[10px] text-[#1a1a1a]/40 mt-1">{notification.time}</p>
              </div>
              <button
                onClick={() => setNotificationVisible(false)}
                className="text-[#1a1a1a]/30 hover:text-[#1a1a1a] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#7A9E7E]/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#7A9E7E] rounded-full animate-[shrink_4s_linear_forwards]" />
              </div>
              <span className="text-[10px] text-[#7A9E7E] font-bold">✓ Verified</span>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[80] transition-all duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-lg border-t border-black/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {stickyProduct && (
              <>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={stickyProduct.image}
                      alt={stickyProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1a1a1a] truncate">{stickyProduct.name}</p>
                    <p className="text-[#334FB4] font-black">${stickyProduct.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openQuickView(stickyProduct)}
                    className="hidden sm:flex px-4 py-2 text-sm font-semibold text-[#334FB4] hover:bg-[#334FB4]/10 rounded-full transition-colors"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={() => addToCart(stickyProduct)}
                    className="px-6 py-3 bg-gradient-to-r from-[#334FB4] to-[#4A6BD4] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="hidden sm:inline">Add to Cart</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={closeQuickView}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-[#A42325] hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-[#f8f8f8] to-[#f0f0f0]">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                    quickViewProduct.tag === 'New Drop' || quickViewProduct.tag === 'Limited' ? 'bg-gradient-to-r from-[#A42325] to-[#E85D4C]' :
                    quickViewProduct.tag === 'Sustainable' || quickViewProduct.tag === 'Organic' ? 'bg-gradient-to-r from-[#5A7E5E] to-[#7A9E7E]' :
                    'bg-gradient-to-r from-[#334FB4] to-[#4A6BD4]'
                  }`}>
                    {quickViewProduct.tag}
                  </span>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-8 flex flex-col">
                <p className="text-xs text-[#334FB4] font-bold uppercase tracking-wider mb-2">
                  {quickViewProduct.category}
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-2">
                  {quickViewProduct.name}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-black text-[#1a1a1a]">${quickViewProduct.price}</span>
                  <div className="flex items-center gap-1 text-[#E85D4C]">
                    <span className="text-sm">★★★★★</span>
                    <span className="text-xs text-[#1a1a1a]/50">(124 reviews)</span>
                  </div>
                </div>
                <p className="text-[#1a1a1a]/60 mb-6 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Color Selection */}
                {quickViewProduct.colors.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-bold text-[#1a1a1a] mb-3">
                      Color: <span className="font-normal text-[#1a1a1a]/60">{selectedColor}</span>
                    </p>
                    <div className="flex gap-3">
                      {quickViewProduct.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                            selectedColor === color.name
                              ? 'border-[#334FB4] ring-2 ring-[#334FB4]/30 scale-110'
                              : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-[#1a1a1a] mb-3">
                    Size: <span className="font-normal text-[#1a1a1a]/60">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          selectedSize === size
                            ? 'bg-[#334FB4] text-white'
                            : 'bg-[#FFF6E1] text-[#1a1a1a] hover:bg-[#334FB4]/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(quickViewProduct, selectedSize, selectedColor)}
                  className="mt-auto w-full py-4 bg-gradient-to-r from-[#334FB4] to-[#4A6BD4] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart — ${quickViewProduct.price}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 mt-6 text-xs text-[#1a1a1a]/50">
                  <span className="flex items-center gap-1">🚚 Free Shipping</span>
                  <span className="flex items-center gap-1">↩️ Easy Returns</span>
                  <span className="flex items-center gap-1">✓ In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#334FB4] via-[#4A6BD4] to-[#334FB4] text-white text-center py-3 px-4 text-sm font-medium animate-gradient bg-[length:200%_100%] relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer"></div>
        <span className="relative z-10">
          <span className="hidden sm:inline">✨ FREE SHIPPING ON ORDERS $75+ ✨</span>
          <span className="sm:hidden">✨ FREE SHIPPING $75+ ✨</span>
          <span className="mx-3">•</span>
          <span className="underline cursor-pointer hover:no-underline font-bold">Shop Now</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 glass-effect border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-12 h-12 hover-scale">
                <Image
                  src="/logo.png"
                  alt="Hotel Breakfast"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#1a1a1a] leading-none group-hover:text-[#334FB4] transition-colors">HOTEL BREAKFAST</span>
                <span className="text-[10px] tracking-[0.15em] text-[#334FB4] font-semibold hidden sm:block animate-color-cycle">BECAUSE CHAMPAGNE IS A MORNING DRINK</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {['Shop All', 'Bundles', 'Bestsellers', 'Our Story'].map((item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="text-[#1a1a1a] hover:text-[#334FB4] transition-all font-semibold hover-underline-animated relative"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#334FB4]/10 transition-all hover-scale">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#334FB4]/10 transition-all hover-scale group">
                <svg className="w-5 h-5 group-hover:animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A42325] text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-in">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#334FB4]/10 transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-black/10 pt-4 animate-slide-up">
              <div className="flex flex-col gap-4">
                {['Shop All', 'Bundles', 'Bestsellers', 'Our Story'].map((item, i) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-[#1a1a1a] font-semibold text-lg hover:text-[#334FB4] transition-colors animate-slide-in-left"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            poster="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920"
          >
            <source src="https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#334FB4]/90 via-[#334FB4]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF6E1] via-transparent to-transparent" />
        </div>

        {/* Animated background blobs (fallback/accent) */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#334FB4] blob-bg animate-blob opacity-30" />
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-[#A42325] blob-bg animate-morph stagger-3 opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full mb-8 animate-bounce-in border border-white/30">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="text-white text-sm font-semibold">New Summer Collection</span>
                <span className="text-xl animate-wiggle">☀️</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.95] mb-6">
                <span className="block animate-slide-in-left">Because</span>
                <span className="block animate-slide-in-left stagger-1">Champagne is a</span>
                <span className="block text-[#FFF6E1] animate-slide-in-left stagger-2 animate-text-glow">Morning Drink.</span>
              </h1>

              <p className="text-white/80 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in stagger-3">
                Lifestyle essentials for those who believe every morning should feel like vacation.
                <span className="font-bold text-white"> Premium quality. Effortless style. Zero compromises.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-4">
                <a href="#shop" className="group btn-primary px-8 py-4 bg-white text-[#334FB4] font-bold rounded-full shadow-2xl flex items-center justify-center gap-3 hover:gap-4 transition-all">
                  <span>Shop the Collection</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#bundles" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#334FB4] transition-all flex items-center justify-center hover-glow">
                  Shop Bundles
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 text-white/80 text-sm animate-fade-in stagger-5">
                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <span className="text-lg">🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <span className="text-lg animate-float">🚚</span>
                  <span>Free Shipping $75+</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <span className="text-lg animate-pulse-scale">⭐</span>
                  <span>4.9/5 (2k+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Hero Image Grid */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div
                    className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white/10 relative group animate-float cursor-pointer"
                    onClick={() => openQuickView(products[0])}
                  >
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/3262399543692142814_2048.jpg"
                      alt="The Crewneck Pullover"
                      fill
                      className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-[#334FB4] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      Quick View
                    </div>
                  </div>
                  <div
                    className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white/10 relative group animate-float-reverse cursor-pointer"
                    onClick={() => openQuickView(products[5])}
                  >
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/1875496474666638470_2048.jpg"
                      alt="The Organic Cap"
                      fill
                      className="object-cover group-hover:scale-110 group-hover:-rotate-2 transition-all duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div
                    className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white/10 relative group animate-float stagger-2 cursor-pointer"
                    onClick={() => openQuickView(products[8])}
                  >
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/5885969260573620490_2048.jpg"
                      alt="Terracotta Towel"
                      fill
                      className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div
                    className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white/10 relative group animate-float-reverse stagger-3 cursor-pointer"
                    onClick={() => openQuickView(products[2])}
                  >
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/8999220662666491318_2048.jpg"
                      alt="Do Not Disturb Tee"
                      fill
                      className="object-cover group-hover:scale-110 group-hover:-rotate-2 transition-all duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-[#A42325] text-white px-4 py-1.5 rounded-full text-xs font-bold animate-pulse-scale">
                      NEW
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 text-5xl animate-float">🥂</div>
              <div className="absolute -bottom-4 -right-4 text-4xl animate-float-reverse">✨</div>
              <div className="absolute top-1/2 -right-8 text-3xl animate-wiggle">☀️</div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFF6E1"/>
          </svg>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <section className="py-4 bg-[#1a1a1a] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              {['CHAMPAGNE MORNINGS', 'PREMIUM QUALITY', 'FREE SHIPPING', 'SUSTAINABLE', 'HOTEL VIBES'].map((text, j) => (
                <span key={j} className="text-white/80 text-sm font-bold tracking-widest flex items-center gap-4">
                  {text}
                  <span className="text-[#E85D4C] text-lg">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* As Seen In */}
      <section className="py-16 px-4 sm:px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#1a1a1a]/40 text-sm font-medium tracking-widest uppercase mb-10">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {pressLogos.map((logo, i) => (
              <span
                key={i}
                className="text-2xl sm:text-3xl font-black text-[#1a1a1a]/15 hover:text-[#334FB4] transition-all duration-500 tracking-tight cursor-default hover:scale-110 hover-glow"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {logo.display}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Shop the Look - Bundles Section */}
      <section id="bundles" className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#FFF6E1] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-gradient-to-r from-[#7A9E7E] to-[#5A7E5E] text-white text-xs font-bold rounded-full mb-4 tracking-wide animate-pulse-scale">
              🎁 SAVE 15%
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
              Shop the <span className="gradient-text">Look</span>
            </h2>
            <p className="text-[#1a1a1a]/60 max-w-2xl mx-auto text-lg">
              Curated bundles designed to go together. Save 15% when you shop the complete look.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bundles.map((bundle, index) => (
              <div
                key={bundle.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[#7A9E7E] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Bundle Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-[#7A9E7E] text-white text-xs font-bold rounded-full shadow-lg">
                      {bundle.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white mb-1">{bundle.name}</h3>
                    <p className="text-white/80 text-sm">{bundle.items.length} items included</p>
                  </div>
                </div>

                {/* Bundle Details */}
                <div className="p-6">
                  <p className="text-[#1a1a1a]/60 text-sm mb-4">{bundle.description}</p>

                  {/* Included Items */}
                  <div className="flex items-center gap-2 mb-4">
                    {bundle.items.map((item, i) => (
                      <div key={i} className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-md -ml-2 first:ml-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <span className="text-xs text-[#1a1a1a]/50 ml-2">
                      {bundle.items.map(i => i.name.split(' ')[1]).join(' + ')}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-[#7A9E7E]">${bundle.bundlePrice}</span>
                      <span className="text-lg text-[#1a1a1a]/30 line-through">${bundle.originalPrice}</span>
                    </div>
                    <span className="text-xs font-bold text-[#7A9E7E] bg-[#7A9E7E]/10 px-3 py-1 rounded-full">
                      Save ${bundle.originalPrice - bundle.bundlePrice}
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => {
                      setCartCount(prev => prev + bundle.items.length);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#7A9E7E] to-[#5A7E5E] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Bundle to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section id="bestsellers" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <span className="inline-block px-5 py-2 bg-gradient-to-r from-[#A42325] to-[#E85D4C] text-white text-xs font-bold rounded-full mb-4 tracking-wide animate-pulse-scale">
                🔥 FAN FAVORITES
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a]">
                <span className="gradient-text">Bestsellers</span>
              </h2>
            </div>
            <a href="#shop" className="text-[#334FB4] font-bold hover:text-[#A42325] transition-colors flex items-center gap-2 group text-lg">
              View All
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => setProductRef(product.id, el)}
                data-product-id={product.id}
                onClick={() => openQuickView(product)}
                className={`group product-card bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer border-2 border-transparent hover:border-[#334FB4] transition-all duration-700 ${
                  visibleProducts.has(product.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#f8f8f8] to-[#f0f0f0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover product-image transition-all duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`product-tag px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                      product.tag === 'New Drop' || product.tag === 'Limited' ? 'bg-gradient-to-r from-[#A42325] to-[#E85D4C]' :
                      product.tag === 'Sustainable' || product.tag === 'Organic' ? 'bg-gradient-to-r from-[#5A7E5E] to-[#7A9E7E]' :
                      'bg-gradient-to-r from-[#334FB4] to-[#4A6BD4]'
                    }`}>
                      {product.tag}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className={`absolute bottom-4 right-4 w-14 h-14 ${product.hoverColor} bg-[#1a1a1a] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl hover:scale-110`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-[#334FB4] font-bold uppercase tracking-wider mb-2">{product.category}</p>
                  <h3 className="font-bold text-base sm:text-lg text-[#1a1a1a] mb-2 group-hover:text-[#334FB4] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#1a1a1a]/50 text-sm mb-4 line-clamp-2 hidden sm:block">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1a1a1a] font-black text-xl">${product.price}</span>
                    <div className="flex items-center gap-1 text-[#E85D4C]">
                      <span className="text-sm">★★★★★</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Banner */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              { icon: "🌿", title: "Sustainable", desc: "Organic & eco-friendly materials", color: "#7A9E7E" },
              { icon: "✨", title: "Premium Quality", desc: "Built to last, made to impress", color: "#334FB4" },
              { icon: "🚚", title: "Free Shipping", desc: "On all orders over $75", color: "#E85D4C" },
              { icon: "💯", title: "Satisfaction", desc: "30-day money-back guarantee", color: "#A42325" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center group cursor-default animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-4xl sm:text-5xl mb-4 block group-hover:animate-wiggle transition-transform">{item.icon}</span>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#E85D4C] transition-colors">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
                <div
                  className="w-12 h-1 mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Collection */}
      <section id="shop" className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-[#334FB4]/10 text-[#334FB4] text-xs font-bold rounded-full mb-4 tracking-wide">
              THE COLLECTION
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
              Shop All <span className="gradient-text">Products</span>
            </h2>
            <p className="text-[#1a1a1a]/60 max-w-2xl mx-auto text-lg">
              Curated essentials for the modern lifestyle. Every piece designed to make your mornings feel extraordinary.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
            {allCategories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 sm:px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#334FB4] to-[#4A6BD4] text-white shadow-lg shadow-[#334FB4]/30 scale-105'
                    : 'bg-[#FFF6E1] text-[#1a1a1a] hover:bg-[#334FB4] hover:text-white hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => setProductRef(product.id + 100, el)}
                data-product-id={product.id + 100}
                onClick={() => {
                  openQuickView(product);
                  setStickyProduct(product);
                }}
                className={`group product-card bg-[#FFF6E1] rounded-3xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#334FB4] transition-all duration-700 ${
                  visibleProducts.has(product.id + 100)
                    ? 'opacity-100 translate-y-0 rotate-0'
                    : 'opacity-0 translate-y-16 rotate-2'
                }`}
                style={{ transitionDelay: `${(index % 4) * 100}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover product-image transition-all duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`product-tag px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white ${
                      product.tag === 'New Drop' || product.tag === 'Limited' ? 'bg-gradient-to-r from-[#A42325] to-[#E85D4C]' :
                      product.tag === 'Sustainable' || product.tag === 'Organic' ? 'bg-gradient-to-r from-[#5A7E5E] to-[#7A9E7E]' :
                      'bg-gradient-to-r from-[#334FB4] to-[#4A6BD4]'
                    }`}>
                      {product.tag}
                    </span>
                  </div>
                  {/* Quick View overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl">
                      Quick View
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className={`absolute bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 ${product.hoverColor} bg-white text-[#1a1a1a] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl`}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <div className="p-5 sm:p-6 bg-white">
                  <p className="text-[10px] sm:text-xs text-[#334FB4] font-bold uppercase tracking-wider mb-2">{product.category}</p>
                  <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-3 group-hover:text-[#334FB4] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1a1a1a] font-black text-lg sm:text-xl">${product.price}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="text-xs sm:text-sm font-bold text-[#334FB4] hover:text-[#A42325] transition-colors"
                    >
                      Add to Cart →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Story Section */}
      <section id="ourstory" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFF6E1] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#334FB4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E85D4C]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block px-5 py-2 bg-gradient-to-r from-[#E85D4C] to-[#A42325] text-white text-xs font-bold rounded-full mb-6 tracking-wide">
                OUR STORY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-8 leading-tight">
                We Started With<br />
                <span className="gradient-text">a Simple Belief</span>
              </h2>
              <div className="space-y-6 text-[#1a1a1a]/70 text-lg leading-relaxed">
                <p>
                  <strong className="text-[#1a1a1a]">Every morning should feel like you&apos;re on vacation.</strong> That moment when you wake up in a beautiful hotel, sun streaming through the windows, nothing on the agenda but relaxation.
                </p>
                <p>
                  We created Hotel Breakfast for the dreamers, the travelers, the people who believe that champagne IS a morning drink. Our pieces are designed to bring that indulgent hotel morning experience into your everyday life.
                </p>
                <p className="text-[#334FB4] font-semibold">
                  Premium materials. Thoughtful design. Effortless style. Because you deserve to feel like a VIP every single day.
                </p>
              </div>
              <div className="flex flex-wrap gap-10 mt-10">
                {[
                  { value: "15K+", label: "Happy Customers", color: "#334FB4" },
                  { value: "4.9★", label: "Average Rating", color: "#E85D4C" },
                  { value: "50+", label: "Countries", color: "#7A9E7E" },
                ].map((stat, i) => (
                  <div key={i} className="group cursor-default">
                    <p className="text-4xl sm:text-5xl font-black transition-colors group-hover:scale-110 transition-transform" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[#1a1a1a]/50 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative group animate-float">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/13733165656261452820_2048.jpg"
                    alt="The Everyday Tote"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl mt-12 relative group animate-float-reverse">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0751/4456/0894/files/568868594357841610_2048.jpg"
                    alt="The Lounge Towel"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 gradient-border bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-[250px] sm:max-w-xs">
                <p className="text-[#1a1a1a] font-bold text-lg">&quot;The quality is insane&quot;</p>
                <p className="text-[#1a1a1a]/50 text-sm mt-2">— Sarah M., Los Angeles</p>
                <div className="flex gap-1 mt-2 text-[#E85D4C]">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 bg-[#7A9E7E]/20 text-[#5A7E5E] text-xs font-bold rounded-full mb-4 tracking-wide">
              💬 REVIEWS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
              What People Are <span className="gradient-text">Saying</span>
            </h2>
            <div className="flex items-center justify-center gap-3 text-xl">
              <span className="text-[#E85D4C] text-2xl animate-pulse-scale">★★★★★</span>
              <span className="font-black text-2xl">4.9</span>
              <span className="text-[#1a1a1a]/50">from 2,000+ reviews</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {testimonials.map((review, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-[#FFF6E1] to-white rounded-3xl p-6 sm:p-8 hover-lift border-2 border-transparent hover:border-[#334FB4] transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-1 text-[#E85D4C] mb-4 group-hover:animate-wiggle">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-[#1a1a1a] font-medium mb-6 text-base leading-relaxed">
                  &quot;{review.quote}&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#1a1a1a]">{review.name}</p>
                    <p className="text-[#1a1a1a]/50 text-sm">{review.location}</p>
                  </div>
                  {review.verified && (
                    <span className="text-[10px] bg-[#7A9E7E]/20 text-[#5A7E5E] px-3 py-1.5 rounded-full font-bold">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-[#334FB4] text-sm font-bold mt-4">{review.product}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram / UGC Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFF6E1]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-[#334FB4] to-[#4A6BD4] text-white text-xs font-bold rounded-full mb-4 tracking-wide">
            @HOTELBREAKFAST
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a1a1a] mb-6">
            Join the <span className="gradient-text">Community</span>
          </h2>
          <p className="text-[#1a1a1a]/60 mb-12 max-w-xl mx-auto text-lg">
            Tag us in your morning moments. We love seeing how you rock Hotel Breakfast.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {products.slice(0, 6).map((product, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer hover-scale animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => openQuickView(product)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-125 group-hover:rotate-6 transition-all duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#334FB4]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white text-4xl transform scale-0 group-hover:scale-100 transition-transform duration-500">♥</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#334FB4] via-[#4A6BD4] to-[#334FB4] animate-gradient bg-[length:200%_200%] relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-20">🥂</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-float-reverse opacity-20">✨</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-wiggle opacity-20">☀️</div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-7xl sm:text-8xl mb-8 animate-float">🥂</div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white animate-text-glow">
            Join the Morning Club
          </h2>
          <p className="text-white/80 mb-10 text-lg sm:text-xl">
            Get <span className="font-bold text-white">15% off</span> your first order + exclusive access to new drops, sales, and morning inspiration.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-white/10 border-2 border-white/30 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all text-lg"
            />
            <button
              type="submit"
              className="btn-primary px-8 py-4 bg-white text-[#334FB4] font-bold rounded-full shadow-xl text-lg whitespace-nowrap"
            >
              Get 15% Off ✨
            </button>
          </form>
          <p className="text-white/50 text-sm mt-6">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 sm:py-20 px-4 sm:px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.png"
                    alt="Hotel Breakfast"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-black tracking-tight text-white">HOTEL BREAKFAST</span>
              </div>
              <p className="text-white/50 text-sm mb-6">
                Because Champagne is a Morning Drink.™
              </p>
              <div className="flex gap-4">
                {['instagram', 'tiktok', 'twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-[#334FB4] hover:text-white transition-all hover:scale-110"
                  >
                    {social === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><circle cx="12" cy="12" r="3.5"/></svg>}
                    {social === 'tiktok' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>}
                    {social === 'twitter' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Shop', links: ['All Products', 'Bundles', 'Apparel', 'Accessories', 'Beach'] },
              { title: 'Help', links: ['FAQ', 'Shipping', 'Returns', 'Contact Us', 'Size Guide'] },
              { title: 'Company', links: ['Our Story', 'Sustainability', 'Press', 'Careers', 'Privacy'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-6 text-white">{col.title}</h4>
                <ul className="space-y-3 text-white/50 text-sm">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-white/10 gap-6">
            <p className="text-white/30 text-sm text-center sm:text-left">
              © 2024 Hotel Breakfast. All rights reserved. Because Champagne is a Morning Drink.™
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/30 text-xs">We accept:</span>
              <div className="flex gap-2">
                {['Visa', 'MC', 'Amex', 'PayPal'].map((card) => (
                  <span key={card} className="bg-white/10 text-white/60 px-3 py-1.5 rounded text-xs font-medium hover:bg-white/20 transition-colors cursor-default">
                    {card}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
