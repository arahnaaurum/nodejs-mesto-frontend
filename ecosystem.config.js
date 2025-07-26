require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/main', GIT_TOKEN, DEPLOY_REPOSITORY,
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: `https://${GIT_TOKEN}@${DEPLOY_REPOSITORY}`,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -v .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && --openssl-legacy-provider npm run build',
    },
  },
};
