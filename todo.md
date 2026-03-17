# Smart Energy Monitoring Dashboard - Development Plan

## Design Guidelines

### Design References
- Modern SaaS dashboards (Linear, Vercel, Stripe)
- Clean energy monitoring UIs

### Color Palette
- Background: #FFFFFF (white)
- Primary Text: #0F172A (near black)
- Secondary Text: #64748B (slate gray)
- Accent Gradient: from #6366F1 (indigo) to #8B5CF6 (purple) to #3B82F6 (blue)
- Card Background: #FFFFFF with soft shadow
- Sidebar: #F8FAFC (light gray)
- Success: #10B981 (green)
- Warning: #F59E0B (amber)
- Danger: #EF4444 (red)

### Typography
- Headings: Inter, font-weight 700
- Body: Inter, font-weight 400
- Numbers/Stats: Inter, font-weight 700, larger size

### Key Component Styles
- Cards: white bg, rounded-xl, shadow-md, hover:shadow-lg transition
- Buttons: gradient bg (indigo→purple), white text, rounded-lg, hover glow
- Sidebar: light bg, active item has gradient accent
- Charts: blue/purple/indigo color scheme

### Images to Generate
1. **hero-energy-dashboard.jpg** - Abstract energy visualization with glowing blue/purple circuits and data streams (Style: 3d, dark mood with neon accents)
2. **energy-grid-pattern.jpg** - Modern smart grid pattern with connected nodes and energy flow lines (Style: minimalist, blue/purple tones)
3. **ai-prediction-visual.jpg** - Futuristic AI brain with energy data flowing through neural networks (Style: 3d, purple/blue gradient)
4. **iot-device-illustration.jpg** - Smart home IoT energy monitoring device with WiFi signals (Style: 3d, clean white background)

---

## File Structure (8 files max)

1. **src/pages/Login.tsx** - Auth page with login/signup toggle
2. **src/pages/Dashboard.tsx** - Main layout with sidebar + content area
3. **src/pages/Home.tsx** - Home page with stat cards, gas input, upload button
4. **src/pages/GraphsAnalysis.tsx** - Charts page (line, bar, pie)
5. **src/pages/AIPrediction.tsx** - AI predictions, recommendations, savings
6. **src/pages/HelpContact.tsx** - Contact form + email
7. **src/lib/mockData.ts** - All mock/simulated data generation
8. **src/App.tsx** - Router setup (update existing)

## Development Tasks
1. Create mockData.ts with all simulated energy data
2. Create Login page with demo auth
3. Create Dashboard layout with sidebar
4. Create Home page with cards
5. Create Graphs & Analysis page with recharts
6. Create AI Prediction page
7. Create Help & Contact page
8. Update App.tsx routes and index.html title
9. Lint, build, check UI