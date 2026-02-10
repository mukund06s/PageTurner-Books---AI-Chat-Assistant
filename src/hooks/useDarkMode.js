// ============================================
// PageTurner Books - useDarkMode Hook
// ============================================
// Convenience wrapper around ThemeContext
// Can be used in any component without
// importing ThemeContext directly
// ============================================

import { useTheme } from '../context/ThemeContext';

export function useDarkMode() {
  const { darkMode, toggleDarkMode } = useTheme();

  return {
    darkMode,
    toggleDarkMode,
    // Utility: get class based on mode
    modeClass: (lightClass, darkClass) => {
      return darkMode ? darkClass : lightClass;
    }
  };
}

export default useDarkMode;