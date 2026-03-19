# Log Monitoring Dashboard

A modern React dashboard for monitoring and viewing logs in real-time. Built with React, Tailwind CSS, and Vite.

## Features

- 📊 **Dashboard Cards** - Display key metrics (Total Logs, Errors, Warnings)
- 📝 **Log Table** - View detailed logs with filtering and search
- 🔍 **Search Functionality** - Search logs by message, source, or level
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Built with Tailwind CSS and Lucide icons
- ⚡ **Fast Development** - Powered by Vite

## Project Structure

```
log-monitoring-dashboard/
├── src/
│   ├── App.jsx           # Main application component
│   ├── index.jsx         # React entry point
│   └── index.css         # Tailwind CSS imports
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Build

To build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS** - CSS processing

## Components

### Sidebar
- Navigation menu with active state
- Mobile-responsive with overlay
- Logout button

### Navbar
- Search bar for quick log filtering
- Responsive mobile menu toggle
- Profile section

### Dashboard Cards
- Total Logs counter
- Error count
- Warning count
- Color-coded with icons

### Log Table
- Sortable log entries (timestamp, level, message, source)
- Real-time search/filter
- Color-coded log levels
- Responsive scrolling

## Customization

### Colors
Edit `tailwind.config.js` to customize the color theme:

```javascript
colors: {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
}
```

### Mock Data
Update the sample logs in `src/App.jsx` in the `LogTable` component's `useEffect` hook to integrate with your backend API.

## License

MIT
