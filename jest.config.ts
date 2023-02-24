import type { Config } from '@jest/Types';

// Sync object
const config: Config.InitialOptions = {
  //verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;