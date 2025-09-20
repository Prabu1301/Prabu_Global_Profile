const { schedule } = require('@netlify/functions');
const axios = require('axios');

const handler = async function () {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const ENDPOINT = '/rest/v1/keep_alive';
  const SERVICE_ROLE_JWT = process.env.SERVICE_ROLE_JWT;

  // 🔐 Validate environment variables before proceeding
  if (!SUPABASE_URL || !SERVICE_ROLE_JWT) {
    throw new Error('Missing environment variables: SUPABASE_URL or SERVICE_ROLE_JWT');
  }

  try {
    const response = await axios.get(`${SUPABASE_URL}${ENDPOINT}`, {
      headers: {
        apikey: SERVICE_ROLE_JWT,
        Authorization: `Bearer ${SERVICE_ROLE_JWT}`,
        timeout: 5000
      },
      params: {
        select: 'id',
        limit: 1
      }
    });

    console.log(`[${new Date().toISOString()}] Ping successful:`, response.data);
    return {
      statusCode: 200,
      body: 'Ping successful'
    };
  } catch (error) {
    console.error('Ping failed:', error.response?.data || error.message);
    return {
      statusCode: 500,
      body: 'Ping failed'
    };
  }
};

// ⏰ Schedule: Every 30 minutes (UTC)
module.exports.handler = schedule('*/30 * * * *', handler);