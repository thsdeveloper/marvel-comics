// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  //Forneça o caminho para seu aplicativo Next.js para carregar os arquivos next.config.js e .env em seu ambiente de teste diretório: './',
  dir: './',
})

// Adicione qualquer configuração personalizada a ser passada para o Jest
const customJestConfig = {
  // Adiciona mais opções de configuração antes de cada teste ser executado
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  // se estiver usando TypeScript com um baseUrl definido para o diretório raiz, você precisará do abaixo para que o alias funcione
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['cypress'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
