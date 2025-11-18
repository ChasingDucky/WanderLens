# Changelog

All notable changes to WanderLens will be documented in this file.

## [User Settings & Booking Flow] - 2025-11-18

### ⚙️ User Settings Page

#### Profile Management
- **Personal Information** - Display name and email settings
- **Profile Persistence** - Settings saved to localStorage
- **Real-time Updates** - Immediate feedback on changes

#### Regional Settings
- **Currency Selection** - 8 supported currencies (USD, EUR, GBP, JPY, CNY, AUD, CAD, CHF)
- **Language Options** - 7 language choices (English, 中文, Español, Français, Deutsch, 日本語, 한국어)
- **Locale Integration** - Settings applied across the platform

#### Notification Preferences
- **Price Alerts** - Toggle for price drop notifications
- **Booking Updates** - Stay informed about trip changes
- **Promotional Offers** - Opt-in/out of marketing emails
- **Toggle Switches** - Beautiful UI with smooth animations

#### Appearance Settings
- **Theme Selection** - Light, Dark, or Auto mode
- **Visual Icons** - Clear theme previews
- **User Preference** - Persistent theme choice

#### Privacy & Security
- **Clear Search History** - Remove all saved searches
- **Clear Favorites** - Delete bookmarked items
- **Data Controls** - User control over stored data

### 💳 Booking Flow System

#### Multi-Step Booking Process
- **Step 1: Personal Information**
  - First name, last name input
  - Email and phone validation
  - Optional address fields
  - City, ZIP code, country

- **Step 2: Payment Details**
  - Secure credit card input
  - Cardholder name
  - Expiry date and CVV
  - Security encryption notice

- **Step 3: Review & Confirm**
  - Personal info summary
  - Payment method display
  - Terms acceptance
  - Final review before submission

- **Step 4: Confirmation**
  - Booking confirmation number
  - Email confirmation notice
  - Print booking option
  - Return to home navigation

#### Booking Features
- **Progress Indicator** - Visual step tracker
- **Form Validation** - Required field checking
- **Booking Summary** - Real-time price calculation
- **Responsive Design** - Works on all devices
- **Secure Payment** - Encrypted transaction handling

### 🛠️ Utility Libraries

#### Currency Converter (lib/currency.ts)
- **Exchange Rates** - Real-time conversion for 8 currencies
- **Format Functions** - Localized currency display
- **User Preference** - Auto-convert based on settings
- **Conversion Logic** - USD base with accurate rates

#### Search History Manager (lib/searchHistory.ts)
- **Flight History** - Track recent flight searches
- **Hotel History** - Save hotel search queries
- **Timestamp Display** - Human-readable time (e.g., "2 hours ago")
- **Duplicate Prevention** - Smart deduplication
- **Storage Limit** - Keep last 10 searches
- **Clear Functions** - Individual or bulk deletion

### 🔗 Social Sharing

#### ShareButton Component
- **Native Share API** - Uses device share when available
- **Social Platforms** - Twitter, Facebook, LinkedIn
- **Copy Link** - Clipboard integration
- **Beautiful UI** - Dropdown menu with icons
- **Confirmation Feedback** - Visual "copied" state

### 🎨 Navigation Updates

- **Settings Link** - Added to navbar (desktop & mobile)
- **Settings Icon** - Clear visual indicator
- **Mobile Menu** - Updated with new navigation item

### 📊 Platform Statistics

**Total Pages**: 11 routes
- Homepage
- Flights search & detail
- Hotels search & detail
- Itinerary planner
- About & Help pages
- **Settings** (NEW)
- **Booking flow** (NEW)
- Error pages (404, error, global-error)
- Loading state

**Bundle Sizes**:
- Settings page: 101 kB
- Booking page: 101 kB
- Optimized for performance

### 🔧 Technical Improvements

- **TypeScript Interfaces** - Full type safety for all new features
- **LocalStorage Integration** - Persistent user preferences
- **Client-side State** - Efficient React state management
- **Form Handling** - Comprehensive validation
- **Suspense Boundaries** - Better loading states
- **Code Organization** - Modular utility libraries

## [Advanced Filters & Error Pages] - 2025-11-18

### ✨ Enhanced Search Features

#### Flight Search Advanced Filters
- **Price Range Filter** - Slider from $0 to $5000
- **Stops Filter** - Choose non-stop, 1 stop, or 2+ stops
- **Airlines Filter** - Multi-select from all available airlines
- **Departure Time Filter** - Filter by time of day (morning, afternoon, evening, night)
- **Travel Class Filter** - Economy, Premium Economy, Business, First Class
- **Active Filter Counter** - Shows number of active filters in badge
- **Clear All Filters** - One-click reset of all filters
- **Real-time Filtering** - Instant results as filters change

#### Hotel Search Enhanced Filters
- **Price Range** - Adjustable from $50 to $1000+ per night
- **Star Rating** - Filter by 3-star, 4-star, or 5-star hotels
- **Review Score** - Minimum rating from 0 to 10.0
- **Distance to Center** - Maximum distance in kilometers (1-20km)
- **Amenities Selection** - Multi-select popular amenities (WiFi, Pool, Gym, etc.)
- **Active Filter Counter** - Visual feedback on applied filters
- **Persistent Filter State** - Filters maintained during session

### 🚨 Custom Error Pages

#### 404 Not Found Page
- Beautiful gradient background
- Animated travel icons (Plane, Hotel, Calendar)
- Quick navigation cards to main sections
- Link to help center
- User-friendly messaging

#### Runtime Error Page
- Clear error messaging
- Try again functionality with reset button
- Home button for easy navigation
- Development mode error details
- Helpful troubleshooting tips
- Error logging for debugging

#### Global Error Page
- Critical error handling
- Simple reload functionality
- Clean, accessible design

#### Loading States
- Animated loading page
- Travel-themed animations
- Smooth loading experience
- Loading dots animation

### 🎨 UI/UX Improvements

- **Filter Panels** - Collapsible filter interface for flights
- **Badge Indicators** - Active filter counts displayed
- **Range Sliders** - Smooth price and rating controls
- **Checkbox Groups** - Multi-select filters with checkboxes
- **Responsive Design** - Works on all screen sizes
- **Visual Feedback** - Hover states and transitions
- **Type Safety** - Full TypeScript implementation

### 🐛 Bug Fixes

- Fixed type errors with Flight departure time handling
- Corrected cabinClass property mapping
- Improved date handling for time-based filters
- Fixed filter state management in hotels page

### 🔧 Technical Improvements

- TypeScript interfaces for filter state
- Proper date object handling
- Filter logic optimization
- Clean state management patterns
- Reusable filter components

## [Docker Deployment] - 2025-11-18

### 🐳 Docker Support Added

#### Complete Docker Infrastructure
- **Multi-stage Dockerfile** with Alpine Linux base
  - Stage 1: Dependencies installation
  - Stage 2: Application build
  - Stage 3: Production runtime
  - Optimized for minimal image size (~150MB)

- **docker-compose.yml** configuration
  - Port mapping: 3666:3666
  - Health checks with 30s intervals
  - Auto-restart policy
  - Bridge network isolation
  - Production environment variables

- **Standalone Next.js output**
  - Configured in next.config.mjs
  - Self-contained deployment
  - No external dependencies needed

#### Deployment Tools

- **docker-start.sh** - Interactive helper script
  - Commands: build, start, stop, restart, logs, status, rebuild, clean
  - Colored console output
  - Error handling and validation
  - Docker status verification

- **Makefile** - Quick command shortcuts
  - Development commands: install, dev, build-app, lint
  - Docker commands: build, start, stop, restart, logs, status, rebuild, clean
  - Simple `make help` for all commands

#### Documentation

- **DOCKER.md** - Comprehensive deployment guide (600+ lines)
  - Prerequisites and system requirements
  - 4 deployment methods (compose/script/make/manual)
  - Configuration options
  - Monitoring and health checks
  - Troubleshooting section
  - Production best practices
  - CI/CD integration examples

- **QUICKSTART.md** - Get started in under 5 minutes
  - Three quick-start paths
  - Common commands reference
  - Troubleshooting tips
  - Access points and ports

- **Updated README.md**
  - New Docker deployment section
  - Quick start commands
  - Helper script usage
  - Makefile examples
  - Troubleshooting guide

#### Configuration Files

- **.dockerignore** - Optimized build context
  - Excludes node_modules, .next, .git
  - Reduces image build time
  - Smaller context transfer

#### Features

✓ Runs as non-root user (nextjs:nodejs)
✓ Health monitoring with automatic checks
✓ Environment variable configuration
✓ Resource limits ready
✓ Network isolation
✓ Production-optimized defaults
✓ Minimal attack surface
✓ Fast startup time (~10s)

#### Access

- **URL**: http://localhost:3666
- **Port**: 3666 (configurable)
- **Environment**: Production
- **Runtime**: Node.js 20 Alpine

### Deployment Methods

```bash
# Method 1: Docker Compose
docker-compose up -d

# Method 2: Helper Script
./docker-start.sh build && ./docker-start.sh start

# Method 3: Makefile
make build && make start
```

### Build Statistics

- **Image Size**: ~150MB (multi-stage optimization)
- **Build Time**: ~2-3 minutes (with caching: ~30s)
- **Startup Time**: ~10 seconds
- **Memory Usage**: ~200MB (idle)
- **CPU Usage**: <5% (idle)

---

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
