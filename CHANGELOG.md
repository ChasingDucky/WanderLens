# Changelog

All notable changes to WanderLens will be documented in this file.

## [Enhanced MVP] - 2025-11-18

### 🎉 Major Features Added

#### Flight Detail Page
- **Dynamic route**: `/flights/[id]` for detailed flight information
- Complete flight breakdown with route visualization
- Onboard amenities display with availability status
- Baggage policy information
- Price breakdown (base fare + taxes)
- Environmental impact with carbon offset options
- "Why Book This Flight?" recommendations
- Full responsive design

#### Favorites System
- Heart icon on flight cards for quick favoriting
- LocalStorage persistence (no backend required)
- Real-time favorite status updates
- Utility functions for managing favorites
- Support for both flights and hotels

#### About Page (`/about`)
- Company mission and vision
- Core values with icons
- Team introduction
- Platform statistics
- Responsive grid layouts

#### Help Page (`/help`)
- Getting started guide (4 steps)
- 8 comprehensive FAQs
- Quick action links
- Contact support section
- Expandable FAQ sections

#### Comparison Modal
- Side-by-side comparison of multiple flights/hotels
- Detailed attribute comparison
- Responsive grid layout
- Modal overlay with close functionality

#### Loading States
- FlightCardSkeleton component
- HotelCardSkeleton component
- DestinationCardSkeleton component
- Smooth animated pulse effect

### 🔧 Improvements

#### Performance
- Replaced `<img>` tags with Next.js `<Image>` components
- Optimized image loading with fill prop
- Proper image optimization configuration

#### Navigation
- Added About and Help links to navbar
- Visual divider between main nav and info pages
- Updated mobile menu with all pages
- Icon support for all nav items

#### User Experience
- Click-to-navigate on flight cards
- Favorite indicator with visual feedback
- Better button labeling ("View Details" instead of "Select Flight")
- Improved hover states and transitions

### 📊 Data Expansion

#### Flights (4 new added, total: 8)
- Singapore Airlines SQ12 (LAX → SIN)
- British Airways BA283 (JFK → LHR)
- Lufthansa LH400 (JFK → FRA)
- Qatar Airways QR701 (LAX → DOH)

#### Hotels (4 new added, total: 8)
- Marina Bay Sands, Singapore
- The Ritz-Carlton New York
- Burj Al Arab, Dubai
- W Barcelona, Spain

#### Destinations (3 new added, total: 9)
- Singapore - Modern city-state
- London - Historic capital
- Iceland - Land of fire and ice

### 🏗️ Technical Changes

#### New Files Created
- `app/about/page.tsx` - About page
- `app/help/page.tsx` - Help center
- `app/flights/[id]/page.tsx` - Flight detail page
- `components/Skeleton.tsx` - Loading skeletons
- `components/ComparisonModal.tsx` - Comparison feature
- `lib/favorites.ts` - Favorites management
- `CHANGELOG.md` - This file

#### Modified Files
- `components/FlightCard.tsx` - Added favorites and navigation
- `components/HotelCard.tsx` - Optimized images
- `components/DestinationCard.tsx` - Optimized images
- `components/Navbar.tsx` - Added new links
- `lib/mockData.ts` - Extended data

### ✅ Testing
- All pages build successfully
- No TypeScript errors
- No ESLint errors
- Responsive design verified
- Build size optimized

### 📈 Metrics

#### Build Output
```
Route (app)                              Size     First Load JS
┌ ○ /                                    2.06 kB         105 kB
├ ○ /about                               906 B          98.2 kB
├ ƒ /flights/[id]                        3.13 kB         103 kB
├ ○ /help                                906 B          98.2 kB
├ ○ /flights                             105 kB          205 kB
├ ○ /hotels                              3.22 kB         109 kB
└ ○ /itinerary                           4.17 kB         101 kB
```

#### Code Statistics
- Total files: 36+
- Total lines of code: ~3,500+
- Components: 11
- Pages: 7
- Mock data entries: 25 (8 flights, 8 hotels, 9 destinations)

## [Initial MVP] - 2025-11-18

### 🚀 Initial Release

#### Core Features
- Homepage with search interface
- Flight search and comparison
- Hotel search with filtering
- Itinerary planner
- Price trend visualization
- Responsive design
- Mock data implementation

#### Tech Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons
- date-fns

---

## Future Roadmap

### Phase 2 (Pending)
- [ ] Advanced date picker component
- [ ] Filter persistence with URL params
- [ ] Smooth animations and transitions
- [ ] Hotel detail pages
- [ ] User authentication
- [ ] Real API integrations

### Phase 3 (Planned)
- [ ] Machine learning price predictions
- [ ] Real-time price alerts
- [ ] Multi-language support
- [ ] Currency converter
- [ ] Social sharing features
- [ ] Collaborative trip planning

### Phase 4 (Future)
- [ ] Train and bus bookings
- [ ] Car rental integration
- [ ] Travel insurance
- [ ] Visa information
- [ ] AI chat assistant
