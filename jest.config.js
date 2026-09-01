module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  // lcov é o formato que o SonarQube Cloud lê para calcular a cobertura
  coverageReporters: ['lcov', 'text', 'text-summary'],
};
