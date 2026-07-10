import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    testTimeout: 10000,
		include:['src/**/*.spec.ts'],
    clearMocks: true,env: {
			// var from database
			DATABASE_URL: 'mongodb://localhost:3333/?authSource=admin',
			DATABASE_USERNAME: 'USERNAME',
			DATABASE_PASSWORD: 'PASSWORD',

			// var from emailJs
			EMAIL_SERVER_ID: 'xxxxxxxx',
			EMAIL_TEMPLATE_ID: 'xxxxxxxx',
			EMAIL_PUBLIC_KEY: 'xxxxx_xx-x',
			EMAIL_PRIVATE_KEY: 'xxxxxxxx-',

			// var localhost - Opcional
			HOST: '0.0.0.0',
			PORT: '3333',

			// var google analytics
			GOOGLE_CREDENTIALS:
				'{"type": "service_account", "project_id": "seu-projeto-id", "private_key_id": "sua-key-id", "private_key": "-----BEGIN PRIVATE KEY-----\\nnome-da-sua-chave\\n-----END PRIVATE KEY-----\\n", "client_email": "seu-email@projeto.iam.gserviceaccount.com", "client_id": "123456789", "auth_uri": "https://accounts.google.com", "token_uri": "https://oauth2.googleapis.com", "auth_provider_x509_cert_url": "https://www.googleapis.com", "client_x509_cert_url": "https://www.googleapis.com", "universe_domain": "googleapis.com"}',
			WEBSITE_PROPERTY_ID: '83692640',
    },
    alias: {
      "@": path.resolve(__dirname, 'src/'),
    }
    // ...
  },
})