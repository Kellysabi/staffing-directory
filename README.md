# Staff Directory Application

A modern, responsive staff directory web application built with React, featuring employee management, grade levels, and comprehensive filtering capabilities.

## 🚀 Features

- **Employee Management**: Add, edit, view, and delete employees
- **Grade Level System**: Create and manage organizational grade levels
- **Advanced Filtering**: Search by name, role, department, or filter by grade level
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Data Persistence**: All data is saved to localStorage
- **Modern UI**: Clean, animated interface with smooth transitions
- **Real-time Statistics**: Dashboard showing employee counts and department statistics
- **Country Integration**: Fetches real country data from external API

## 📁 Project Structure

```
staff-directory/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Modal.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── StatCard.jsx
│   │   ├── employee/
│   │   │   ├── EmployeeCard.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeProfile.jsx
│   │   │   └── EmployeeList.jsx
│   │   ├── grade/
│   │   │   ├── GradeLevelForm.jsx
│   │   │   └── GradeLevelManager.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       └── SearchFilter.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useEmployees.js
│   │   └── useGradeLevels.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── index.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Clone the repository
```bash
git clone https://github.com/yourusername/staff-directory.git
cd staff-directory
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Start the development server
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## 📦 Dependencies

```json
{
  "name": "staff-directory",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "@tailwindcss/forms": "^0.5.3"
  }
}
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling, providing:
- Responsive design utilities
- Modern color palette
- Smooth animations and transitions
- Consistent spacing and typography
- Dark mode ready (can be easily enabled)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Configuration Files

### tailwind.config.js
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 📊 Data Structure

### Employee Object
```javascript
{
  id: number,
  name: string,
  email: string,
  role: string,
  department: string,
  country: string,
  state: string,
  address: string,
  gradeLevel: string,
  phone: string,
  joinDate: string,
  createdAt: string,
  updatedAt: string
}
```

### Grade Level Object
```javascript
{
  id: number,
  name: string,
  description: string
}
```

## 🌐 API Integration

The application fetches country data from:
```
https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json
```

## 💾 Data Persistence

All data is automatically saved to browser's localStorage:
- `staffDirectory_employees` - Employee data
- `staffDirectory_gradeLevels` - Grade level data

## 🎯 Key Features Explained

### Employee Management
- **Add Employee**: Comprehensive form with validation
- **Edit Employee**: Pre-populated form for updates
- **View Profile**: Detailed employee information modal
- **Delete Employee**: Confirmation dialog for safety

### Grade Level System
- **Create Grades**: Add new organizational levels
- **Assign Grades**: Link employees to grade levels
- **Delete Grades**: Remove unused grade levels
- **Grade Colors**: Visual distinction with color coding

### Search & Filter
- **Real-time Search**: Instant results as you type
- **Multi-field Search**: Search across name, role, and department
- **Grade Filter**: Filter employees by specific grade levels
- **Clear Filters**: Easy reset functionality

### Statistics Dashboard
- **Total Employees**: Current workforce count
- **Department Count**: Number of unique departments
- **Grade Levels**: Total organizational levels
- **Country Coverage**: Geographic distribution

## 🎨 Design System

### Colors
- **Primary**: Indigo (600, 700)
- **Secondary**: Purple (600, 700)
- **Success**: Green (500, 600)
- **Warning**: Orange (500, 600)
- **Danger**: Red (500, 600)

### Typography
- **Headers**: Bold, large sizes for hierarchy
- **Body**: Regular weight, readable sizes
- **Labels**: Medium weight for form labels

### Animations
- **Page Load**: Staggered fade-in animations
- **Hover Effects**: Scale and color transitions
- **Modal Animations**: Smooth slide-in effects
- **Card Interactions**: Subtle lift effects

## 🔒 Security Features

- Input validation and sanitization
- XSS prevention through React's built-in protections
- Safe HTML rendering
- Confirmation dialogs for destructive actions

## 📱 Mobile Optimization

- Touch-friendly interface
- Optimized modal sizes
- Responsive grid layouts
- Swipe-friendly interactions

## 🧪 Testing Recommendations

For production deployment, consider adding:
- Unit tests with Jest and React Testing Library
- Integration tests for user workflows
- E2E tests with Cypress or Playwright
- Accessibility testing

## 🚀 Deployment Options

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy with Vercel CLI
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add deploy script to package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using React and Tailwind CSS**