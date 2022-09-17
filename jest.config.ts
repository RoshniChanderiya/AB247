import swcConfig from './swc.config.json';

export default {
  rootDir: process.cwd(),
  transform: {
    '.*\\.(tsx?|jsx?)$': ['@swc/jest', ...swcConfig],
  },
  testEnvironmentOptions: {
    url: 'http://localhost:8000',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  verbose: true,
  globals: {
    'process.env': {
      REACT_APP_API_URL: '',
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|styl|less|sass|scss|stylus|png|jpg|svg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules'],
  testMatch: ['<rootDir>/**/*.test.{ts,tsx,js,jsx}', '<rootDir>/*.test.{ts,tsx,js,jsx}'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coveragePathIgnorePatterns: ['/src/services/', '/src/assets/'],
  modulePaths: ['<rootDir>/src'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
