module.exports = {
    apps : [
        {
            name: "cedrics",
            script: "./server.js",
            watch: true,
            env_development: {
                "PORT": 3000,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 8001,
                "NODE_ENV": "production",
            }
        }
    ]}