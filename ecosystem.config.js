module.exports = {
  apps: [{
    name: 'bakong-bot',
    script: './src/app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    // Restart on crash
    min_uptime: '10s',
    max_restarts: 10,
    // Cron restart (optional - restart daily at 3 AM)
    cron_restart: '0 3 * * *',
    // Graceful shutdown
    kill_timeout: 5000,
    listen_timeout: 3000,
    shutdown_with_message: true
  }]
};
