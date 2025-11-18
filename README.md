# WanderLens 🌍✈️

> Your intelligent travel companion for seamless journey planning

WanderLens is a comprehensive, AI-powered travel planning platform that helps you discover, plan, and book your perfect trip. Built with modern web technologies, it offers smart recommendations, price predictions, and personalized itineraries.

![WanderLens](https://images.unsplash.com/photo-1436491865332-7a61a109cc05)

## ✨ Features

### Core Functionality

- **🔍 Smart Flight Search**
  - Multi-city and flexible date search
  - Real-time price comparison
  - On-time performance ratings
  - Carbon emission tracking
  - Cabin class filtering

- **🏨 Hotel Discovery**
  - Intelligent recommendations based on flight plans
  - Advanced filtering (price, stars, amenities, distance)
  - Comprehensive review scores
  - Location-based search

- **📅 Itinerary Planning**
  - Visual timeline builder
  - Drag-and-drop organization
  - Cost tracking and budgeting
  - Collaborative trip planning
  - Export to PDF/Calendar

- **📊 Price Intelligence**
  - Historical price trends
  - 30-day price predictions
  - "Best time to book" recommendations
  - Price alerts and notifications

- **🌱 Sustainability Focus**
  - Carbon footprint calculations
  - Eco-friendly travel options
  - Environmental impact scoring
  - Green travel tips

- **🤖 AI-Powered Recommendations**
  - Personalized destination suggestions
  - Optimized itinerary planning
  - Smart booking timing advice
  - Weather-aware planning

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/wanderlens.git
cd wanderlens
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
wanderlens/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── flights/             # Flight search pages
│   ├── hotels/              # Hotel search pages
│   ├── itinerary/           # Itinerary planner
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── SearchForm.tsx
│   ├── FlightCard.tsx
│   ├── HotelCard.tsx
│   ├── DestinationCard.tsx
│   └── PriceTrendChart.tsx
├── lib/                     # Utilities and helpers
│   ├── mockData.ts         # Mock data for demo
│   └── utils.ts            # Utility functions
├── types/                   # TypeScript type definitions
│   └── index.ts
└── public/                  # Static assets
```

## 🎯 Current Status: MVP (Phase 1)

This is the **MVP version** of WanderLens. The following features are implemented with mock data:

✅ Modern, responsive UI/UX
✅ Flight search and comparison
✅ Hotel search with advanced filters
✅ Interactive itinerary planner
✅ Price trend visualization
✅ Mobile-friendly design

## 🔮 Roadmap

### Phase 2 - Enhanced Functionality
- [ ] User authentication and accounts
- [ ] Real API integrations (Amadeus, Skyscanner)
- [ ] Social sharing and collaboration
- [ ] Advanced search filters
- [ ] Multi-language support

### Phase 3 - Intelligence Layer
- [ ] Machine learning price predictions
- [ ] Personalized recommendations
- [ ] Real-time price alerts
- [ ] AI itinerary optimization
- [ ] Chat-based travel assistant

### Phase 4 - Extended Services
- [ ] Train and bus bookings
- [ ] Car rental integration
- [ ] Travel insurance options
- [ ] Visa information
- [ ] Currency converter
- [ ] Travel guides and tips

## 🎨 Design Philosophy

- **User-Centric**: Clean, intuitive interface that puts users first
- **Performance**: Fast page loads and smooth interactions
- **Accessibility**: WCAG compliant, keyboard navigable
- **Responsive**: Seamless experience across all devices
- **Modern**: Latest web technologies and best practices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Google Flights and Skyscanner
- Images from [Unsplash](https://unsplash.com)
- Icons by [Lucide](https://lucide.dev)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and TypeScript**
