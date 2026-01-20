module.exports = {
    apps: [
      {
        name: 'payload-news',
        script: 'dist/server.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
          PAYLOAD_CONFIG_PATH: 'dist/payload.config.js'
        }
      }
    ]
  };