// /app/layout.tsx
'use client'

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import './globals.css';

// Define the props for the RootLayout component
interface RootLayoutProps {
  children: ReactNode;
}

// wrap the children in the RootLayout component & makes store available to children
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {/* children: any component that needs access to the store */}
          {children} 
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
